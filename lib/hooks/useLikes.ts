import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { supabase } from "lib/supabase";
import { useState, useEffect } from "react";

export const useLikes = (slug: string) => {
  const [userId, setUserId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const findUserId = async () => {
      const fingerprintPromise = await FingerprintJS.load();
      const result = await fingerprintPromise.get();
      setUserId(result.visitorId);
    };

    findUserId();
  }, []);

  useEffect(() => {
    const checkIsLikedByUser = async () => {
      const { data } = await supabase.from("likes").select().eq("userId", userId).eq("slug", slug);

      if (data?.length) {
        setIsLiked(true);
        setIsError(false);
      }
    };

    const countLikes = async () => {
      const { count, error } = await supabase.from("likes").select("*", { count: "exact" }).eq("slug", slug);

      if (count) {
        setLikesCount(count);
      }

      if (error) {
        console.log(error);
        setIsError(true);
      }
    };

    countLikes();
    checkIsLikedByUser();
  }, [slug, userId]);

  const like = async () => {
    if (isLiked) {
      return;
    }

    const { data, error } = await supabase.from("likes").insert([{ userId, slug }]);

    if (data?.length) {
      setIsLiked(true);
      setLikesCount((count) => count + 1);
      setIsError(false);
    }

    if (error) {
      console.log(error);

      setIsError(true);
    }
  };

  const dislike = async () => {
    if (!isLiked) {
      return;
    }

    const { data, error } = await supabase.from("likes").delete().match({ userId, slug });

    if (data?.length) {
      setIsLiked(false);
      setLikesCount((count) => count - 1);
      setIsError(false);
    }

    if (error) {
      console.log(error);

      setIsError(true);
    }
  };

  return {
    likesCount,
    isLiked,
    isError,
    like,
    dislike,
  };
};
