import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import "./ProfileHero.scss";
import { userApi } from "@/shared/api/userApi";

type Props = {
  name: string;
  favoritesCount: number;
  achievementsCount: number;
  reviewsCount: number;
};

export const ProfileHero = ({
  name,
  favoritesCount,
  achievementsCount,
  reviewsCount,
}: Props) => {
  const { user, updateUser } = useAuth();

  const [preview, setPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const firstLetter = (user?.name || name).charAt(0).toUpperCase();

  const openFile = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const response = await userApi.uploadAvatar(file);
      updateUser(response);
      setPreview(null);
    } catch (e) {
      console.error(e);
    } finally {
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await userApi.deleteAvatar();
      updateUser(response);
      setPreview(null);
    } catch (e) {
      console.error(e);
    }
  };

  const avatarSrc = preview || user?.avatarUrl || null;

  return (
    <section className="profile-hero">
      <div className="profile-hero__inner">
        <div className="profile-hero__left">
          <div className="profile-hero__avatar-wrapper">
            <div
              className="profile-hero__avatar"
              onClick={openFile}
            >
              {avatarSrc ? (
                <img src={avatarSrc} alt="avatar" />
              ) : (
                firstLetter
              )}
            </div>

            <button
              className="profile-hero__avatar-edit"
              onClick={openFile}
              type="button"
            >
              +
            </button>

            {user?.avatarUrl && (
              <button
                className="profile-hero__avatar-remove"
                onClick={handleDelete}
                type="button"
              >
                ×
              </button>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              hidden
            />
          </div>

          <div className="profile-hero__user">
            <h2 className="profile-hero__name">
              {user?.name || name}
            </h2>
            <p className="profile-hero__subtitle">
              Your wine journey
            </p>
          </div>
        </div>

        <div className="profile-hero__stats">
          <div className="profile-hero__stat">
            <span className="profile-hero__value">{favoritesCount}</span>
            <span className="profile-hero__label">Favorites</span>
          </div>

          <div className="profile-hero__stat">
            <span className="profile-hero__value">{achievementsCount}</span>
            <span className="profile-hero__label">Achievements</span>
          </div>

          <div className="profile-hero__stat">
            <span className="profile-hero__value">{reviewsCount}</span>
            <span className="profile-hero__label">Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};