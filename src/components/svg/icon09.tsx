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
        d="M62.1899 32.209C62.1899 48.7775 48.7585 62.209 32.1899 62.209C15.6214 62.209 2.18994 48.7775 2.18994 32.209C2.18994 15.6404 15.6214 2.20898 32.1899 2.20898C48.7585 2.20898 62.1899 15.6404 62.1899 32.209Z"
        fill="#008DE3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.1899 3.70898C16.4498 3.70898 3.68994 16.4689 3.68994 32.209C3.68994 47.9491 16.4498 60.709 32.1899 60.709C47.9301 60.709 60.6899 47.9491 60.6899 32.209C60.6899 16.4689 47.9301 3.70898 32.1899 3.70898ZM0.689941 32.209C0.689941 14.812 14.793 0.708984 32.1899 0.708984C49.5869 0.708984 63.6899 14.812 63.6899 32.209C63.6899 49.606 49.5869 63.709 32.1899 63.709C14.793 63.709 0.689941 49.606 0.689941 32.209Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_514)">
        <path
          d="M22.4694 18.975V24.6204V40.3398C21.4044 39.9366 20.1457 39.8164 18.8489 40.075C15.7335 40.6925 13.5884 43.225 14.0575 45.7288C14.526 48.2339 17.4299 49.7626 20.5447 49.1444C23.3089 48.5957 25.3053 46.5387 25.3913 44.3287H25.409V24.4216L43.5133 22.1083V37.6274C42.4476 37.225 41.1902 37.1062 39.8934 37.364C36.7773 37.9808 34.6336 40.5134 35.1006 43.0178C35.5691 45.5223 38.4724 47.0509 41.5878 46.4321C44.3526 45.8841 46.3498 43.8264 46.4344 41.6178H46.4522V21.9094V16.1201L22.4694 18.975Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_514"
          x="9.99316"
          y="16.1201"
          width="40.459"
          height="41.1616"
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
            result="effect1_dropShadow_120_514"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_514"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
