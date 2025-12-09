import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: "/alarm",
  // assetPrefix: "/alarm",
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://secom.co.id/alarm",
    "https://secom-fe.vercel.app/",
    "https://secom.madebystucel.com/",
  ],
  // experimental: {
  //   turbo: false,
  //   workerThreads: false,
  //   cpus: 2,
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.secom.co.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.secom.madebystucel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
    qualities: [75, 100],
  },
};

export default withNextIntl(nextConfig);
