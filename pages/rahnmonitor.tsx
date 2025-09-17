import Seo from "../components/common/Seo";
import FancyBlock2 from "../components/home-page/home/FancyBlock2";
import Hero from "../components/home-page/home/Hero";
import OurAim from "../components/home-page/home/OurAim";
import Services from "../components/home-page/home/Services";
import CallToAction from "../components/home-page/home/CallToActions";
import DefaultHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import VideoBlock1 from "../components/about/VideoBlock1";
import VideoBlock from "../components/about/VideoBlock";
import { NextSeo } from "next-seo";
const RahnMonitor = () => {
  return (
    <>
      <NextSeo
        title="RAHN Monitor - Anti-Money Laundring Tool"
        description="We Provide Quality Anti-Money Laundring Services"
        openGraph={{
          url: "https://rahn.co.za/rahnmonitor",
          title: "RAHN Monitor - Anti-Money Laundring Tool",
          description: "We Provide Quality Anti-Money Laundring Services",
          images: [
            {
              url: "https://rahn.co.za/images/logo/RahnProfilelogo.png",
              width: 800,
              height: 600,
              alt: "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
            },
            {
              url: "https://rahn.co.za/images/logo/RahnProfilelogo.png",
              width: 900,
              height: 800,
              alt: "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
            },
            { url: "https://rahn.co.za/images/logo/RahnProfilelogo.png" },
          ],
          site_name:
            "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
        }}
      />
      {/* <!-- 
        =============================================
        Theme Default Menu
        ============================================== 	
        --> */}
      <DefaultHeader />
      {/* <!-- /.theme-main-menu --> */}
      {/* 
        =============================================
        Theme Hero Banner
        ============================================== 
        */}
      <div className="hero-banner-one">
        <div className="bg-wrapper" data-aos="fade">
          <Hero />
          {/* /.container */}
          <img
            src="/images/shape/shape_08.svg"
            alt="illustration"
            className="lazy-img shapes shape-eight"
          />
        </div>
      </div>
      {/* /.hero-banner-one */}
      {/* 
        =============================================
        Feature Section One
        ============================================== 
        */}
      <div className="fancy-feature-one pt-170 lg-pt-140">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="title-style-one text-center text-lg-start">
                <h2 className="main-title fw-bold tx-dark m0">
                  RAHN Monitor <span>Sanctions</span> Screening
                </h2>
                {/* /.title-style-one */}
                <div className="pr-info fw-500 fs-20 tx-dark mt-35">
                  <span className="fw-bold text-decoration-underline">
                    A Multi-Phased Approach
                  </span>
                </div>
              </div>
              {/* /.title-style-one */}
            </div>
            <div className="col-lg-5 ms-auto" data-aos="fade-left">
              <p className="text-lg mb-60 pt-50 pe-xl-5 lg-pt-30 lg-mb-40">
                At RAHN, we understand the importance of sanctions screening for
                your business.
              </p>
              <p className="text-lg text-center text-lg-start md-pt-30 m0">
                That is why we have developed RAHN Monitor, which consists of
                multiple components: the sanctions dataset, a search function,
                Adverse Media and the ability to develop a custom internal
                dataset.
              </p>
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="inner-content pt-110 lg-pt-60 md-pt-30">
          <div className="row gx-xxl-5">
            <Services />
          </div>
        </div>
        {/* /.inner-content */}
      </div>
      {/* /.fancy-feature-one */}
      {/* 
        =============================================
        Feature Section Two
        ============================================== 
        */}
      <div className="fancy-feature-two position-relative pt-150 lg-pt-500 sm-pt-60">
        <div className="container">
          <OurAim />
        </div>
        {/* /.container */}
      </div>
      {/* /.fancy-feature-two */}
      {/*
			=====================================================
				Feedback Section One
			=====================================================
			*/}
      {/* /.feedback-section-one */}
      {/* 
			=============================================
				Feature Section Two
			============================================== 
			*/}
      {/* /.fancy-feature-two */}
      {/*
			=====================================================
				Card Style Two
			=====================================================
			*/}
      <VideoBlock1 />
      <div className="wrapper pt-110 lg-pt-80">
        <div className="container">
          <div className="row justify-content-between">
            <FancyBlock2 />
          </div>
        </div>
      </div>
      {/* /.wrapper */}
      {/*
			
      {/* 
			=============================================
				Wrapper
			============================================== 
			*/}
      <br />
      <br />
      {/* /.wrapper */}
      {/*
			=====================================================
				Fancy Short Banner One
			=====================================================
			*/}

      {/* /.fancy-short-banner-one */}
      {/*
			=====================================================
				Footer
			=====================================================
			*/}
      {/* /.footer-style-one */}
      <CallToAction />
      <DefaultFooter />
    </>
  );
};

export default RahnMonitor;
