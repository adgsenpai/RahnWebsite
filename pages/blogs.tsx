import Script from "next/script";
import Wrapper from "../layout/wrapper";
import LandingPage from "./home/landing-page";
import Seo from "../components/common/Seo";
import DefaultHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import AllRahnBlogs from "../components/home-page/home/AllRahnBlogs";
import { NextSeo } from "next-seo";
const MainRoot = () => {
  return (
    <Wrapper>
      <NextSeo
        title="Blogs - RAHN Consolidated (PTY) Ltd"
        description="RAHN Consolidated (PTY) Ltd Blogs"
        openGraph={
          {
            url: 'https://rahn.co.za/blogs',
            title: 'Blogs - RAHN Consolidated (PTY) Ltd',
            description: 'RAHN Consolidated (PTY) Ltd Blogs',
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

      <DefaultHeader />
      <div className="blog-section-three mt-140 mb-120 lg-mt-100 lg-mb-100">
        <div className="container">
          <div className="row">
            <AllRahnBlogs />
          </div>
        </div>
      </div>

      <DefaultFooter />
    </Wrapper>
  );
};

export default MainRoot;
