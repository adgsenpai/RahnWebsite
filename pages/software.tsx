import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import ProgressBar from "./pages-menu/service-details/ProgressBar";
import CallToAction from "../components/home-page/home/CallToActions";
import { NextSeo } from "next-seo";
import Link from "next/link";

const Software = () => {
  return (
    <>
      <NextSeo
        title="Software - RAHN Consolidated (PTY) Ltd"
        description="We provide quality Custom Software"
        openGraph={{
          url: "https://rahn.co.za/software",
          title: "Software - RAHN Consolidated (PTY) Ltd",
          description: "We provide quality Custom Software",
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
      {/* <!-- 
      =============================================
      Theme Default Menu
      ============================================== 	
      --> */}
      <DefaulHeader />
      {/* 
        =============================================
        Feature Section Fifty One
        ============================================== 
        */}
      <div className="fancy-feature-fiftyOne position-relative mt-200">
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-12" data-aos="fade-right">
                    <div className="title-style-five mb-65 lg-mb-40">
                      <div className="sc-title-two fst-italic position-relative">
                        What we do
                      </div>
                      <h1 className="main-title fw-500 tx-dark">
                        Unlocking the future, one line of code at a time with
                        our software
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div className="card-body h-100 p-3">
                <img
                  className="w-100 position-relative z-index-2 pt-4"
                  src="/images/icon/Rahnsoftware.svg"
                  alt="Rahn Software"
                />
              </div>
            </div>
          </div>
        </div>
        {/* /.container */}
        <img
          src="/images/shape/shape_172.svg"
          alt="shape"
          className="lazy-img shapes shape-three"
        />
        <img
          src="/images/shape/shape_175.svg"
          alt="shape"
          className="lazy-img shapes shape-two"
        />
      </div>
      {/* 
			=============================================
				Service Details
			============================================== 
			*/}
      <div className="service-details position-relative mt-100 mb-120 md-mt-50 lg-mb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-xl-8 order-lg-1">
              <div className="service-details-meta ps-lg-5">
                <h2 className="main-title tx-dark mb-30">RAHN Software</h2>
                <p className="text-lg tx-dark">
                  Welcome to RAHN Software! Have you ever felt frustrated by the
                  lack of customisation and options available to you on the
                  market?
                </p>
                <img
                  src="/images/media/RahnSoftware.png"
                  alt="Rahn IT Recruitment Meeting"
                  className="main-img-meta"
                />
                <div className="mt-50 lg-mt-30">
                  <p className="sub-title mb-20 tx-dark">
                    If so, you may have experienced the limitations of
                    off-the-shelf software. However, settling for limited
                    options, a complicated workflow, or disconnected systems
                    should not be your only option. We understand that your
                    business is unique, and your software solution should be
                    too.
                    <br />
                    <br />
                    That is why a custom software solution can be designed to
                    overcome your pain points and deliver superior outcomes at a
                    cost that you can justify.
                  </p>
                  <br />
                  <h3>Advantages of Custom Software Solution:</h3> <br />
                  <p className="sub-title mb-20 tx-dark ">
                    There are many advantages to using a custom software
                    solution, including ease of integration, room to grow,
                    enhanced security, streamlined performance, and responsive
                    support throughout the life of the product.
                    <br />
                    <br />
                    At RAHN, we specialize in creating exactly the right
                    solution that meets your specific needs, whether you are a
                    business or a start-up. We develop custom software to
                    optimize internal operations as well as B2B and B2C
                    solutions that enhance the customer experience. <br />
                    <br /> We stay on top of the latest technology trends and
                    data privacy regulations so that you can be confident that
                    your software will look good, run great, and aligned with
                    regulations. Our focus is on delivering the best possible
                    solution for your business needs.
                    <br />
                    <br />
                    Thank you for considering RAHN for your custom software
                    needs. We look forward to collaborating with you to create
                    the perfect solution for your business!
                  </p>
                  <br />
                  <h4>
                    If you would like to find out more about what we have to
                    offer, click below to contact us.
                  </h4>
                </div>
              </div>
              {/* /.service-details-meta */}
            </div>
            {/* End .col-xl-9 */}
          </div>
        </div>
      </div>
      {/* /.service-details */}
      {/*
			=====================================================
				Fancy Short Banner Sixteen
			=====================================================
			*/}

      {/* /.fancy-short-banner-sixteen */}
      {/* 
        =============================================
        Contact Section One
        ============================================== 
        */}
      <CallToAction />
      <DefaultFooter />
    </>
  );
};

export default Software;
