// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import { Indie_Flower } from "next/font/google";

export const headingFont = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headingFont",
  preload: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={headingFont.variable}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
