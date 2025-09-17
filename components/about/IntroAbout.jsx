import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";

const IntroAbout = () => {
  const [isOpen, setOpen] = useState(false);
  const cardsData = [
    {
      id: 1,
      cardNo: "card-one",
      title: "Software",
      subtitle: "Best Solutions",
    },
    {
      id: 2,
      title: "Consulting",
      cardNo: "card-two",
      subtitle: "Achieve Your Goals ",
    },
    {
      id: 3,
      title: "Recruitment",
      cardNo: "card-three",
      subtitle: "At a High Level",
    },
  ];

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="JAA5UpuZR3Y"
        onClose={() => setOpen(false)}
      />

      <div className="row">
        <div className="col-xl-5 col-md-6 order-md-last">
          <div className="text-wrapper md-pb-70">
            {/* <Image
              width={66}
              height={66}
              src="/images/icon/icon_103.svg"
              alt="icon"
              className="lazy-img cursor-pointer"
              onClick={() => setOpen(true)}
            /> */}
            <br />
            <div className="sc-title text-uppercase title-style-one">
              We are the experts in the field.
            </div>

            <p className="tx-dark pt-30 pb-30 md-pb-15" data-aos="fade-up">
              Driven by our "Empower. Innovate. Succeed." ethos, we deliver
              tailored solutions to streamline your operations. <br />
              
            </p>
          </div>
          {/* /.text-wrapper */}
        </div>
        {/* End .col */}

        <div
          className="col-xl-7 col-md-6 order-md-first pt-5px"
          data-aos="fade-up"
        >
          <div className="img-holder d-lg-inline-flex position-relative zn2 pb-45 xl-pb-90">
            <img
              src="/images/shape/shape_135.svg"
              alt="shape"
              className="lazy-img"
            />
            <Image
              width={501}
              height={672}
              intrinsic="true"
              src="/images/media/RahnTeam.png"
              className="lazy-img avatar-img "
              alt="RAHN Specialists Consulting, Software and recruitment"
            />

            {cardsData.map((item) => (
              <div
                className={`card-style ${item.cardNo} d-flex justify-content-center`}
                key={item.id}
              >
                <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-lg" />
                </div>
                <div className="ps-2 ps-lg-4">
                  <h3>{item.title}</h3>
                  <p className="fs-20 tx-dark m0">{item.subtitle}</p>
                </div>
              </div>
            ))}
            {/* /.card */}
          </div>
        </div>
        {/* End .col-xl-7 */}
      </div>
    </>
  );
};

export default IntroAbout;
