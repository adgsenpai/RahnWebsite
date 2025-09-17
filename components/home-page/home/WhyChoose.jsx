const accordionItems = [
  {
    id: 1,
    icon: "/images/icon/icon_108.svg",
    title: "Solutions Experts",
    content:
      "We’re experts at solving data problems and adding value to outcomes and strategies. We focus on innovative yet practical solutions with no preference for technology stacks, ensuring that we always do what’s best for our clients.",
  },
  {
    id: 2,
    icon: "/images/icon/icon_109.svg",
    title: "Share Knowledge",
    content:
      "We take great pride in sharing our knowledge and experience with our clients, making knowledge transfer a key part of all our engagements.",
  },
  {
    id: 3,
    icon: "/images/icon/icon_110.svg",
    title: "Extensive experience",
    content:
      "Our team at RAHN brings deep expertise across Banking, Finance, Insurance, Fintech, Agriculture, Healthcare, Legal and Retail across three continents.",
  },

];

const WhyChoose = () => {
  return (
    <div className="accordion accordion-style-five md-mb-70" id="accordionOne">
      {accordionItems.map((item) => (
        <div className="accordion-item" key={item.id}>
          <div className="accordion-header" id={`heading${item.id}`}>
            <button
              className={`accordion-button ${item.id === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
              aria-expanded={item.id === 0 ? "true" : "false"}
              aria-controls={`collapse${item.id}`}
            >
              <img src={item.icon} alt="" className="me-3" /> {item.title}
            </button>
          </div>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse${
              item.id === 0 ? "show" : ""
            }`}
            aria-labelledby={`heading${item.id}`}
            data-bs-parent="#accordionOne"
          >
            <div className="accordion-body">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChoose;
