import { isString } from "lodash";
import { getPlaiceholder } from "plaiceholder";

import { PostTile } from "types";

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export const getPlaceholder = async <T extends PostTile>(
  post: T,
): Promise<T & { placeholder?: string }> => ({
  ...post,
  ...(isString(post.acf.image)
    ? { placeholder: (await getImage(encodeURI(post.acf.image))).base64 }
    : {}),
});

export const getPlaceholders = async <T extends PostTile>(
  posts: T[],
): Promise<(T & { placeholder?: string })[]> => {
  console.time("placeholders");
  const promises = await Promise.all(posts.map(async (post) => getPlaceholder(post)));
  console.timeEnd("placeholders");
  return promises;
};
