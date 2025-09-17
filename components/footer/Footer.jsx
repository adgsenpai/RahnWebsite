import React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkedInSubscribeButton from "../linkedin/LinkedInButton";

const Footer = () => {
  const links = [
    {
      id: 1,
      title: "",
      column: "col-xl-3 col-lg-4 col-md-5 mb-30",
      items: [
        { label: "", href: "/" },
        { label: "RAHN Recruitment", href: "/recruitment" },
        { label: "RAHN Consulting", href: "/consulting" },
        { label: "RAHN Software", href: "/software" },
        { label: "RAHN Monitor", href: "/rahnmonitor" },

        { label: "RAHN Blogs", href: "/blogs" },
        { label: "", href: "/" },
        {
          label: (
            <img
              src="https://rahnmonitor.co.za/static/img/BEE-Level-2web.png"
              alt="BEE-Level-2web"
              width="155"
              height="61"
              padding-top="5"
            />
          ),
          href: "/",
        },
      ],
    },
  ];

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
      <div className="col-lg-3 footer-intro mb-0 pt-10">
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
        <p className="text-white opacity-75 fs-18 mt-15 mb-20 lg-mb-10 ">
          FOCUSED INNOVATIVE EFFECTIVE
        </p>

        <p className="text-white opacity-50 fs-15 mb-40 d-lg-block">
          <Link href="/">
            &copy; {new Date().getFullYear()} Rahn Consolidated Pty Ltd.
          </Link>
          <Link href="/privacypolicy">Privacy Policy</Link> |{" "}
          <Link href="/images/assets/RahnPAIAManual.pdf" target="_blank">
            PAIA Manual
          </Link>
        </p>
        <p className="text-white opacity-80 fs-15 mb-0 d-lg-block">
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
          <Link href="/images/assets/Internal Appeal Form.pdf" target="_blank">
            Internal Appeal Form
          </Link>
        </p>
        <br />
      </div>
      {links.map((link) => (
        <div className={link.column} key={link.id}>
          <h5 className="footer-title text-white fw-500">{link.title}</h5>
          <ul className="footer-nav-link style-none">
            {link.items.map((item, i) => (
              <li key={i}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="col-xl-3 col-lg-4 col-md-5 mb-30">
        <br />
        <p className="text-white opacity-75 mb-10 mt-10">
          Van Vuuren Street <br /> Mulberry Gardens
          <br /> Constantia Kloof
          <br /> Johannesburg <br />
          1709
          <br />
          Tel : +27 87 802 1384
        </p>{" "}
        <div className="col-xl-3 col-lg-4 col-md-5 mb-30">
          <ul className="d-flex social-icon style-none ">
            {socialIcons.map((icon, index) => (
              <li key={index}>
                <a href={icon.link} target="_blank" rel="noopener noreferrer">
                  <i className={icon.iconClass} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <LinkedInSubscribeButton />
      </div>
    </>
  );
};

export default Footer;
