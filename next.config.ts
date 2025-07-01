import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{protocol:'https',hostname:'**'}]
  },
};

export default nextConfig;


  // images:{
  //   remotePatterns:[{protocol:'https',hostname:'**'}]  for precise de qu'elle url images can fetched
  // },