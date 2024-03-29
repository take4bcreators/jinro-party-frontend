export default function Home(): JSX.Element {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.7085 31.5156C61.7085 48.0842 48.277 61.5156 31.7085 61.5156C15.14 61.5156 1.7085 48.0842 1.7085 31.5156C1.7085 14.9471 15.14 1.51562 31.7085 1.51562C48.277 1.51562 61.7085 14.9471 61.7085 31.5156Z"
        fill="#47C63A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.7085 3.01562C15.9684 3.01562 3.2085 15.7755 3.2085 31.5156C3.2085 47.2557 15.9684 60.0156 31.7085 60.0156C47.4486 60.0156 60.2085 47.2557 60.2085 31.5156C60.2085 15.7755 47.4486 3.01562 31.7085 3.01562ZM0.208496 31.5156C0.208496 14.1187 14.3115 0.015625 31.7085 0.015625C49.1055 0.015625 63.2085 14.1187 63.2085 31.5156C63.2085 48.9126 49.1055 63.0156 31.7085 63.0156C14.3115 63.0156 0.208496 48.9126 0.208496 31.5156Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_487)">
        <path
          d="M31.8063 13.0623C31.5784 12.8071 31.618 12.8306 31.618 12.8306C31.5013 12.6866 31.3336 12.6035 31.1574 12.6035C30.9813 12.6035 30.8142 12.6866 30.6976 12.8306C30.6976 12.8306 30.7381 12.8071 30.5093 13.0623C24.8773 19.4133 14.4956 23.0106 14.4956 32.1525C14.4956 32.622 14.5162 33.1113 14.5589 33.6204C15.0126 38.9874 18.9053 42.0321 23.1113 42.0321C25.4987 42.0321 27.7672 40.4416 29.2839 38.1354C28.5724 42.5939 27.6597 47.5417 27.4035 48.156C26.9665 49.2024 27.4904 49.377 27.752 49.377H34.5635C34.8251 49.377 35.3481 49.2024 34.912 48.156C34.6565 47.5417 33.7423 42.5939 33.0324 38.1354C34.5483 40.4416 36.8167 42.0321 39.2042 42.0321C43.411 42.0321 47.3029 38.9874 47.7574 33.6204C47.8 33.1113 47.8198 32.622 47.8198 32.1525C47.82 23.0106 37.4383 19.4133 31.8063 13.0623Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_487"
          x="10.4956"
          y="12.6035"
          width="41.3242"
          height="44.7734"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_120_487"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_487"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
