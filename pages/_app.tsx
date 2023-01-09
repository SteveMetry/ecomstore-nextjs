import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "next-seo.config";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import ".styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3159767499477222"
        crossOrigin="anonymous"
      ></Script>
    </UserProvider>
  );
}
