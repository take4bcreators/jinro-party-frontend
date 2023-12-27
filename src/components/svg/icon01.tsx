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
        d="M62.1899 31.8223C62.1899 48.3908 48.7585 61.8223 32.1899 61.8223C15.6214 61.8223 2.18994 48.3908 2.18994 31.8223C2.18994 15.2537 15.6214 1.82227 32.1899 1.82227C48.7585 1.82227 62.1899 15.2537 62.1899 31.8223Z"
        fill="#F44E5A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.1899 3.32227C16.4498 3.32227 3.68994 16.0822 3.68994 31.8223C3.68994 47.5624 16.4498 60.3223 32.1899 60.3223C47.9301 60.3223 60.6899 47.5624 60.6899 31.8223C60.6899 16.0822 47.9301 3.32227 32.1899 3.32227ZM0.689941 31.8223C0.689941 14.4253 14.793 0.322266 32.1899 0.322266C49.5869 0.322266 63.6899 14.4253 63.6899 31.8223C63.6899 49.2192 49.5869 63.3223 32.1899 63.3223C14.793 63.3223 0.689941 49.2192 0.689941 31.8223Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_508)">
        <path
          d="M40.5701 19.529C35.3261 19.6247 32.7597 23.1417 32.1902 26.3392C31.6207 23.1417 29.0543 19.6246 23.8102 19.529C18.9752 19.4409 14.9771 22.9655 14.9771 29.3978C14.9771 37.6551 24.833 41.4695 31.5727 47.6376C31.8073 47.8524 31.7521 47.8468 31.7521 47.8468C31.8628 47.9762 32.022 48.0512 32.1894 48.0512V48.0519C32.1894 48.0519 32.1898 48.0519 32.1902 48.0519C32.1902 48.0519 32.1906 48.0519 32.1909 48.0519V48.0512C32.3583 48.0512 32.5174 47.9762 32.6282 47.8468C32.6282 47.8468 32.573 47.8523 32.8076 47.6376C39.5473 41.4695 49.4033 37.6551 49.4033 29.3978C49.4033 22.9655 45.4051 19.4409 40.5701 19.529Z"
          fill="#FBFAF5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_508"
          x="10.9771"
          y="19.5273"
          width="42.4263"
          height="36.5244"
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
            result="effect1_dropShadow_120_508"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_508"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
