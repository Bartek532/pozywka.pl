import styles from "./NewsletterForm.module.scss";
import { Input } from "components/form/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { fetcher } from "utils/fetcher";
import clsx from "clsx";
import { SubscribeNewsletterInput, subscribeNewsletterSchema } from "utils/validation";

type PromiseStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const NewsletterForm = ({ isSplitted = false }: { isSplitted?: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeNewsletterInput>({
    resolver: zodResolver(subscribeNewsletterSchema),
  });
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
      <form className={clsx(styles.form, { [styles.splitted]: isSplitted })} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.inputs}>
          <Input type="text" placeholder="Imię" {...register("name")} isError={!!errors?.name?.message} />
          <Input type="email" placeholder="Mail" {...register("email")} isError={!!errors?.email?.message} />
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.button}>Zapisz się</button>
        </div>
      </form>
      <p
        className={clsx(styles.state, styles[promiseStatus], {
          [styles.rejected]: !!errors?.name?.message || !!errors?.email?.message,
        })}
      >
        {errors?.name?.message ||
          errors?.email?.message ||
          (promiseStatus === "fullfilled" ? (
            "Hurra! Teraz sprawdź swoją skrzynkę ;)"
          ) : promiseStatus === "rejected" ? (
            "Błąd. Spróbuj ponownie później"
          ) : promiseStatus === "loading" ? (
            "Ładowanie..."
          ) : (
            <br />
          ))}
      </p>
    </>
  );
};

NewsletterForm.displayName = "NewsletterForm";
