"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "components/common/form/input/Input";
import { onPromise } from "utils/functions";

import { subscribeToNewsletter } from "./api/mailer";
import styles from "./NewsletterForm.module.scss";
import { subscriberSchema } from "./utils/validation/schema";
import { Subscriber } from "./utils/validation/types";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const NewsletterForm = ({ isSplitted = false }: { isSplitted?: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Subscriber>({
    resolver: zodResolver(subscriberSchema),
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = handleSubmit(async ({ email, name }) => {
    setFormStatus("loading");
    try {
      await subscribeToNewsletter(name, email);
      setFormStatus("fullfilled");
    } catch {
      setFormStatus("rejected");
    }
  });

  return (
    <>
      <form
        className={clsx(styles.form, styles.splitted && { [styles.splitted]: isSplitted })}
        onSubmit={onPromise(onSubmit)}
        noValidate
      >
        <div className={styles.inputs}>
          <Input
            type="text"
            placeholder="Imię"
            {...register("name")}
            isError={!!errors?.name?.message}
          />
          <Input
            type="email"
            placeholder="Mail"
            {...register("email")}
            isError={!!errors?.email?.message}
          />
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.button}>Zapisz się</button>
        </div>
      </form>
      <p
        className={clsx(
          styles.state,
          styles[formStatus],
          styles.rejected && {
            [styles.rejected]: !!errors?.name?.message || !!errors?.email?.message,
          },
        )}
      >
        {errors?.name?.message ||
          errors?.email?.message ||
          (formStatus === "fullfilled" ? (
            "Hurra! Teraz sprawdź swoją skrzynkę ;)"
          ) : formStatus === "rejected" ? (
            "Błąd. Spróbuj ponownie później"
          ) : formStatus === "loading" ? (
            "Ładowanie..."
          ) : (
            <br />
          ))}
      </p>
    </>
  );
};

NewsletterForm.displayName = "NewsletterForm";
