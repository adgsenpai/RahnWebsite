import { Html, Head, Main, NextScript } from "next/document";
import { NextSeo } from "next-seo";

/*
        <meta
          name="description"
          content="RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective"
        />
        <meta
          name="keywords"
          content="Anti Money Laundering, Financial Compliance, business Regulation, business multipurpose, accountable institutions, fraud, financial crime, crypto, information technology, hosting, landing page, portfolio, real estate, responsive, react, nextjs"
        />
*/

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <NextSeo
          title="RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective"
          description="We provide quality and specialized consulting including Financial Crime products and services."
          openGraph={{
            url: "https://rahn.co.za",
            title:
              "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
            description:
              "We provide quality and specialized consulting including Financial Crime products and services.",
            images: [
              {
                url: "https://rahn.co.za/images/rahn-logo.png",
                width: 800,
                height: 600,
                alt: "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
              },
              {
                url: "https://rahn.co.za/images/rahn-logo.png",
                width: 900,
                height: 800,
                alt: "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
              },
              { url: "https://rahn.co.za/images/rahn-logo.png" },
              { url: "https://rahn.co.za/images/rahn-logo.png" },
            ],
            site_name:
              "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
          }}
        />
      </body>
    </Html>
  );
}
