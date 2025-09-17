const Banner = () => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <li key={i}>
        <i className="fa-solid fa-star" />
      </li>
    );
  }

  return (
    <div className="top-banner text-center">
      <h2 className="tx-dark mb-20">Top Rated Tech Company</h2>
      <p className="text-lg tx-dark opacity-75 mb-30 lg-mb-20">
        “A company that can work in harmony with you, helping you get the job
        done”
      </p>
      <p className="has-text-align-center">
        <a
          href="https://www.linkedin.com/in/oscar-stark-to-infinity/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Oscar Stark – Divisional Director
        </a>
      </p>
    </div>
  );
};

export default Banner;
