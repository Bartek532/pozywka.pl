import styles from "./NewsletterForm.module.scss";
import { Input } from "components/common/input/Input";
import { EMAIL_REGEX } from "utils/consts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { fetcher } from "utils/fetcher";

type PromiseStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [promiseStatus, setPromiseStatus] = useState<PromiseStatus>("pending");

  const handleFormSubmit = async ({ email, name }: { email: string; name: string }) => {
    setPromiseStatus("loading");
    try {
      await fetcher("/api/newsletter", { method: "POST", body: { email, name } });
      setPromiseStatus("fullfilled");
    } catch {
      setPromiseStatus("rejected");
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type="text"
          placeholder="Imię"
          {...register("name", {
            required: "Imię jest wymagane.",
          })}
        />

        <Input
          type="text"
          placeholder="Mail"
          {...register("email", {
            required: "Email jest wymagany.",
            pattern: {
              value: EMAIL_REGEX,
              message: "Wypełnij poprawnie wszystkie pola.",
            },
          })}
        />
        <button className={styles.button}>Zapisz się</button>
      </form>
      <p className={styles.state}>
        <br />
      </p>
    </>
  );
};

NewsletterForm.displayName = "NewsletterForm";
