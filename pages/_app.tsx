// pages/_app.tsx
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { Indie_Flower, Alegreya } from "next/font/google";
import "flowbite/dist/flowbite.css";

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
    <>
      <Head>
        <link rel="icon" href="/icon.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Default Title</title>
        {/* This will be overridden by page-specific titles */}
      </Head>
      <div className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
