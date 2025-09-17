const accordionItems = [
  {
    id: 1,
    title: "Make better decisions",
    content:
      "The quality of decision-making is directly linked to the quality of information available at the time of making the decision. We can help you identify, collect, validate, store, transform, calculate, and report outcomes to aid in your decision-making process.",
  },
  {
    id: 2,
    title: "Optimize resource allocation",
    content:
      "Scarce resources such as specialised individuals, processing capabilities, and relevant information must be employed for the intended purposes they were acquired for. We develop solutions that optimise the use of available resources in the most advantageous manner.",
  },
  {
    id: 3,
    title: "Gain insights into your operational realities",
    content:
      "Understanding the real operational environment in which your business operates is fundamental to your success. We can help you collect, interpret, and report business-critical data to provide you with strategic consulting services that aid in the development of a clear picture of the operational realities you face.",
  },
  {
    id: 4,
    title: "Reduce operational risk",
    content:
      "Operational risk can be found in many different business processes and represents a critical aspect that must be measured, mitigated, and managed. We utilise data management principles to mitigate and manage the inherent operational risk associated with information and formal solutions.",
  },
  {
    id: 5,
    title: "Operate as a responsible corporate citizen",
    content:
      "As a responsible corporate citizen, it’s important to contribute to society by working with law enforcement, the judiciary, and the government to further the ideals of the society in which you operate. We provide innovative solutions to aid our clients in pursuing this goal, including identifying financial crimes such as fraud, money laundering, and terrorist funding, and non-financial crimes such as human and wildlife trafficking.",
  },

];

const Faq = () => {
  return (
    <div className="accordion accordion-style-two md-mt-60" id="accordionOne">
      {accordionItems.map((item) => (
        <div className="accordion-item" key={item.id}>
          <div className="accordion-header" id={`heading${item.id}`}>
            <button
              className={`accordion-button ${item.id === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
              aria-expanded={item.id === 1 ? "true" : "false"}
              aria-controls={`collapse${item.id}`}
            >
              {item.title}
            </button>
          </div>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse${
              item.id === 0 ? " show" : ""
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

export default Faq;
