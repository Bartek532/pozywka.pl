import styles from "./Input.module.scss";
import { memo, forwardRef, LegacyRef } from "react";

type InputProps = {
  readonly type?: string;
  readonly name: string;
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly placeholder?: string;
};

export const Input = memo<InputProps>(
  forwardRef(
    ({ type = "text", name, onChange, onBlur, value, placeholder }, inputRef?: LegacyRef<HTMLInputElement>) => {
      return (
        <label className={styles.label}>
          <span className="sr-only">{placeholder || name}</span>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={styles.input}
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
