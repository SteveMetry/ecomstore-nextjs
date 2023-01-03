import type { NextSeoProps } from "next-seo";

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  defaultTitle: "Sendnet Shop | Online Shopping Centre",
  titleTemplate: "%s | SENDNET SHOP",
  description:
    "Shop Online Now, With Hundreds of Products We sure you will find the right product for you, Ranging from clothes & makeup to Dog Toys.",
  additionalMetaTags: [
    {
      name: "author",
      content: "Sendnet"
    },
    {
      name: "keywords",
      content: [
        "Sendnet",
        "Sendnet Shop",
        "Sendnet Online Shopping",
        "Send Net",
        "Sendnet NZ",
        "Online Shopping New Zealand",
        "Sendnet Store",
        "Shop Online"
      ].join(", ")
    },
    {
      name: "application-name",
      content: "Sendnet Shop"
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default"
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Sendnet Shop"
    },
    {
      name: "mobile-web-app-capable",
      content: "yes"
    },
    {
      name: "theme-color",
      content: "#ffffff"
    }
  ],
  //twitter
  openGraph: {
    title: "Sendnet Shop - Online Shopping Centre",
    description:
      "Shop Online Now, With Hundreds of Products We sure you will find the right product for you, Ranging from clothes & makeup to Dog Toys.",
    type: "website",
    siteName: "Sendnet Shop",
    profile: {
      firstName: "Sendnet",
      lastName: "Online Shopping"
    },
    locale: "en_US"
    //images
  }
};

// twitter: {
//   cardType: 'summary',
//   handle: 'jhooks',
//   site: 'jhooks'
// },

// images: [
//   {
//     url: '/images/og.jpg',
//     width: 1280,
//     height: 720
//   }
// ]
