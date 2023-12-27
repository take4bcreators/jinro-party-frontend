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
        d="M62.4019 31.5156C62.4019 48.0842 48.9704 61.5156 32.4019 61.5156C15.8333 61.5156 2.40186 48.0842 2.40186 31.5156C2.40186 14.9471 15.8333 1.51562 32.4019 1.51562C48.9704 1.51562 62.4019 14.9471 62.4019 31.5156Z"
        fill="#FFD300"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.4019 3.01562C16.6617 3.01562 3.90186 15.7755 3.90186 31.5156C3.90186 47.2557 16.6617 60.0156 32.4019 60.0156C48.142 60.0156 60.9019 47.2557 60.9019 31.5156C60.9019 15.7755 48.142 3.01562 32.4019 3.01562ZM0.901855 31.5156C0.901855 14.1187 15.0049 0.015625 32.4019 0.015625C49.7988 0.015625 63.9019 14.1187 63.9019 31.5156C63.9019 48.9126 49.7988 63.0156 32.4019 63.0156C15.0049 63.0156 0.901855 48.9126 0.901855 31.5156Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_493)">
        <path
          d="M47.5498 22.4054C45.866 22.4054 44.5011 23.8442 44.5011 25.619C44.5011 26.4642 44.8176 27.2263 45.323 27.7999L39.8586 33.4917L33.1903 22.6454C34.4897 22.2766 35.4505 21.0392 35.4505 19.5536C35.4505 17.7801 34.0855 16.3413 32.4017 16.3413C30.718 16.3413 29.353 17.7801 29.353 19.5536C29.353 21.0392 30.3137 22.2766 31.6132 22.6454L24.9448 33.4917L19.4805 27.7999C19.9858 27.2263 20.3024 26.4642 20.3024 25.619C20.3024 23.8442 18.9374 22.4054 17.2537 22.4054C15.5699 22.4054 14.2051 23.8442 14.2051 25.619C14.2051 27.3937 15.57 28.8325 17.2538 28.8325V46.69H32.4018H47.5498V28.8325C49.2336 28.8325 50.5985 27.3937 50.5985 25.619C50.5985 23.8442 49.2336 22.4054 47.5498 22.4054Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_493"
          x="10.2051"
          y="16.3413"
          width="44.3936"
          height="38.3486"
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
            result="effect1_dropShadow_120_493"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_493"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
