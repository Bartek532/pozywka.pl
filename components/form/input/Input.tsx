import { memo, forwardRef, LegacyRef } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

type InputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly placeholder?: string;
  readonly isError?: boolean;
};

export const Input = memo<InputProps>(
  forwardRef(
    (
      { type = "text", name, onChange, onBlur, value, placeholder, isError = false },
      inputRef?: LegacyRef<HTMLInputElement>,
    ) => {
      return (
        <label className={styles.label}>
          <span className="sr-only">{placeholder || name}</span>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={clsx(styles.input, { [styles.error]: isError })}
            placeholder={placeholder}
            ref={inputRef}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </label>
      );
    },
  ),
);

Input.displayName = "Input";
