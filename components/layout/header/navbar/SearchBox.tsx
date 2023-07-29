"use client";

import { useRouter, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

import { SearchInput } from "components/common/form/search/SearchInput";

export const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = ({ query }: { query: string }) => {
    if (query.trim()) {
      NProgress.start();
      router.push(`/szukaj?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <SearchInput
      onSearch={handleSearch}
      defaultValue={
        searchParams?.get("q") ? decodeURIComponent(searchParams?.get("q") as string) : ""
      }
    />
  );
};
