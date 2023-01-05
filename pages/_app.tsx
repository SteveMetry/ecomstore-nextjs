import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "next-seo.config";
import ".styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
}
