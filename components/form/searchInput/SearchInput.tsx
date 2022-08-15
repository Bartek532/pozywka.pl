import styles from "./SearchInput.module.scss";
import { useForm } from "react-hook-form";
import SearchIcon from "public/svg/search.svg";
import { useState } from "react";
import clsx from "clsx";

export const SearchInput = ({
  onSearch,
  defaultValue,
}: {
  onSearch: ({ query }: { query: string }) => void;
  defaultValue?: string;
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { query: defaultValue || "" },
  });
  const [isInputFocused, setIsInputFocused] = useState(!!defaultValue);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSearch)}>
      <label htmlFor="search">
        <span className="sr-only">Szukaj</span>
        <input
          type="search"
          placeholder="Szukaj..."
          className={clsx(styles.input, { [styles.active]: isInputFocused })}
          onFocus={() => setIsInputFocused(true)}
          {...register("query")}
        />
      </label>
      <button className={styles.btn} onFocus={() => setIsInputFocused(true)}>
        <SearchIcon />
      </button>
    </form>
  );
};
