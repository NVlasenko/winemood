export const formatLabel = (value: string): string => {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .split(/[_-]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};