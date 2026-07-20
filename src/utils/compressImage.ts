export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 1024;
      const scale = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.7
      );
    };
  });
};