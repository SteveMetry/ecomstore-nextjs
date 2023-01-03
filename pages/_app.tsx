import type { AppProps } from "next/app";
import ".styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "next-seo.config";

//DONT COMMIT YET

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
}
