/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 厳格モード (2回レンダリングをやめる場合は false にする)
  output: 'standalone', // standalone でスタンドアローンモードでビルド
};

module.exports = nextConfig;
