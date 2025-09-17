import React, { useEffect } from "react";
import Link from "next/link";

const Hero1 = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };



  return (
    <div className="hero-banner-ten position-relative zn2">
      <div className="container bg-wrapper">
        <video
          loop
          src="../images/assets/RahnTechBackground.mp4"
          type="video/mp4"
          className="bg-video"
          autoPlay
          muted
        ></video>
        <div className="row">
          <div className="col-lg-11 col-md-11 m-auto text-center" data-aos="fade-up">
            <h1 className="hero-heading fw-500 tx-dark mb-30">
              Welcome to <span>RAHN</span> <br/>Your Partner in AI-Powered Transformation
            </h1>
            <div>
              <div className="approval-info d-inline-flex align-items-center mt-110 lg-mt-80">
                <p className="text-lg tx-dark mt-8 mb-8 lg-mt-30 lg-mb-40">
                We help Fintech, Agriculture, Healthcare, Legal, and Retail businesses boost efficiency and cut costs through smart AI and process optimisation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
