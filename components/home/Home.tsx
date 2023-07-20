import { fetchTags } from "lib/wordpress";

export const Home = async () => {
  const tags = await fetchTags();
  console.log(tags);
  return <h1>Component</h1>;
};

Home.displayName = "Home";
