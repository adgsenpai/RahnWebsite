import Seo from "../components/common/Seo";
import DefaulHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import CallToAction from "../components/home-page/home/CallToActions";
import { NextSeo } from "next-seo";
import Link from "next/link";

const AMLSoftwareLawyersEstateAgents = () => {
  return (
    <>
      <NextSeo
        title="AML Software for Lawyers & Estate Agents | FIC Act Compliance SA"
        description="AML software for lawyers and estate agents in South Africa. Automate sanctions screening, PEP checks, adverse media monitoring, and ongoing FIC Act compliance. Book a demo."
        canonical="https://rahn.co.za/aml-software-for-lawyers-estate-agents"
        openGraph={{
          url: "https://rahn.co.za/aml-software-for-lawyers-estate-agents",
          title:
            "AML Software for Lawyers & Estate Agents | FIC Act Compliance SA",
          description:
            "AML software built for lawyers and estate agents in South Africa. Automate sanctions screening, adverse media monitoring, and ongoing compliance.",
          site_name: "RAHN Consolidated (PTY) Ltd",
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
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-12" data-aos="fade-right">
                    <div className="title-style-five mb-65 lg-mb-40">
                      <div className="sc-title-two fst-italic position-relative">
                        Stay Compliant with the FIC Act
                      </div>
                      <h1 className="main-title fw-500 tx-dark">
                        AML Software for Lawyers and Estate Agents in South
                        Africa
                      </h1>
                      <p className="text-lg tx-dark mt-4">
                        Stay compliant with the FIC Act using automated AML
                        screening, sanctions checks, and ongoing monitoring —
                        built specifically for accountable institutions.
                      </p>
                    </div>
                  </div>
                </div>
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
                <h2 className="main-title tx-dark mb-30">
                  The Compliance Challenge
                </h2>
                <p className="text-lg tx-dark">
                  Law firms and estate agencies in South Africa face increasing
                  scrutiny under the Financial Intelligence Centre Act FIC
                  Act. Manual checks, spreadsheets, and once-off screenings are
                  no longer enough to meet regulatory expectations.
                </p>

                <div className="mt-50 lg-mt-30">
                  <h3 className="tx-dark mb-20">
                    Non-compliance can result in:
                  </h3>
                  <ul className="style-none list-item md-mb-40">
                    <li>Regulatory penalties</li>
                    <li>Reputational damage</li>
                    <li>Delayed transactions</li>
                    <li>Increased operational risk</li>
                  </ul>
                  <br />
                  <p className="sub-title mb-20 tx-dark">
                    Rahn Monitor provides a purpose-built AML software solution
                    designed to help lawyers and estate agents meet their
                    compliance obligations efficiently and confidently.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">
                    Who This Solution Is For
                  </h2>
                  <p className="sub-title mb-20 tx-dark">
                    This AML solution is designed for:
                  </p>
                  <ul className="style-none list-item md-mb-40">
                    <li>Law firms and legal practitioners</li>
                    <li>Estate agencies and property professionals</li>
                    <li>Conveyancers and notaries</li>
                    <li>
                      Compliance officers and principals of accountable
                      institutions
                    </li>
                  </ul>
                  <p className="sub-title mb-20 tx-dark">
                    Whether you manage a small practice or a multi-branch firm,
                    Rahn Monitor scales with your compliance needs.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">
                    Key Compliance Challenges We Solve
                  </h2>

                  <h3 className="tx-dark mb-20">
                    1. Client Due Diligence (CDD & EDD)
                  </h3>
                  <p className="sub-title mb-20 tx-dark">
                    Perform fast, accurate identity and risk checks before
                    onboarding clients.
                  </p>

                  <h3 className="tx-dark mb-20">
                    2. Sanctions & PEP Screening
                  </h3>
                  <p className="sub-title mb-20 tx-dark">
                    Screen clients against:
                  </p>
                  <ul className="style-none list-item md-mb-40">
                    <li>Global sanctions lists</li>
                    <li>Politically Exposed Persons (PEPs)</li>
                    <li>Watchlists relevant to South African compliance</li>
                  </ul>

                  <h3 className="tx-dark mb-20">3. Adverse Media Monitoring</h3>
                  <p className="sub-title mb-20 tx-dark">
                    Identify hidden risks by detecting negative media linked to:
                  </p>
                  <ul className="style-none list-item md-mb-40">
                    <li>Fraud</li>
                    <li>Corruption</li>
                    <li>Financial crime</li>
                    <li>Regulatory breaches</li>
                  </ul>

                  <h3 className="tx-dark mb-20"> 4. Ongoing Monitoring</h3>
                  <p className="sub-title mb-20 tx-dark">
                    Compliance doesn't end after onboarding. Rahn Monitor
                    continuously monitors clients and alerts you to new risks.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">
                    Features Built for Lawyers & Estate Agents
                  </h2>
                  <ul className="style-none list-item md-mb-40">
                    <li>Automated AML screening</li>
                    <li>Sanctions, PEP & watchlist checks</li>
                    <li>Adverse media screening</li>
                    <li>Continuous monitoring & alerts</li>
                    <li>Search notifications</li>
                    <li>Batch screening for multiple clients</li>
                    <li>Audit-ready records & reporting</li>
                    <li>API integration for custom workflows</li>
                  </ul>
                  <p className="sub-title mb-20 tx-dark">
                    All results are securely stored, searchable, and exportable
                    for audits and regulatory reviews.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">
                    Why Choose Rahn Monitor?
                  </h2>

                  <h3 className="tx-dark mb-20">
                    ✔ Built for South African Compliance
                  </h3>
                  <p className="sub-title mb-20 tx-dark">
                    Designed with the FIC Act and local regulatory requirements
                    in mind.
                  </p>

                  <h3 className="tx-dark mb-20">✔ Affordable & Scalable</h3>
                  <p className="sub-title mb-20 tx-dark">
                    Ideal for small to medium firms that need enterprise-level
                    AML without enterprise pricing.
                  </p>

                  <h3 className="tx-dark mb-20">✔ Easy to Use</h3>
                  <p className="sub-title mb-20 tx-dark">
                    No complex setup. Your team can start screening clients
                    immediately.
                  </p>

                  <h3 className="tx-dark mb-20">
                    ✔ Trusted Compliance Technology
                  </h3>
                  <p className="sub-title mb-20 tx-dark">
                    Used by professionals who need accuracy, reliability, and
                    defensible compliance processes.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">How It Works</h2>
                  <p className="sub-title mb-20 tx-dark">
                    Simple 3-Step Process:
                  </p>
                  <ol className="style-none list-item md-mb-40">
                    <li>1. Search a client name</li>
                    <li>2. Review matched results and risk indicators</li>
                    <li>3. Receive alerts if risk status changes over time</li>
                  </ol>
                  <p className="sub-title mb-20 tx-dark">
                    That's it. No spreadsheets. No manual list checks.
                  </p>
                  <br />

                  <h2 className="main-title tx-dark mb-30">
                    Compliance Confidence Starts Here
                  </h2>
                  <h3 className="tx-dark mb-20">Book a Demo of Rahn Monitor</h3>
                  <p className="sub-title mb-20 tx-dark">
                    See how Rahn Monitor helps lawyers and estate agents stay
                    compliant, reduce risk, and streamline AML processes.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="btn-twentyOne fw-500 tran3s me-3 mb-3"
                    >
                      Request a Demo
                    </Link>

                    <Link
                      href="/contact"
                      className="btn-twentyOne fw-500 tran3s mb-3"
                    >
                      Contact Our Compliance Team
                    </Link>
                  </div>
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
        =============================================
        Contact Section One
        ============================================== 
        */}
      <CallToAction />
      <DefaultFooter />
    </>
  );
};

export default AMLSoftwareLawyersEstateAgents;
