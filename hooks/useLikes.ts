import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useState, useEffect } from "react";

import { supabase } from "lib/supabase";

const getVisitorId = async () => {
  const fingerprintPromise = await FingerprintJS.load();
  const result = await fingerprintPromise.get();

  return result.visitorId;
};

const getIsLiked = async (userId: string, slug: string) => {
  const { data } = await supabase.from("likes").select().eq("userId", userId).eq("slug", slug);

  return !!data?.length;
};

const getLikes = async (slug: string) => {
  const { count } = await supabase.from("likes").select("*", { count: "exact" }).eq("slug", slug);

  return count ?? 0;
};

const postLike = (userId: string, slug: string) =>
  supabase.from("likes").insert([{ userId, slug }]);

const postDislike = (userId: string, slug: string) =>
  supabase.from("likes").delete().match({ userId, slug });

export const useLikes = (slug: string) => {
  const [visitorId, setVisitorId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const findUserId = async () => {
      const id = await getVisitorId();
      setVisitorId(id);
    };
    void findUserId();
  }, []);

  useEffect(() => {
    const checkIsLiked = async () => {
      try {
        const isLiked = await getIsLiked(visitorId, slug);
        setIsLiked(isLiked);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    };

    const getCount = async () => {
      try {
        const count = await getLikes(slug);
        setCount(count);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    };

    void checkIsLiked();
    void getCount();
  }, [slug, visitorId]);

  const like = async () => {
    if (isLiked) return;

    const { error } = await postLike(visitorId, slug);

    if (error) {
      setError(JSON.stringify(error));
      return;
    }

    setIsLiked(true);
    setCount((count) => count + 1);
    setError("");
  };

  const dislike = async () => {
    if (!isLiked) return;

    const { error } = await postDislike(visitorId, slug);

    if (error) {
      setError(JSON.stringify(error));
      return;
    }

    setIsLiked(false);
    setCount((count) => count - 1);
    setError("");
  };

  return {
    count,
    isLiked,
    error,
    like,
    dislike,
  };
};
