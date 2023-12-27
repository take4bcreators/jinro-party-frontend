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
        d="M61.9771 32.209C61.9771 48.7775 48.5456 62.209 31.9771 62.209C15.4085 62.209 1.97705 48.7775 1.97705 32.209C1.97705 15.6404 15.4085 2.20898 31.9771 2.20898C48.5456 2.20898 61.9771 15.6404 61.9771 32.209Z"
        fill="#008DE3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.9771 3.70898C16.2369 3.70898 3.47705 16.4689 3.47705 32.209C3.47705 47.9491 16.2369 60.709 31.9771 60.709C47.7172 60.709 60.4771 47.9491 60.4771 32.209C60.4771 16.4689 47.7172 3.70898 31.9771 3.70898ZM0.477051 32.209C0.477051 14.812 14.5801 0.708984 31.9771 0.708984C49.374 0.708984 63.4771 14.812 63.4771 32.209C63.4771 49.606 49.374 63.709 31.9771 63.709C14.5801 63.709 0.477051 49.606 0.477051 32.209Z"
        fill="white"
      />
      <g filter="url(#filter0_d_120_481)">
        <path
          d="M51.1409 36.5427C50.737 33.2344 48.432 28.7179 47.7062 27.8118C46.9803 26.9034 46.4606 25.5688 45.3461 27.8118C44.4423 29.6287 41.3517 34.7095 41.8961 35.4353C42.4405 36.1634 43.5304 35.255 44.8017 34.7094C44.9832 36.5263 43.5362 39.7316 40.4503 41.1832C37.3645 42.6349 34.6344 42.5178 34.6344 39.7924C34.6344 38.5491 34.6344 36.1258 34.6344 33.431H37.9685V29.7995H34.6344C34.6344 28.6078 34.6344 27.4395 34.6344 26.3671C35.8425 25.8543 36.8657 25.0091 37.5986 23.9415C37.9662 23.4029 38.26 22.8082 38.4625 22.1737C38.6662 21.5369 38.7786 20.8602 38.7845 20.1625V20.1578C38.7845 20.1414 38.7845 20.1203 38.7845 20.0968C38.7857 19.172 38.5972 18.2752 38.2553 17.4652C37.7437 16.2477 36.8938 15.2128 35.8191 14.4776C35.2805 14.11 34.6859 13.815 34.0514 13.6137C33.4145 13.41 32.7379 13.2976 32.0401 13.2905H32.0472C32.0191 13.2905 31.9956 13.2905 31.9746 13.2905C31.0497 13.2905 30.153 13.4778 29.3429 13.8197C28.1254 14.3325 27.0929 15.1824 26.3553 16.2547C25.9877 16.7933 25.695 17.3879 25.4914 18.0248C25.2877 18.6593 25.1753 19.3383 25.1706 20.0337V20.0266C25.1683 20.0547 25.1683 20.0805 25.1683 20.0992C25.1683 21.0264 25.3579 21.9209 25.6975 22.7309C26.2103 23.9507 27.0602 24.9833 28.1348 25.7185C28.5048 25.9713 28.9005 26.1891 29.3196 26.367C29.3196 27.4394 29.3196 28.6077 29.3196 29.7995H25.9855V33.4309H29.3196C29.3196 36.1258 29.3196 38.5491 29.3196 39.7923C29.3196 42.5177 26.5895 42.6348 23.5037 41.1831C20.4178 39.7315 18.972 36.5262 19.1523 34.7093C20.4237 35.2549 21.5136 36.1633 22.0591 35.4352C22.6023 34.7093 19.5117 29.6286 18.6079 27.8118C17.4922 25.5687 16.9736 26.9033 16.2478 27.8118C15.522 28.7179 13.2169 33.2343 12.813 36.5426C12.703 37.1982 13.1362 38.1582 14.1839 37.1093C14.7107 36.5825 15.179 36.1867 15.3944 35.8964C15.9388 38.8021 18.588 44.2973 23.691 47.0553C28.5938 49.7034 30.8204 50.1998 31.785 51.0379C31.8201 51.0708 31.8997 51.1269 31.977 51.1269C32.0544 51.1269 32.1339 51.0708 32.1691 51.0379C33.1337 50.1997 35.3603 49.7033 40.2631 47.0553C45.366 44.2973 48.0153 38.8021 48.5585 35.8965C48.7751 36.1868 49.2434 36.5825 49.7702 37.1094C50.8179 38.1582 51.251 37.1983 51.1409 36.5427ZM29.2845 20.0783V20.0736C29.2892 19.699 29.3665 19.3502 29.5022 19.0341C29.7083 18.5564 30.0525 18.1467 30.481 17.8587C30.6964 17.7159 30.9305 17.6011 31.181 17.5238C31.4316 17.4466 31.6961 17.4067 31.9748 17.4044C31.9889 17.4044 31.9935 17.4044 31.9958 17.4067H32.0029C32.3775 17.4091 32.724 17.4864 33.0424 17.6245C33.5178 17.8282 33.9298 18.1747 34.2154 18.6032C34.3606 18.8186 34.473 19.0527 34.5503 19.3033C34.6275 19.5538 34.6697 19.816 34.6697 20.097C34.6697 20.104 34.6697 20.1157 34.6697 20.1274C34.665 20.502 34.5877 20.8462 34.452 21.1647C34.2459 21.64 33.9017 22.052 33.4732 22.3376C33.2578 22.4829 33.0237 22.5952 32.7732 22.6725C32.5226 22.7497 32.2581 22.7919 31.9794 22.7919H31.9513C31.5767 22.7872 31.2302 22.7099 30.9118 22.5718C30.4365 22.3681 30.0244 22.0239 29.7388 21.5931C29.5936 21.38 29.4812 21.1435 29.4039 20.8953C29.3267 20.6448 29.2845 20.3802 29.2845 20.0992C29.2845 20.0877 29.2845 20.0807 29.2845 20.0783Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_120_481"
          x="8.79639"
          y="13.2905"
          width="46.3613"
          height="45.8364"
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
            result="effect1_dropShadow_120_481"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_120_481"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
