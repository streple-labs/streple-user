import { Anton, DM_Sans, Open_Sans, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const baloo = localFont({
  src: [
    {
      path: "../assets/fonts/Baloo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Baloo-Regular.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Baloo-Regular.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-baloo",
});

export const bazinga = localFont({
  src: [
    {
      path: "../assets/fonts/Bazinga-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Bazinga-Regular.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Bazinga-Regular.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-baloo",
});
