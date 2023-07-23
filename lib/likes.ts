"use server";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { supabase } from "./supabase";

const getVisitorId = async () => {
  console.log("XD");

  const fingerprintPromise = await FingerprintJS.load();
  const result = await fingerprintPromise.get();

  console.log(result);
  return result.visitorId;
};

const isLiked = async (userId: string, slug: string) => {
  const { data } = await supabase.from("likes").select().eq("userId", userId).eq("slug", slug);

  return !!data?.length;
};

export const isLikedByVisitor = async (slug: string) => {
  const userId = await getVisitorId();
  return isLiked(userId, slug);
};

export const like = async (slug: string) => {
  const userId = await getVisitorId();
  const isLikedByUser = await isLiked(userId, slug);

  if (isLikedByUser) {
    return;
  }

  await supabase.from("likes").insert([{ userId, slug }]);
};

export const dislike = async (slug: string) => {
  const userId = await getVisitorId();
  const isLikedByUser = await isLiked(userId, slug);

  if (!isLikedByUser) {
    return;
  }

  await supabase.from("likes").delete().match({ userId, slug });
};

export const getLikes = async (slug: string) =>
  // const { count } = await supabase.from("likes").select("*", { count: "exact" }).eq("slug", slug);

  0;
