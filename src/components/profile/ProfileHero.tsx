// import "./ProfileHero.scss";

// type Props = {
//   name: string;
//   favoritesCount: number;
//   achievementsCount: number;
//   reviewsCount: number;
// };

// export const ProfileHero = ({
//   name,
//   favoritesCount,
//   achievementsCount,
//   reviewsCount,
// }: Props) => {
//   const firstLetter = name.charAt(0).toUpperCase();

//   return (
//     <section className="profile-hero">
//       <div className="profile-hero__inner">
//         <div className="profile-hero__left">
//           <div className="profile-hero__avatar">
//             {firstLetter}
//           </div>

//           <div className="profile-hero__user">
//             <h2 className="profile-hero__name">{name}</h2>
//             <p className="profile-hero__subtitle">
//               Your wine journey
//             </p>
//           </div>
//         </div>

//         <div className="profile-hero__stats">
//   <div className="profile-hero__stat">
//     <span className="profile-hero__value">{favoritesCount}</span>
//     <span className="profile-hero__label">Favorites</span>
//   </div>

//   <div className="profile-hero__stat">
//     <span className="profile-hero__value">{achievementsCount}</span>
//     <span className="profile-hero__label">Achievements</span>
//   </div>

//   <div className="profile-hero__stat">
//     <span className="profile-hero__value">{reviewsCount}</span>
//     <span className="profile-hero__label">Reviews</span>
//   </div>
// </div>
//       </div>
//     </section>
//   );
// };
import { useRef, useState } from "react";
import "./ProfileHero.scss";

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
  const [avatar, setAvatar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const firstLetter = name.charAt(0).toUpperCase();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const openFile = () => {
    inputRef.current?.click();
  };

  return (
    <section className="profile-hero">
      <div className="profile-hero__inner">
        <div className="profile-hero__left">
          
          <div className="profile-hero__avatar-wrapper">
            <div
              className="profile-hero__avatar"
              onClick={openFile}
            >
              {avatar ? (
                <img src={avatar} alt="avatar" />
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

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              hidden
            />
          </div>

          <div className="profile-hero__user">
            <h2 className="profile-hero__name">{name}</h2>
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