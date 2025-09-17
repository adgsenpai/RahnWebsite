import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import Faq from "../components/services/Faq";
import Block from "../components/services/Block";
import { NextSeo } from "next-seo";
import Link from "next/link";

const WhoWeAre = () => {
  const features = [
    { text: "Recruitment" },
    { text: "Consulting" },
    { text: "Software" },
  ];

  const starRating = Array(5)
    // @ts-ignore
    .fill()
    .map((_, index) => (
      <li key={index}>
        <i className="fa-solid fa-star" />
      </li>
    ));

  return (
    <>
      <NextSeo
        title="Who We Are - RAHN Consolidated (PTY) Ltd"
        description="We provide quality specialized Recruitment, consulting and software services"
        openGraph={{
          url: "https://rahn.co.za/who-we-are",
          title: 'Who We Are - RAHN Consolidated (PTY) Ltd"',
          description:
            "We provide quality specialized Recruitment, consulting and software services ",
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

      {/* <!-- Theme Default Menu --> */}
      <DefaulHeader />

      {/* =============================================
          Feature Section Fifty One
      ============================================== */}
      <div className="fancy-feature-fiftyOne position-relative mt-200">
        <div className="container">
          <div className="row align-items-center">
            {/* Text Section */}
            <div className="col-lg-7" data-aos="fade-right">
              <div className="title-style-five mb-65 md-mb-40">
                <h1 className="main-title fw-500 tx-dark">Who We Are.</h1>
              </div>
              <div className="ps-xxl-5">
                <h6 className="mb-30">Innovators of Success</h6>
                <p className="text-lg tx-dark">
                  RAHN is your trusted partner for businesses in Fintech,
                  Financial Services, Agriculture, Healthcare, Legal, and
                  Retail, helping you thrive in the digital age. Our mission is
                  to streamline your operations using AI-powered tools and
                  expert guidance, aligning with our vision to deliver seamless
                  digital transformation. <br /> <br />
                 
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="col-lg-5" data-aos="fade-left">
              <div className="card-body h-100 p-3">
                <img
                  className="w-100 position-relative z-index-2 pt-4"
                  src="/images/logo/RahnLogo.png"
                  alt="shap"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-xl-8 order-lg-1">
              <div className="service-details-meta ps-lg-5">
                <br />
                <br />
                {/* <h2 className="main-title tx-dark mb-30">
                  RAHN IT Recruitment
                </h2> */}
                <p className="text-lg tx-dark"></p>
                <img
                  src="/images/logo/WhoWeAre.jpg"
                  alt="Rahn IT Recruitment Meeting"
                  className="main-img-meta"
                />
                <p className="text-lg tx-dark">
                   We analyse your processes, identify bottlenecks, and provide
                  tailored solutions to boost efficiency and profitability.
                  Through our specialist recruitment arm, we supply skilled
                  consultants to implement projects seamlessly, ensuring rapid
                  and effective adaptation. At Rahn, we simplify transformation,
                  allowing you to focus on your core business.
                  <br />
                  <br />
                  Our expertise lies in providing skilled professionals for
                  various contract and permanent roles, including:
                </p>
                
              </div>
              {/* /.service-details-meta */}
            </div>
            {/* End .col-xl-9 */}
          </div>
        </div>
        {/* Decorative Shapes */}
        <img
          src="/images/shape/shape_171.svg"
          alt="shape"
          className="lazy-img shapes shape-one"
        />
        <img
          src="/images/shape/shape_172.svg"
          alt="shape"
          className="lazy-img shapes shape-two"
        />
      </div>
      {/* /.fancy-feature-fiftyOne */}

      {/* =============================================
          Feature Section Thirty Seven
      ============================================== */}
      {/* <div className="fancy-feature-thirtySeven mt-225 lg-mt-120">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="block-style-four pe-xxl-5 me-xxl-4 md-mb-70"
                data-aos="fade-right"
              >
                
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* =============================================
          Feature Section Thirty Eight
      ============================================== */}
      <div className="fancy-feature-thirtyEight mt-180 lg-mt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="block-style-seven" data-aos="fade-right">
                <div className="title-style-six">
                  <div className="sc-title-two text-uppercase">SOLUTION</div>
                  <h2 className="main-title fw-500 tx-dark">
                    We can help you in the following areas:
                  </h2>
                </div>
                <p className="fs-20 pt-10 pb-30 lg-pb-20">
                  Combining AI expertise with data-driven strategy, we support
                  Analytics teams and Data Scientists with leadership grounded
                  in strong modelling, business, and technical skills.
                </p>
                <div className="btn-eighteen position-relative d-inline-block tx-dark">
                  <Link href="/consulting" className="fw-500 tran3s">
                    More About solutions
                    <i className="fa-solid fa-angle-right" />
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 ms-auto order-lg-last"
              data-aos="fade-left"
            >
              <Faq />
            </div>
          </div>
        </div>

        <div className="partner-section-six position-relative mt-80 lg-mt-80">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <h3 className="title tx-dark text-center text-lg-start md-pb-10 m0"></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =============================================
          Fancy Short Banner Sixteen
      ============================================== */}
      <div
        className="fancy-short-banner-sixteen mt-130 lg-mt-80"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="bg-wrapper pt-65 pb-65 lg-pt-40 lg-pb-40">
            <div className="row">
              <div className="col-xl-10 col-md-11 m-auto">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="text-wrapper text-center text-lg-start md-pb-30">
                      <div className="sc-title fs-18 pb-10">
                        Do You Have Any Questions?
                      </div>
                      <h2 className="main-title fw-500 text-gray m0">
                        Don't hesitate to get in touch!
                      </h2>
                    </div>
                  </div>

                  <div className="col-lg-5 ms-auto text-center text-lg-end">
                    <Link
                      href="/contact"
                      className="btn-twentyOne fw-500 tran3s"
                    >
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* =============================================
          Footer
      ============================================== */}
      <DefaultFooter />
    </>
  );
};

export default WhoWeAre;
