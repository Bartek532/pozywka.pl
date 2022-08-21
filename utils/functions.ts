import { getPlaiceholder } from "plaiceholder";
import type { WPPost } from "types";

export const buildQuery = (data: { key: string; value?: number | string }[]) => {
  const query = data
    .map(({ key, value }) => {
      if (value) {
        return key + "=" + value;
      }
    })
    .filter(Boolean)
    .join("&");

  return query;
};

export const truncateText = (text: string, maxSize: number) => {
  return text.length > maxSize ? text.slice(0, text.slice(0, maxSize - 3).lastIndexOf(" ")) + "..." : text;
};

export const playSound = (path: string) => {
  const audio = new Audio(path);
  if (localStorage.getItem("sounds") === "enabled") {
    audio.play();
  }
};

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const normalizeLikesCount = (likesCount: number) => {
  if (likesCount >= 1_000_000) {
    return (likesCount / 1_000_000).toFixed(1) + "M";
  }

  if (likesCount >= 1_000) {
    return (likesCount / 1_000).toFixed(1) + "K";
  }

  return likesCount;
};
