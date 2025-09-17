const Illustration = () => {
  const shapes = [
    { src: "/images/shape/shape_01.svg", className: "shapes shape-one" },
    { src: "/images/shape/shape_02.svg", className: "shapes shape-two" },
    { src: "/images/shape/shape_03.svg", className: "shapes shape-three" },
    // { src: "/images/shape/shape_04.svg", className: "shapes shape-four" },
    { src: "/images/shape/shape_04.svg", className: "shapes shape-five" },
  ];

  return (
    <div className="illustration-holder">
      <a href="https://rahnmonitor.co.za/">
        <img
          src="/images/assets/RahnMonitorPicture.png" alt="Financial crime compliance"
RAHN          className="lazy-img main-illustration w-100"
        />
      </a>
      {shapes.map((shape, i) => (
        <img
          key={i}
          src={shape.src}
          alt="RAHN Monitor Application"
          className={`lazy-img ${shape.className}`}
        />
      ))}
    </div>
  );
};

export default Illustration;
