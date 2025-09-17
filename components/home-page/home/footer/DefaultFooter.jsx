import Link from "next/link";
import Footer2 from "./Footer2";
import Image from "next/image";
import LinkedInSubscribeButton from "../linkedin/LinkedInButton";

const DefaultFooter = () => {
  const socialIcons = [
    {
      iconClass: "fab fa-facebook-f",
      link: "https://www.facebook.com/RahnConsolidated",
    },
    {
      iconClass: "fab fa-instagram",
      link: "https://www.instagram.com/rahnconsolidated/",
    },
    {
      iconClass: "fab fa-linkedin-in",
      link: "https://www.linkedin.com/company/rahn-consolidated-itconsulting-businessanalytics-bireporting-itrecruitment-financialcrimeproducts/",
    },
    {
      iconClass: "fab fa-youtube",
      link: "https://www.youtube.com/@rahnconsolidatedptyltd4813",
    },
  ];

  return (
    <>
      <div>
        <br />
      </div>
      <div className="footer-style-eleven theme-basic-footer position-relative">
        <div className="bg-wrapper position-relative">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-3 footer-intro mb-15">
                <div className="logo order-lg-0">
                  <Link href="/" className="d-block">
                    <Image
                      src="/images/logo/RahnProfilelogo.png"
                      alt="Rahn Monitor Pty Ltd"
                      width={70}
                      height={68}
                    />
                  </Link>
                </div>
                <div>
                  <p className="text-black opacity-75 fs-18 mt-15 mb-20 lg-mb-10">
                    FOCUSED INNOVATIVE EFFECTIVE
                  </p>
                  <p className="text-black opacity-50 fs-15 mb-40 d-lg-block">
                    <Link href="/">
                      &copy; {new Date().getFullYear()} Rahn Consolidated Pty
                      Ltd.
                    </Link>
                    <Link href="/privacypolicy" target="_blank">
                      Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link
                      href="/images/assets/RahnPAIAManual.pdf"
                      target="_blank"
                    >
                      PAIA Manual
                    </Link>{" "}
                  </p>
                  <p className="text-black opacity-40 fs-15 mb-10 d-lg-block">
                    <Link
                      href="/images/assets/Request for Access to Record.pdf"
                      target="_blank"
                    >
                      Request for Access to Record
                    </Link>{" "}
                    <br />
                    <Link
                      href="/images/assets/Outcome of request and of fees payable.pdf"
                      target="_blank"
                    >
                      Outcome of request and of fees payable
                    </Link>{" "}
                    <br />
                    <Link
                      href="/images/assets/Internal Appeal Form.pdf"
                      target="_blank"
                    >
                      Internal Appeal Form
                    </Link>
                  </p>
                  <br />
                </div>
              </div>

              {/* End .col */}

              <Footer2 />

              <div className="col-xl-3 col-lg-4 col-md-5 mb-30">
                <p className="text-dark mt-30 mb-20">
                  Van Vuuren Street <br />
                  Mulberry Gardens <br />
                  Constantia Kloof <br />
                  Johannesburg <br />
                  1709 <br />
                  Tel: +27 87 802 1384
                </p>{" "}
                <div className="col-xl-3 col-lg-3 col-sm-4 mb-30">
                  <ul className="d-flex social-icon style-none">
                    {socialIcons.map((icon, index) => (
                      <li key={index}>
                        <a
                          href={icon.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={icon.iconClass} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <LinkedInSubscribeButton />
              </div>
            </div>
            {/* End .col-xl-3 */}
            <br></br>
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* /.container */}
      </div>
      {/* /.bg-wrapper */}
    </>
  );
};

export default DefaultFooter;
