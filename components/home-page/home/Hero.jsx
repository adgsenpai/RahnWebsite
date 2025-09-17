
import Illustration from "./Illustration";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react"

const Hero = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-7 mt-100">
          <h1 className="hero-heading fw-bold tx-dark">
            <span className="position-relative d-inline-block mb-30">
              We Provide Quality Anti-Money Laundring Services.
            </span>
          </h1>

          <div className="title-style-one">
            <h3 className="main-title fw-bold tx-dark mb-40">
              Click on the button below to BOOK A DEMO!
            </h3>
            <button
              className="btn-twentyOne fw-500 tran3s d-block"
              data-cal-link="rahnconsolidated/30min"
              data-cal-config='{"layout":"month_view"}'
            >
              Book a Demo
            </button>
          </div>{" "}
          {/* /.title-style-one */}
          <div className="pr-info fw-500 fs-20 tx-dark mt-35">
            <span className="fw-bold text-decoration-underline">
              {/* A Multi-Phased Approach */}
            </span>
          </div>
        </div>
        <div className="card-one shapes bg-white">
          <div className="icon rounded-circle position-absolute fs-18 text-white">
            <i className="bi bi-check-lg" />
          </div>
          <h6 className="fw-500 tx-dark mb-40 mt-10">
            "RAHN guarantees that users experience a seamless and responsive
            interaction with the app"
          </h6>
          <a
            href="https://rahnmonitor.co.za/"
            className="more-btn tran3s text-uppercase fw-500 fs-13"
          >
            GO TO RAHN MONITOR
          </a>
        </div>
        {/* End card-one */}
      </div>
      {/* End .row */}

      <Illustration />
      {/* /.illustration-holder */}
    </div>
  );
};

export default Hero;
