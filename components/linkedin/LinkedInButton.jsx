import React from 'react';

const LinkedInSubscribeButton = () => {
  return (
    <>
      <style jsx>{`
        .libutton {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7px;
          text-align: center;
          outline: none;
          text-decoration: none !important;
          color: #fff;
          width: 300px;
          height: 50px;
          border-radius: 16px;
          background-color: #0A66C2;
          font-family: "SF Pro Text", Helvetica, sans-serif;
        }
      `}</style>

      <a
        className="libutton"
        href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7044697679464935425"
        target="_blank"
        rel="noopener noreferrer"
      >
       LinkedIn Newsletter
      </a>
    </>
  );
};

export default LinkedInSubscribeButton;
