// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import { Indie_Flower } from "next/font/google";
import { Alegreya } from "next/font/google";

export const headingFont = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headingFont",
  preload: true,
});

export const bodyFont = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bodyFont",
  preload: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${headingFont.variable} ${bodyFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
