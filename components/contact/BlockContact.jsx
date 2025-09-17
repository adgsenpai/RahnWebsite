import Image from "next/image";

const BlockContact = () => {
  const addressBlocks = [
    {
      icon: "/images/icon/icon_43.svg",
      title: "Phone Number",
      content: "Tel: +27 87 802 1384",
      delay: "100",
    },
    {
      icon: "/images/icon/icon_148.svg",
      title: "E-Mail",
      content: "Click Below to Mail us",
      link: "mailto:info@rahn.co.za",
      delay: "200",

    },
    {
      icon: "/images/icon/icon_145.svg",
      title: "Send Us Your CV",
      content: "Click Below To Mail us your cv",
      delay: "300",
      link: "mailto:cv@rahn.co.za",
      delay: "300",
    },

  ];

  return (
    <>
      {addressBlocks.map((block, index) => (
        <div
          className="col-md-4"
          key={index}
          data-aos="fade-up"
          data-aos-delay={block.delay}
        >
          <div className="address-block-two text-center mb-40">
            <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
              <Image width={30} height={30} src={block.icon} alt="icon" />
            </div>
            <h5 className="title">{block.title}</h5>
            <p>
              {block.content} <br />
              {block.link && (
                <a
                  href={block.link}
                  className={
                    block.link.includes("mailto:") ? "call" : "webaddress"
                  }
                >
                  {block.link.replace("mailto:", "")}
                </a>
              )}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockContact;
