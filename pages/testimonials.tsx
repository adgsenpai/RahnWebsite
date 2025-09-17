import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import Testimonial from "../components/home-page/home/Testimonial";
import { NextSeo } from "next-seo";

const Testimonials = () => {
  return (
    <>
      <NextSeo
        title="Testimonials - RAHN Consolidated (PTY) Ltd"
        description="At Rahn We provide anti money laundering services"
        openGraph={{
          url: "https://rahn.co.za",
          title:
            "Testimonials - RAHN Consolidated (PTY) Ltd",
          description:
            "At Rahn We provide anti money laundering services",
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
      <DefaulHeader />
      <div className="fancy-feature-fiftyOne position-relative mt-200">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-md-6" data-aos="fade-right">
              <div className="title-style-five mb-65 lg-mb-20">
                <div className="sc-title-two fst-italic position-relative">
                  Testimonials
                </div>
                <h1 className="main-title fw-500 tx-dark">
                  Client Feedback About us.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
			=====================================================
				Feedback Section Eleven
			=====================================================
			*/}
      <div className="feedback-section-eleven position-relative mt-50 pt-100 pb-70 lg-pt-70 lg-pb-50 wow fadeInUp">
        <div className="container">
          <div className="title-style-one text-center mb-50 lg-mb-20">
            <h2 className="main-title fw-500 tx-dark m0">Testimonials</h2>
          </div>
        </div>
        {/* End .container */}
        <div className="inner-content">
          <div className="slider-wrapper">
            <div className="feedback_slider_seven">
              <Testimonial />
            </div>
            {/* /.feedback_slider_seven */}
          </div>
          {/* /.slider-wrapper */}
        </div>
        {/* /.inner-content */}

      </div>
      {/* /.feedback-section-eleven */}


      <DefaultFooter />
    </>
  );
};

export default Testimonials;
