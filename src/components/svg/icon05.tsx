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
        d="M62.1899 31.5156C62.1899 48.0842 48.7585 61.5156 32.1899 61.5156C15.6214 61.5156 2.18994 48.0842 2.18994 31.5156C2.18994 14.9471 15.6214 1.51562 32.1899 1.51562C48.7585 1.51562 62.1899 14.9471 62.1899 31.5156Z"
        fill="#FFD300"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.1899 3.01562C16.4498 3.01562 3.68994 15.7755 3.68994 31.5156C3.68994 47.2557 16.4498 60.0156 32.1899 60.0156C47.9301 60.0156 60.6899 47.2557 60.6899 31.5156C60.6899 15.7755 47.9301 3.01562 32.1899 3.01562ZM0.689941 31.5156C0.689941 14.1187 14.793 0.015625 32.1899 0.015625C49.5869 0.015625 63.6899 14.1187 63.6899 31.5156C63.6899 48.9126 49.5869 63.0156 32.1899 63.0156C14.793 63.0156 0.689941 48.9126 0.689941 31.5156Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_490)">
        <path
          d="M32.1899 13.3188L37.24 26.1285L50.3866 27.2204L40.3598 36.2277L43.4362 49.7123L32.1899 42.4696L20.9435 49.7123L24.0201 36.2277L13.9932 27.2204L27.1398 26.1285L32.1899 13.3188Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_490"
          x="9.99316"
          y="13.3188"
          width="44.3936"
          height="44.3936"
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
            result="effect1_dropShadow_120_490"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_490"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
