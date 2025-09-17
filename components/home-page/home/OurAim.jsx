import Link from "next/link";

const OurAim = () => {
  const aimItems = [
    {
      title: "Sanctions Screening",
      heading: "Your Compliance is Our Priority",
      text: "Compliance officers and managers use Rahn Monitor to confirm sanctions hits and understand the target data before making on-boarding or exit decisions.",
      list: ["Updated Daily", "Pay-as-you-go", "API Availability"],
      link: "/home/who-we-are",
    },
  ];

  const imageItems = [
    { src: "/images/media/RahnMonitorGrapgic.png", alt: "Rahn monitor Graphic" },
    {
      src: "/images/shape/shape_10.svg",
      alt: "shape",
      className: "shapes shape-two",
    },
    {
      src: "/images/shape/shape_11.svg",
      alt: "shape",
      className: "lazy-img shapes shape-four",
    },
    {
      src: "/images/shape/shape_12.svg",
      alt: "shape",
      className: "lazy-img shapes shape-five",
    },
    {
      src: "/images/shape/shape_13.svg",
      alt: "shape",
      className: "lazy-img shapes shape-seven",
    },
  ];

  return (
    <div className="row">
      <div className="col-lg-5 col-md-6 ms-auto order-md-last">
        {aimItems.map((item, index) => (
          <div className="block-style-one" data-aos="fade-left" key={index}>
            <div className="title-style-one">
              <div className="sc-title text-uppercase">{item.title}</div>
              <h2 className="main-title fw-bold tx-dark m0">{item.heading}</h2>
            </div>
            <p className="text-lg tx-dark pt-35 pb-40 lg-pb-20">{item.text}</p>
            <ul className="style-none list-item fs-18">
              {item.list.map((listItem, index) => (
                <li key={index}>{listItem}</li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          href="https://rahnmonitor.co.za/"
          className="more-btn tran3s fw-500 fs-18"
          data-aos="fade-left"
        >
          Go to RAHN Monitor<i className="bi bi-arrow-right"></i>
        </Link>
      </div>
      {/* End .col */}

      <div className="col-md-6 order-md-first " data-aos="fade-right">
        <div className="img-meta d-inline-block position-relative ps-3 ps-lg-1 pb-50 md-mt-50 mt-40 sm-mt-80">
          {imageItems.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={item.className}
            />
          ))}

          {/* <div className="card-one" data-aos="fade-up" data-aos-delay="200">
            <div className="icon d-flex align-items-center justify-content-center rounded-circle">
              <img src={cardItem.imgSrc} alt="shape" className="lazy-img" />
            </div>
            <div className="name fs-18 fw-500 tx-dark mb-10">
              - {cardItem.name},{" "}
              <span className="opacity-50">{cardItem.position}</span>
            </div>
            <p className="fs-18 m0">{cardItem.text}</p>
          </div> */}
          {/* /.card-one */}
        </div>
        {/* /.img-meta */}
      </div>
    </div>
  );
};

export default OurAim;
