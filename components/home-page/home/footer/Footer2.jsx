import LinkedInSubscribeButton from "../linkedin/LinkedInButton";

const columns = [
  {
    title: "",
    links: [
      { label: "Home", url: "/" },
      { label: "RAHN Recruitment", url: "/recruitment" },
      { label: "RAHN Consulting", url: "/consulting" },
      { label: "RAHN Software", url: "/software" },
      { label: "RAHN Monitor", url: "/rahnmonitor" },
      { label: "RAHN Blogs", url: "/blogs" },
    ],
  },
];

const Footer2 = () => {
  return (
    <>
      {columns.map((column, index) => (
        <div className="col-xl-3 col-lg-3 col-sm-4 mb-30" key={index}>
          <h5 className="footer-title tx-dark fw-normal">{column.title}</h5>
          <ul className="footer-nav-link style-none">
            {column.links.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Footer2;
