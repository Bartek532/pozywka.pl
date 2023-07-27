import { fetchCategories } from "lib/wordpress";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map(({ slug }) => ({ category: slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
