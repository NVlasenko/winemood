export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error("Empty file data"));
        return;
      }

      img.src = event.target.result as string;
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 1024;

      const shouldResize = img.width > maxWidth;
      const scale = shouldResize ? maxWidth / img.width : 1;

      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Compression failed"));
            return;
          }

          const resultFile = new File([blob], file.name, {
            type: blob.type,
          });

          resolve(resultFile);
        },
        "image/jpeg",
        0.7
      );
    };

    reader.readAsDataURL(file);
  });
};