export const formatLabel = (value: string): string => {
  if (!value) {
    return "";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) =>
      word ? word[0].toUpperCase() + word.slice(1) : ""
    )
    .join(" ");
};