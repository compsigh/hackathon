import localFont from "next/font/local";

export const ProtoMono = localFont({
  src: [
    {
      path: "../../public/ProtoMono-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/ProtoMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/ProtoMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/ProtoMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-proto-mono",
});
