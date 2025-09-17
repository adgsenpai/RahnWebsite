import Link from "next/link";

const servicesData = [
  {
    bgColor: "rgba(220, 222, 224)",
    iconSrc: "/images/icon/SanctionsDataset.svg",
    title: "Sanctions Dataset",
    description:
      "Our dataset is updated daily via an automated process to synchronise with the major data lists.",
  },
  {
    bgColor: "rgba(230, 163, 167, 0.58)",
    iconSrc: "/images/icon/SearchFeature.svg",
    title: "Search Feature",
    description:
      "Our search function allows users to search for specific individuals via the user interface.",
  },
  {
    bgColor: "rgba(191, 193, 195, 0.58)",
    iconSrc: "/images/icon/CustomDatabase.svg",
    title: "Custom Database",
    description:
      "Our custom database functionality allows a user to build their own internal do-not-do-business list.",
  },
  {
    bgColor: "rgba(230, 163, 167, 0.68)",
    iconSrc: "/images/icon/AdverseMedia.svg",
    title: "Adverse Media",
    description:
      "Our adverse media scanning tool searches and analyzes public sources of information to identify potential risks.",
  },
];

const Services = () => {
  return (
    <>
      {servicesData.map((service, index) => (
        <div
          key={index}
          className={`col-lg-3 col-sm-6`}
          data-aos="fade-up"
          data-aos-delay={`${index * 100}`}
        >
          <div className="card-style-one pe-xxl-5 position-relative mt-40">
            <div
              className="icon d-flex align-items-center justify-content-center"
              style={{ backgroundColor: service.bgColor }}
            >
              <img src={service.iconSrc} alt="icon" className="lazy-img" />
            </div>
            <h5 className="fw-500 mt-35 mb-25">
              <Link
                href="https://rahnmonitor.co.za/"
                className="tran3s tx-dark"
              >
                {service.title}
              </Link>
            </h5>
            <p className="mb-25">{service.description}</p>
            {/* <Link href="/pages-menu/service-details">
              <img
                src="/images/icon/icon_05.svg"
                alt="icon"
                className="lazy-img"
              />
            </Link> */}
          </div>
          {/* /.card-style-one */}
        </div>
      ))}
    </>
  );
};

export default Services;
