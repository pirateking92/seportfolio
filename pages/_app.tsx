import { AppProps } from "next/app";
import "../styles/globals.css";
import { headingFont } from "../lib/fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} className={headingFont.variable} />;
}

export default MyApp;
