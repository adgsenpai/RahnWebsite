import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import Link from "next/link";
import CallToAction from "../components/home-page/home/CallToActions";
import { NextSeo } from "next-seo";
const consulting = () => {
  return (
    <>
      <NextSeo
        title="Consulting - RAHN Consolidated (PTY) Ltd"
        description="We provide quality consulting  anti money laundering services"
        openGraph={{
          url: "https://rahn.co.za/consulting",
          title: "Consulting - RAHN Consolidated (PTY) Ltd",
          description:
            "We provide quality consulting  anti money laundering services",
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
                        Your vision, our guidance: Navigating success together
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
                  src="/images/icon/Rahnconsulting.svg"
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
                <h2 className="main-title tx-dark mb-30">RAHN Consulting</h2>
                <p className="text-lg tx-dark">
                  Welcome to RAHN Consulting, where we provide the services of
                  data professionals who specialize in the financial IT
                  landscape.
                </p>
                <img
                  src="/images/media/Rahn Consulting1.png"
                  alt="Rahn Recruitment Meeting"
                  className="main-img-meta"
                />
                <div className="mt-50 lg-mt-30">
                  <h4 className="sub-title mb-20 tx-dark">
                    We have a diversity of skills in our Team
                  </h4>
                  <div className="row gx-xxl-5 ">
                    <div className="col-lg-12 ">
                      <br />
                      <p>
                        Our team is composed of software and business
                        intelligence developers, business and data analysts, and
                        project managers, who are dedicated to helping project
                        and delivery teams achieve their goals. <br />
                        <br />
                        We understand that finding the right professionals for
                        your IT projects can be a daunting task. That is why we
                        partner with experienced technical professionals to
                        ensure the perfect fit for your unique business and data
                        resource requirements. <br />
                        <br />
                        Our Rahn Specialists represent our most experienced
                        teams and individuals, who provide key services that
                        impact your business’s core objectives
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.service-details-meta */}
            </div>
            {/* End .col-xl-9 */}
          </div>
          <div className="row">
            <div className="col-xl-12 col-xl-8 order-lg-1">
              <div className="service-details-meta ps-lg-5">
                <img
                  src="/images/media/RahnConsulting2.png"
                  alt="Rahn IT Recruitment Meeting"
                  className="main-img-meta"
                />
                <h4 className="sub-title mb-20 tx-dark">
                  AI Driven Solitons for Finance, Fintech, Agriculture,
                  Healthcare, Legal and Retail
                </h4>
                <br />
                <p>
                  AI Driven Solitons for Finance, Fintech, Agriculture,
                  Healthcare, Legal and Retail. These sectors
                  demand agility and precision. Rahn’s solutions are crafted to
                  tackle your unique challenges, delivering value through
                  innovation.
                  <li>
                    Streamline Operations: Our AI tools automate tasks, such as
                    payment processing or stock management, freeing resources
                    for growth.
                  </li>
                  <li>
                    Enhance Customer Insights: Use AI to analyse data and
                    deliver personalised experiences that strengthen customer
                    loyalty.
                  </li>
                  <li>
                    Cost Reduction: Our optimised processes minimise waste and
                    improve margins, keeping you competitive.
                  </li>
                  <li>
                    Seamless Implementation: Our consultants integrate AI
                    solutions with precision, ensuring minimal disruption to
                    your business.
                  </li>
                </p>
                <div className="mt-50 lg-mt-30">
                  <h4 className="sub-title mb-20 tx-dark">
                    We specialise in the following skills
                  </h4>
                  <div className="row gx-xxl-5">
                    <div className="col-lg-6 ">
                      <br />
                      <ul className="style-none list-item md-mb-40">
                        <li>Data Management</li>
                        <li>Regulatory Reporting</li>
                        <li>Change management and learning training models through gamification </li>
                        <li>Bespoke Ai Solution Development</li>
                        <li>Subject Matter Experts</li>
                        <li>Risk Modelling</li>
                        <li>Business Knowledge</li>
                        <li>Access to a Network of Solutions-Based Partners</li>
                        <li>Process Optimisation</li>
                        <li>Regulatory reporting and knowledge </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 ">
                      <br />
                      <p>
                        Our software specialists develop solutions that range
                        from bespoke software to macro strategic roadmaps, and
                        everything in between. <br />
                        <br />
                        Through our strategic partnerships, we offer specialist
                        services across Fintech, Financial Services,
                        Agriculture, Healthcare, Legal, and Retail covering the
                        full ecosystem, including data management, regulatory
                        reporting, AML and FIC Act compliance, risk modelling,
                        and sector-specific business and regulatory expertise.
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <p className="sub-title mb-20 tx-dark text-lg">
                  How can our Software Specialists improve your Core functions?
                  At RAHN Consulting, we seamlessly integrate with existing
                  teams or initiate projects, ensuring that our clients receive
                  the support they need to succeed.
                  <br />
                  <br />
                </p>
                <h3 className="text-center ">
                  If you are interested in discussing your IT project
                  requirements with us, please speak to our team today. We look
                  forward to collaborating with you!
                </h3>
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

export default consulting;
