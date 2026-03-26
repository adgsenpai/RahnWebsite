import Script from "next/script";
import Wrapper from "../layout/wrapper";
import LandingPage from "./home/landing-page";
import { NextSeo } from "next-seo";

const MainRoot = () => {
  return (
    <Wrapper>
      <LandingPage />
      <NextSeo
        title="RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective"
        description="We provide quality and specialized consulting including Financial Crime products and services."
        openGraph={
          {
            url: 'https://rahn.co.za',
            title: 'RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective',
            description: 'We provide quality and specialized consulting including Financial Crime products and services.',
            images: [
              {
                url: 'https://rahn.co.za/images/logo/RahnProfilelogo.png',
                width: 800,
                height: 600,
                alt: 'RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective',
              },
              {
                url: 'https://rahn.co.za/images/logo/RahnProfilelogo.png',
                width: 900,
                height: 800,
                alt: 'RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective',
              },
              { url: 'https://rahn.co.za/images/logo/RahnProfilelogo.png' },
              { url: 'https://rahn.co.za/images/logo/RahnProfilelogo.png' },
            ],
            site_name: 'RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective',
          }
        } />
      <Script
        id="scriptVideo"
        async
        dangerouslySetInnerHTML={{
          __html: `
          var _videoInterval = setInterval(function() {
            try {
              var v = document.getElementsByTagName('video')[0];
              if (v) { v.play(); clearInterval(_videoInterval); }
            } catch(e) {
              clearInterval(_videoInterval);
            }
          }, 100);
            `
        }}
      />
    </Wrapper>

  );
};


export default MainRoot;
