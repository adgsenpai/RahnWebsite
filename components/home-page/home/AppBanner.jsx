const AppBanner = () => {
  const features = [
    "Search Functionality",
    "Your Own Custom Database",
    "Batch Scan",
  ];

  // const buttons = [
  //   {
  //     platform: "Google play",
  //     icon: "images/icon/playstore.svg",
  //     className: "windows-button",
  //   },
  // ];

  return (
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="block-style-seven wow fadeInLeft">
          <div className="title-style-one">
            <div className="sc-title text-uppercase">MOBILE APP</div>
            <h2 className="main-title fw-500 tx-dark m0">
              Download the RAHN Monitor Mobile Application.
            </h2>
          </div>
          <p className="fs-20 pt-30 pb-30 lg-pb-20">
            Take control of all your Anti Money Laundering Compliance
          </p>
          <ul className="style-none list-item">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          {/* End list */}

          {/* <div className="d-sm-flex align-items-center platform-button-group-three mt-55 lg-mt-30">
            {buttons.map((button, index) => (
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=za.co.rahnmonitor.twa&pcampaignid=web_share"
                className={`d-flex align-items-center ${button.className}`}
                key={index}
              >
                <img src={button.icon} alt="" className="lazy-img icon" />
                <div>
                  <span>Get it on</span>
                  <strong>{button.platform}</strong>
                </div>
              </a>
            ))}
          </div> */}
          {/* /.platform-button-group-three */}
        </div>
        {/* /.block-style-seven */}
      </div>
      {/* End col-6 */}

      <div className="col-lg-6 wow fadeInRight">
        <div className="illustration-holder position-relative pt-50 pb-50 pe-md-5 lg-mt-80">
          <a href="https://rahnmonitor.co.za/">
            <img
              src="images/assets/RahnMonitorPicture.png"
              alt="RAHN Monitor Mobile Application"
              className="lazy-img screen-two"
            />
          </a>

          <img
            src="images/shape/shape_140.svg"
            alt="Point to RAHN Monitor"
            className="lazy-img shapes shape-two"
          />
        </div>{" "}
        {/* /.illustration-holder */}
      </div>
    </div>
  );
};

export default AppBanner;
