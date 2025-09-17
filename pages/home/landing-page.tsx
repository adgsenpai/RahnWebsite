import Link from "next/link";
import Seo from "../../components/common/Seo";
import Footer from "../../components/footer/Footer";
import DefaultHeader from "../../components/home-page/home/footer/header/DefaultHeader";
import Banner from "../../components/home-page/home/Banner";
import AppBanner from "../../components/home-page/home/AppBanner";
import Blog from "../../components/blog/Blog";
import Block from "../../components/home-page/home/Block";
import Feature from "../../components/home-page/home/Feature";
import Hero from "../../components/home-page/home/Hero1";
import IntroAbout from "../../components/about/IntroAbout";
import Testimonial from "../../components/home-page/home/Testimonial";
import WhyChoose from "../../components/home-page/home/WhyChoose";
import ContactForm from "../../components/contact/ContactForm";
import { NextSeo } from "next-seo";
import VideoBlock from "../../components/about/VideoBlock";
// every 2 seconds try this

const LandingPage = () => {
  return (
    <>
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
            { url: "https://rahn.co.za/images/logo/RahnProfilelogo.png" },
          ],
          site_name:
            "RAHN Consolidated (PTY) Ltd - Focused · Innovative · Effective",
        }}
      />
      {}
      <DefaultHeader />
      {/* <!-- 
			=============================================
			Theme Hero Banner
			============================================== 
			--> */}
      <Hero />

      {/* <!-- 
			=============================================
				Feature Section Thirty Four
			============================================== 
			--> */}

      <VideoBlock />
      <div className="fancy-feature-thirtyFour mt-50">
        <div className="container">
          <div className="row gx-xxl-5">
            <Feature />
          </div>
        </div>
        {/* <!-- /.container --> */}
      </div>
      {/* <!-- /.fancy-feature-thirtyFour --> */}
      {/*
			=====================================================
				Feature Section Thirty Five
			=====================================================
			*/}
      <div className="fancy-feature-thirtyFive mt-90 md-mt-70">
        
        <div className="bg-wrapper mt-85 pt-100 lg-mt-80 lg-pt-70">
          <div className="container">
            <IntroAbout />
          </div>
        </div>
        {/* /.bg-wrapper */}
      </div>
      {/* /.fancy-feature-thirtyFive */}

      {/* 
			=============================================
				Feature Section Thirty Seven
			============================================== 
			*/}
      {/* <div className="fancy-feature-thirtySeven mt-225 lg-mt-120">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 ms-auto order-lg-last"
              data-aos="fade-left"
            >
              <div className="ps-lg-5 ms-xxl-3">
                <div className="title-style-one mb-40">
                  <div className="sc-title text-uppercase">Why Choose Us</div>
                  <h2 className="main-title fw-500 tx-dark m0">
                    What makes us the best.
                  </h2>
                </div>
                <WhyChoose />
             
              </div>
            </div>


            <div className="col-xxl-5 col-lg-6 order-lg-first">
              <Block />
            </div>
          </div>
        </div>
      </div> */}
      {/* /.fancy-feature-thirtySeven */}
      {/*=====================================================
				Feedback Section Eleven
			=====================================================
			*/}
      <div
        className="feedback-section-eleven position-relative mt-200 pt-100 pb-70 lg-mt-120 lg-pt-70 lg-pb-50"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="title-style-one text-center mb-50 lg-mb-20">
            <h2 className="main-title fw-500 tx-dark m0">Testimonials</h2>
          </div>
        </div>
        <div className="inner-content">
          <div className="feedback_slider_seven">
            <Testimonial />
          </div>

          {/* /.slider-wrapper */}
        </div>
        {/* /.inner-content */}
      </div>
      {/* /.feedback-section-eleven */}
      {/* =============================================
				Feature Section Thirty Eight
			============================================== 
			*/}
      {/* <div className="fancy-feature-thirtyEight mt-140 lg-mt-100"> */}
      {/* <div className="container">
          <AppBanner />
        </div> */}
      {/* /.container */}
      {/* </div> */}
      {/* /.fancy-feature-thirtyEight */}
      {/*=====================================================
				Fancy Short Banner Thirteen
			=====================================================
			*/}
      <div
        className="fancy-short-banner-thirteen pt-170 pb-170 mt-130 lg-mt-100 lg-pt-80 lg-pb-80 "
        data-aos="fade-up"
      >
        <div className="container">
          <div className="bg-wrapper zn2 bg-white position-relative">
            <div className="row">
              <div className="col-xl-11 m-auto">
                <div className="row align-items-center mt-4 mb-4">
                  <div className="col-lg-6 ms-auto order-lg-last">
                    <div className="text-wrapper">
                      <img
                        src="/images/icon/icon_109.svg"
                        alt="icon"
                        className="lazy-img mb-30"
                      />
                      <div className="title-style-one">
                        <h2 className="main-title fw-500 tx-dark m0">
                          For inquiries about any of our services please Send us
                          a message
                        </h2>
                      </div>
                      <p className="fs-20 tx-dark pt-20 m0">
                        or Mail us at{" "}
                        <a href="mailto:info@rahn.co.za">info@rahn.co.za</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 order-lg-first">
                    <div className="form-style-two md-mb-40">
                      <ContactForm />
                    </div>
                    {/* /.form-style-two */}
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="shapes shape-text fw-500 fs-20 tx-dark text-center">
              FILL in <br />
              the Form
            </div>
            <img
              src="/images/shape/shape_90.svg"
              alt="shape"
              className="lazy-img shapes shape-one"
            />
            <img
              src="/images/shape/shape_91.svg"
              alt="shape"
              className="lazy-img shapes shape-two"
            />
          </div>
          {/* /.bg-wrapper */}
        </div>
      </div>
      {/* /.fancy-short-banner-thirteen */}
      {/* =============================================
		   Blog Section Three
		   ============================================== */}
      <div className="blog-section-three mt-140 mb-120 lg-mt-100 lg-mb-100">
        <div className="container">
          <div className="position-relative">
            <div className="row align-items-end">
              <div className="col-sm-8">
                <div
                  className="title-style-one text-center text-sm-start pb-40 lg-pb-20"
                  data-aos="fade-right"
                >
                  <h2 className="main-title fw-500 tx-dark m0">Our Blogs</h2>
                </div>
                {/* /.title-style-one */}
              </div>
            </div>
            {/* /.row */}
            <div className="row gx-xxl-5">
              <Blog />
            </div>
            {/* /.row */}
            <div className="text-center xs-mt-40">
              <Link
                href="blogs"
                className="btn-twentyTwo fw-500 tran3s"
                data-aos="fade-left"
              >
                Go to Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* /.blog-section-three */}
      {/*
			=====================================================
				Footer
			=====================================================
			*/}
      <div className="footer-style-ten theme-basic-footer zn2 position-relative">
        <div className="container">
          <div className="inner-wrapper">
            <div className="row justify-content-between">
              <Footer />
            </div>
          </div>
          {/* /.inner-wrapper */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
