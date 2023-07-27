import { SyntheticEvent } from "react";

export const onPromise =
  <T>(promise: (event: SyntheticEvent) => Promise<T>) =>
  (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };

export const buildQuery = (data: { key: string; value?: number | string }[]) => {
  const query = data
    .map(({ key, value }) => {
      if (value) {
        return key + "=" + value;
      }

      return null;
    })
    .filter(Boolean)
    .join("&");

  return query;
};

export const escapeHtml = (text: string) => text.replace(/(<([^>]+)>)/gi, "").trim();

export const truncateText = (text: string, maxSize: number) =>
  text.length > maxSize ? text.slice(0, text.slice(0, maxSize - 3).lastIndexOf(" ")) + "..." : text;

export const truncateTextByWordsCount = (text: string, wordsCount: number) => {
  const splittedText = text.split(" ");

  if (splittedText.length <= wordsCount) {
    return splittedText.join(" ");
  }

  return splittedText.slice(0, wordsCount).join(" ") + "...";
};

export const playSound = (path: string) => {
  const audio = new Audio(path);
  //if (localStorage.getItem("sounds") === "enabled") {
  return audio.play();
  //}
};

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const normalizeNumber = (number: number) => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  }

  if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "K";
  }

  return number;
};
