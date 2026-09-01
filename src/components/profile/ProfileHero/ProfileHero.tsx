import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

import { userApi } from "@/shared/api/userApi";

import { compressImage } from "@/utils/compressImage";

import { CropAvatarModal } from "@/components/profile/CropAvatarModal";

import type { UserDto } from "@/types/user";

import "./ProfileHero.scss";

type ProfileHeroProps = {
  initialUser: UserDto;
  initialFavoritesCount: number;
};

export const ProfileHero = ({
  initialUser,
  initialFavoritesCount,
}: ProfileHeroProps) => {
  const {
    user: authUser,
    updateUser,
  } = useAuth();

  const {
    favoritesCount,
    hasLoadedFavorites,
  } = useFavorites();

  const [isHydrated, setIsHydrated] =
    useState(false);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [cropImage, setCropImage] =
    useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const user =
    isHydrated && authUser
      ? authUser
      : initialUser;

  const displayedFavoritesCount =
    hasLoadedFavorites
      ? favoritesCount
      : initialFavoritesCount;

  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const firstLetter = (
    user.name || ""
  )
    .charAt(0)
    .toUpperCase();

  const openFile = () => {
    inputRef.current?.click();
  };

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const localPreview =
      URL.createObjectURL(file);

    setCropImage(localPreview);

    e.target.value = "";
  };

  const avatarSrc =
    preview ||
    user.avatarUrl ||
    null;

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
                <img
                  src={avatarSrc}
                  alt="avatar"
                />
              ) : (
                firstLetter
              )}
            </div>

            <button
              className="profile-hero__avatar-action"
              onClick={openFile}
              type="button"
            >
              {avatarSrc ? "×" : "+"}
            </button>

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
              {user.name}
            </h2>

            <p className="profile-hero__subtitle">
              Your wine journey
            </p>
          </div>
        </div>

        <div className="profile-hero__stats">
          <div className="profile-hero__stat">
            <span className="profile-hero__value">
              {displayedFavoritesCount}
            </span>

            <span className="profile-hero__label">
              Favorites
            </span>
          </div>

          <div className="profile-hero__stat">
            <span className="profile-hero__value">
              {user.achievementCount ?? 0}
            </span>

            <span className="profile-hero__label">
              Achievements
            </span>
          </div>

          <div className="profile-hero__stat">
            <span className="profile-hero__value">
              {user.reviewCount ?? 0}
            </span>

            <span className="profile-hero__label">
              Reviews
            </span>
          </div>
        </div>
      </div>

      {cropImage && (
        <CropAvatarModal
          image={cropImage}
          onClose={() =>
            setCropImage(null)
          }
          onSave={async (blob) => {
            const localPreview =
              URL.createObjectURL(
                blob,
              );

            setPreview(
              localPreview,
            );

            setCropImage(null);

            try {
              const file =
                new File(
                  [blob],
                  "avatar.jpg",
                  {
                    type: "image/jpeg",
                  },
                );

              const compressedFile =
                await compressImage(
                  file,
                );

              const response =
                await userApi.uploadAvatar(
                  compressedFile,
                );

              updateUser(response);

              setPreview(null);

              URL.revokeObjectURL(
                localPreview,
              );
            } catch (error) {
              console.error(
                error,
              );
            }
          }}
        />
      )}
    </section>
  );
};