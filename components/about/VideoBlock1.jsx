import { useState } from "react";
import ModalVideo from "react-modal-video";

const VideoBlock1 = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="2c-gZwUy6y8"
        onClose={() => setOpen(false)}
      />

      <div className="fancy-feature-fiftyOne mt-130 lg-mt-100">
        <div className="container">
          <div className="video-banner1 d-flex align-items-center justify-content-center">
            <button
              className="fancybox video-icon tran3s rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setOpen(true)}
            >
              <img
                src="/images/icon/icon_140.svg"
                alt="icon"
                className="lazy-img"
              />
            </button>
          </div>
          {/* /.video-banner1 */}
        </div>
      </div>
    </>
  );
};

export default VideoBlock1;
