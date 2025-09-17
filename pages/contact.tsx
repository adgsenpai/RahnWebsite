import Seo from "../components/common/Seo";
import BlockContact from "../components/contact/BlockContact";
import ContactForm from "../components/contact/ContactForm";
import DefaultFooter from "../components/footer/DefaultFooter";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

const contact = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <>
      <NextSeo
        title="Contact - RAHN Consolidated (PTY) Ltd"
        description="Get in Touch with us for more information about our services."
        openGraph={{
          url: "https://rahn.co.za/contact",
          title: "Get in Touch - RAHN Consolidated (PTY) Ltd ",
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
      <div className="fancy-feature-fiftyOne position-relative mt-250 lg-mt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 text-center m-auto wow fadeInUp">
              <div className="title-style-five mb-65 lg-mb-40">
                <div className="sc-title-two fst-italic position-relative d-inline-block">
                  Contact Us
                </div>
                <h2 className="main-title fw-500 tx-dark mb-50">
                  Get in Touch.
                </h2>
                <p>
                  Ready to revolutionise your business? Let Rahn guide you with
                  AI-powered solutions and expert support. Complete our Process
                  Optimisation Form for you analysis, and we’ll show
                  you how to save time, cut costs, and stay ahead. Our team is
                  prepared to assess your needs, deliver bespoke AI software,
                  and provide trusted consultants to bring your vision to life.
                </p><br/>
                {/* center button */}
                <button
                  className="btn-twentyOne fw-500 tran3s d-block m-auto"
                  data-cal-link="rahnconsolidated/30min"
                  data-cal-config='{"layout":"month_view"}'
                >
                  Setup Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /.container */}
        <img
          src="/images/shape/shape_172.svg"
          alt="shape"
          className="lazy-img shapes shape-two"
        />
      </div>

      {/* 
        =============================================
        Contact Section One
        ============================================== 
        */}
      <div className="contact-section-one mt-60 lg-mt-30">
        <div className="container">
          <div className="row">
            <BlockContact />
          </div>
        </div>
        {/* End .container */}

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-9 m-auto">
              <h2 className="tx-dark text-center mt-100 lg-mt-40 lg-mb-40 wow fadeInUp">
                For inquiries about any of our services please send us a Message
              </h2>
            </div>
          </div>
        </div>
        <div className="fancy-short-banner-thirteen pt-85 pb-120 mt-80 lg-mt-100 lg-pt-80 lg-pb-80 aos-init aos-animate">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-50">
              <div className="col-md-6 bg-wrapper zn2 bg-white position-center">
                <div className="row">
                  <div className="col-xl-12 p-4">
                    <div className="row mt-4 mb-4">
                      <ContactForm />
                      {/* /.form-style-one */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End .container */}
        {/* <Map /> */}
      </div>

      {/* 
        =============================================
        Contact Section One
        ============================================== 
        */}
      <DefaultFooter />
    </>
  );
};

export default contact;
