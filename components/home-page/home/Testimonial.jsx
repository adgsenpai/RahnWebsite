"use client";
import React from "react";
import Slider from "react-slick";
import testimonial from "../../../data/testimonial";
import Image from "next/image";

const Testimonial = () => {
  // Define the settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 520, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {testimonial.slice(0, 10).map((item) => (
          <div className="item" key={item.id}>
            <div className="feedback-block">
              <div className="top-header">
                <div>
                  <h3 className="title">{item.title}</h3>
                  <ul className="rating">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <li key={index}>
                        <i className="bi bi-star-fill" />
                      </li>
                    ))}
                  </ul>
                </div>
                <img src="images/icon/icon_112.svg" alt="Testimonial" width={50} />
              </div>
              <p className="text">{item.text}</p>
              <div className="author-info">
                <div className="author">
                  {item.author},{" "}
                  <span className="location">{item.location}</span>
                </div>
                <Image
                  width={60}
                  height={60}
                  alt="testimonial avatar"
                  src={item.image}
                  className="avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .item {
          padding: 15px;
          box-sizing: border-box;
        }

        .feedback-block {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .rating {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
          display: flex;
        }

        .rating li {
          color: #ffc107;
          margin-right: 5px;
        }

        .text {
          font-size: 16px;
          color: #666;
          margin-bottom: 15px;
        }

        .author-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .author {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .location {
          font-weight: normal;
          color: #999;
        }

        .avatar {
          border-radius: 50%;
        }

                  .slick-arrow slick-prev{
           display:none;
          }
          .slick-arrow slick-next{
            display:none;
           }

        @media (max-width: 768px) {
          .feedback-block {
            padding: 15px;
          }

          .title {
            font-size: 16px;
          }

          .text {
            font-size: 14px;
          }

          .author {
            font-size: 14px;
          }

        }
      `}</style>
    </>
  );
};

export default Testimonial;
