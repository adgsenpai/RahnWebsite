import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import CallToAction from "../components/home-page/home/CallToActions";
import Link from "next/link";
import SendCV from "../components/cv/SendCV";
import { NextSeo } from "next-seo";
const Recruitment = () => {
  return (
    <>
      <NextSeo
        title="Recruitment - RAHN Consolidated (PTY) Ltd"
        description="A recruitment service provider that helps clients in the financial sector find the right talent for the right job"
        openGraph={{
          url: "https://rahn.co.za/recruitment",
          title: "Recruitment - RAHN Consolidated (PTY) Ltd",
          description:
            "A recruitment service provider that helps clients in the financial sector find the right talent for the right job",
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
                      </div>{" "}
                      <h1 className="main-title fw-500 tx-dark">
                        Unlocking Opportunities, One Exceptional Candidate at a
                        Time.
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
                  src="/images/icon/Rahnrecruitment.svg"
                  alt="shap"
                />
              </div>
            </div>
          </div>
        </div>
        {/* /.container */}
        <img
          src="/images/shape/shape_172.svg"
          alt="shap"
          className="lazy-img shapes shape-three"
        />
        <img
          src="/images/shape/shape_175.svg"
          alt="shap"
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
                <h2 className="main-title tx-dark mb-30">
                  RAHN IT Recruitment
                </h2>
                <p className="text-lg tx-dark">
                  Welcome to RAHN IT Recruitment, a recruitment service provider
                  that helps clients find the right talent for the right job.
                </p>
                <img
                  src="/images/media/RahnITRecruitment.png"
                  alt="Rahn IT Recruitment Meeting"
                  className="main-img-meta"
                />
                <p className="text-lg tx-dark">
                  Contributing to the growth of their businesses and teams’
                  success. Our approach is different from other IT recruitment
                  companies. We prioritize the individual and nurture the entire
                  recruitment process, building strong relationships with our
                  clients and candidates.
                  <br />
                  <br />
                  Our expertise lies in providing skilled professionals for
                  various contract and permanent roles, including:
                </p>
                <div className="mt-50 lg-mt-30">
                  <div className="row gx-xxl-5">
                    <h4 className="sub-title mb-20 tx-dark">
                      We specialise in the following skills
                    </h4>
                    <div className="col-lg-6">
                      <br />
                      <ul className="style-none list-item md-mb-40">
                        <li>SQL Developers</li>
                        <li>.NET Developers</li>
                        <li>Full Stack Developer</li>
                        <li>Program Manager</li>
                        <li>Project Managers</li>
                        <li>Business Analysts</li>
                        <li>Solutions Architects</li>
                        <li>Data Architects</li>
                        <li>Enterprise Architects</li>
                        <li>Process Analysts</li>
                        <li>C++ Engineers </li>
                        <li>Front end Engineers</li>
                        <li>Back end Engineers</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <h4 className="sub-title mb-20 tx-dark"></h4>
                      <ul className="style-none list-item md-mb-40">
                        <li>VP of Engineering</li>
                        <li>Embedded Engineer</li>
                        <li>Data Scientist</li>
                        <li>Scrum Masters</li>
                        <li>Change Managers</li>
                        <li>Testers</li>
                        <li>UI/UX Designers</li>
                        <li>Cloud Engineers</li>
                        <li>Data and Business Analysts</li>
                        <li>Short Long-Term Consultants</li>
                        <li>Production Support Teams</li>
                        <li>Project and Delivery Teams</li>
                        <li>BAU Process Support</li>
                        <li>Skill and Knowledge Transfer</li>
                        <li>Employment Solutions</li>
                      </ul>
                    </div>
                  </div>
                  <br />
                  <img
                    src="/images/media/Rahn-Recruitment.png"
                    alt="Rahn IT Recruitment Meeting"
                    className="main-img-meta"
                  />
                </div>
              </div>
              {/* /.service-details-meta */}
            </div>
            {/* End .col-xl-9 */}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-9 m-auto">
              <p>
                {" "}
                <h3 className="tx-dark text-center mt-40 mb-20 lg-mt-40 lg-mb-50 wow fadeInUp">
                  INTRODUCING The RAHN Recruitment Candidate Screening
                  Application : a user-friendly platform designed to simplify
                  your job application process.
                </h3>
                <br />
                <h4 className="sub-title mb-20 tx-dark">
                  RAHN Multimedia Candidate Recruitment Screening Tool.
                </h4>
                <p className="text-lg tx-dark">
                  With our streamlined interface and comprehensive features, you
                  can effortlessly submit your qualifications, showcase your
                  skills through multimedia, and take a step closer to your
                  dream job. Join us on this journey to unlock new career
                  possibilities and make your next career move with confidence.
                  Welcome to a smarter way to job hunt! <br />
                  <br />
                  <b>
                    <p className="text-center">
                      <i>
                        Click on the RAHN Multi-Media Screening button below to
                        take advantage of the application.
                      </i>
                    </p>
                  </b>
                  <div className="col-lg-4 m-auto">
                    {" "}
                    <br />
                    <Link
                      href="https://screening.rahn.co.za/"
                      target="_blank"
                      className="btn-twentyOne fw-500 tran3s text-center"
                    >
                      Multi-Media Screening
                    </Link>
                  </div>
                </p>
                <br />
                <h3 className="text-center tx-rahn">
                  If you’d simply like to send us your CV, fill in the form and
                  Upload your CV Today!
                </h3>
              </p>
            </div>
          </div>
        </div>
        <div className="fancy-short-banner-thirteen pt-85 pb-120 mt-80 lg-mt-70 lg-pt-80 lg-pb-60 aos-init aos-animate">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-50">
              <div className="col-md-6 bg-wrapper zn2 bg-white position-center">
                <div className="row">
                  <div className="col-xl-12 p-4">
                    <div className="row mt-4 mb-4">
                      <SendCV />
                      {/* /.form-style-one */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.service-details */}
      {/*
			=====================================================
				Fancy Short Banner Sixteen
			=====================================================
			*/}

      <CallToAction />
      <DefaultFooter />
    </>
  );
};

export default Recruitment;
