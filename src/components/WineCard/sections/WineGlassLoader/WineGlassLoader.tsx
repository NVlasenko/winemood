import "./WineGlassLoader.scss";

export const WineGlassLoader = () => {
  return (
    <div className="wine-glass-loader">
      <svg
        className="wine-glass-loader__svg"
        width="85"
        height="120"
        viewBox="0 0 85 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="wineBowlClip">
            <path d="M16.5 6.5H68.5L79.5 44C81.1 49.4 81.1 55.2 79.6 60.6C78.1 66 75.1 70.9 70.9 74.8C63.2 82 53.1 86 42.5 86C31.9 86 21.8 82 14.1 74.8C9.9 70.9 6.9 66 5.4 60.6C3.9 55.2 3.9 49.4 5.5 44L16.5 6.5Z" />
          </clipPath>

          <linearGradient
            id="wineGradient"
            x1="42.5"
            y1="0"
            x2="42.5"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgb(var(--wine-glow-rgb))" stopOpacity="0.75" />
            <stop offset="1" stopColor="rgb(var(--wine-glow-rgb))" />
          </linearGradient>
        </defs>

        <g clipPath="url(#wineBowlClip)">
          <rect
            className="wine-glass-loader__wine-fill"
            x="0"
            y="0"
            width="85"
            height="120"
            fill="url(#wineGradient)"
          />
        </g>

        <path
          className="wine-glass-loader__glass"
          d="M16.5 6.5H68.5L79.5 44C81.1 49.4 81.1 55.2 79.6 60.6C78.1 66 75.1 70.9 70.9 74.8C63.2 82 53.1 86 42.5 86C31.9 86 21.8 82 14.1 74.8C9.9 70.9 6.9 66 5.4 60.6C3.9 55.2 3.9 49.4 5.5 44L16.5 6.5Z"
        />

        <path className="wine-glass-loader__glass" d="M42.5 86V113.5" />

        <path className="wine-glass-loader__glass" d="M20.7 116.7H64.3" />
      </svg>
    </div>
  );
};
