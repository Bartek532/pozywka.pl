import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useWindowSize } from "hooks/useWindowSize";
import SearchIcon from "public/svg/search.svg";
import { onPromise } from "utils/functions";

import styles from "./SearchInput.module.scss";

export const SearchInput = ({
  onSearch,
  defaultValue,
}: {
  onSearch: ({ query }: { query: string }) => void;
  defaultValue?: string;
}) => {
  const { width } = useWindowSize();
  const { register, handleSubmit } = useForm({
    defaultValues: { query: defaultValue || "" },
  });
  const [isInputFocused, setIsInputFocused] = useState(!!defaultValue);

  return (
    <form className={styles.form} onSubmit={onPromise(handleSubmit(onSearch))}>
      <label htmlFor="search">
        <span className="sr-only">Szukaj</span>
        <input
          type="search"
          placeholder="Szukaj..."
          className={clsx(
            styles.input,
            styles.active && { [styles.active]: isInputFocused || (width && width < 992) },
          )}
          onFocus={() => setIsInputFocused(true)}
          {...register("query")}
        />
      </label>
      <button className={styles.btn} onFocus={() => setIsInputFocused(true)}>
        <span className="sr-only">szukaj</span>
        <SearchIcon />
      </button>
    </form>
  );
};
