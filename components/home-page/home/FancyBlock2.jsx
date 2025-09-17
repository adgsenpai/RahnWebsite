const FancyBlock2 = () => {
  const cardsData = [
    {
      icon: "/images/icon/EmbracingDataIntegrity.svg",
      title: "Embracing Data Integrity:",
      subtitle: "Integrity and confidentiality are our guiding principles.",
      delay: "100",
    },
    {
      icon: "/images/icon/QueProcessing.svg",
      title: "Effortless Queue Processing:",
      subtitle: "We've implemented a sophisticated queue processing system.",
      delay: "200",
    },
    {
      icon: "/images/icon/SeamlessReporting.svg",
      title: "Seamless Reporting:",
      subtitle: "Streamlined the process to ensure your convenience. ",
      delay: "300",
    },
  ];

  return (
    <>
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="col-lg-3 col-md-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={card.delay}
        >
          <div className="card-style-two mt-40">
            <div className="icon d-flex align-items-end">
              <img src={card.icon} alt="" className="lazy-img" />
            </div>
            <span className="d-inline-block text-uppercase fs-14 opacity-75 mt-30 mb-10">
              {card.title}
            </span>
            <h4 className="fw-500 m0">{card.subtitle}</h4>
          </div>
          {/* /.card-style-two */}
        </div>
      ))}
    </>
  );
};

export default FancyBlock2;
