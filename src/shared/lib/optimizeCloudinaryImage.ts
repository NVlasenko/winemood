type CloudinaryImageOptions = {
  width?: number;
};

export const optimizeCloudinaryImage = (
  url: string,
  options: CloudinaryImageOptions = {},
): string => {
  if (
    !url.includes("res.cloudinary.com") ||
    !url.includes("/image/upload/")
  ) {
    return url;
  }

  const transformations = [
    "f_auto",
    "q_auto",
    options.width
      ? `w_${options.width}`
      : null,
  ]
    .filter(Boolean)
    .join(",");

  return url.replace(
    "/image/upload/",
    `/image/upload/${transformations}/`,
  );
};