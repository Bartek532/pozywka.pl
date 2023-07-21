"use server";

import { z } from "zod";

import { supabase } from "./supabase";

const countSchema = z.object({
  count: z.number(),
});

const isCount = (maybeCount: unknown): maybeCount is z.infer<typeof countSchema> =>
  countSchema.safeParse(maybeCount).success;

export const addViews = async (slug: string, amount = 1) => {
  const { data } = await supabase.from("views").select().eq("slug", slug);

  if (data?.length) {
    if (isCount(data[0])) {
      await supabase
        .from("views")
        .update({ count: data[0].count + amount })
        .eq("slug", slug);
    }
  } else {
    await supabase.from("views").insert([{ slug, count: 1 }]);
  }
};

export const getViews = async (slug: string) => {
  const { count } = await supabase.from("views").select("*", { count: "exact" }).eq("slug", slug);

  return count ?? 0;
};

export const getTopViews = async (limit = 10) => {
  const { data } = await supabase
    .from("views")
    .select("slug")
    .order("count", { ascending: false })
    .limit(limit);

  return data ?? [];
};
