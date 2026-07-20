import { httpClient } from "./httpClient";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export const userApi = {
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return httpClient<UserResponse>("/api/users/avatar", {
      method: "PUT",
      body: formData,
    });
  },

  deleteAvatar: () => {
    return httpClient<UserResponse>("/api/users/avatar", {
      method: "DELETE",
    });
  },

  getMe: () => {
    return httpClient<UserResponse>("/api/users/me", {
      method: "GET",
    });
  },
};