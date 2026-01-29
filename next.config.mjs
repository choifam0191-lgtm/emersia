/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // HMR WebSocket 연결 안정화 (connection failed 완화)
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;

