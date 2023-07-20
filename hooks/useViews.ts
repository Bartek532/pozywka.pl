import { supabase } from "lib/supabase";

export const useViews = () => {
  const addViews = async (slug: string, amount = 1) => {
    const { data } = await supabase.from("views").select().eq("slug", slug);

    if (data?.length) {
      await supabase
        .from("views")
        .update({ count: data[0].count + amount })
        .eq("slug", slug);
    } else {
      await supabase.from("views").insert([{ slug, count: 1 }]);
    }
  };

  const getViews = async (slug: string) => {
    const { count } = await supabase.from("views").select("*", { count: "exact" }).eq("slug", slug);

    return count;
  };

  return { addViews, getViews };
};
