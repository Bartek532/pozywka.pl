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
