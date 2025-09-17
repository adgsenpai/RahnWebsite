import Image from "next/image";
import Router from "next/router";
const Feature = () => {
  const features = [
    {
      background: "linear-gradient(310deg, #bfc1c3  0%, #f5f5f5  80%)",
      title: <>Recruitment</>,
      description:
        "At RAHN, we help Fintech, Agri, Health, Legal, and Retail find the right talent for the right roles.",
      icon: "images/icon/Rahnrecruitment.svg",
      link: "/recruitment",
      width: "200",
      height: "200",
      delay: "100",
    },
    {
      background: "linear-gradient(310deg, #c0555f  0%, #ffd6da  80%)",
      title: <>Consulting</>,
      width: "200",
      height: "200",
      description:
        "RAHN Consulting represent our most experienced teams who provide specialist services.",
      icon: "images/icon/Rahnconsulting.svg",
      delay: "200",
      link: "/consulting",
    },
    {
      background: "linear-gradient(310deg, #6e6e6e 0%, #f5f5f5 80%)",
      title: <>Software</>,
      width: "200",
      height: "200",
      description:
        "RAHN builds software for the Fintech, Agri, Health, Legal and Retail sectors.",
      icon: "images/icon/Rahnsoftware.svg",
      delay: "300",
      link: "/software",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div
          className="col-lg-4 col-sm-6"
          key={index}
          data-aos="fade-up"
          data-aos-delay={feature.delay}
          style={{ cursor: "pointer" }}
          onClick={() => Router.push(feature.link)}
        >
          <div
            className={`card-style-fifteen tran3s position-relative mt-35`}
            style={{ background: feature.background }}
          >
            <h4>{feature.title}</h4>
            <div></div>

            <Image
              width={feature.width}
              height={feature.height}
              intrinsic = "true"
              src={feature.icon}
              alt="Rahn Icon"
              className="position-absolute"
            />
            <p>{feature.description}</p>
          </div>{" "}
          {/* /.card-style-fifteen */}
        </div>
      ))}
    </>
  );
};

export default Feature;
