
import "./LandingPage.css";

const orbitItems = [
  {
    title: "Electric Circuits",
    subject: "PHYSICS",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Geometry",
    subject: "MATHEMATICS",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Molecular Structures",
    subject: "CHEMISTRY",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Light and Optics",
    subject: "PHYSICS",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Patterns and Numbers",
    subject: "MATHEMATICS",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Scientific Discovery",
    subject: "CHEMISTRY",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d42e3c9c3f1?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Motion and Energy",
    subject: "PHYSICS",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "The World of Science",
    subject: "EXPLORE",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=85",
  },
];

export default function LandingPage({ onEnter }) {
  return (
    <main className="landing-page">
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />

      <header className="landing-header">
        <a className="landing-logo" href="#home">
          <span className="logo-symbol">V</span>
          <span>
            VISUAL<span className="logo-accent">BRIDGE</span>
          </span>
        </a>

        <div className="landing-header-note">
          A NEW WAY TO UNDERSTAND
        </div>

        <button className="header-enter" onClick={onEnter}>
          Enter platform <span>↗</span>
        </button>
      </header>

      <section className="landing-hero" id="home">
        <div className="landing-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            LEARNING, REIMAGINED
          </div>

          <h1>
            Don't just
            <br />
            learn it.
            <br />
            <span>See it.</span>
          </h1>

          <p className="landing-description">
            Step inside a world where difficult concepts become
            experiences. Explore ideas, rotate your perspective and
            discover how things really work.
          </p>

          <button className="landing-cta" onClick={onEnter}>
            <span>Enter Learning Space</span>
            <span className="cta-arrow">↗</span>
          </button>

          <div className="landing-tagline">
            <span>01</span>
            See it. Explore it. Understand it.
          </div>
        </div>

        <div className="orbit-scene">
          <div className="orbit-caption orbit-caption-top">
            <span className="label-dot" />
            A UNIVERSE OF IDEAS
          </div>

          <div
            className="orbit-stage"
            aria-label="Rotating orbit of educational images"
          >
            <div className="orbit-track">
              {orbitItems.map((item, index) => (
                <article
                  className="orbit-card"
                  key={item.title}
                  style={{
                    "--angle": `${index * 45}deg`,
                    "--card-index": index,
                  }}
                >
                  <div className="orbit-card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="orbit-image-shade" />
                    <span className="orbit-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="orbit-card-info">
                    <span>{item.subject}</span>
                    <h2>{item.title}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="orbit-caption orbit-caption-bottom">
            <span className="orbit-live-dot" />
            <span>EXPLORE EVERY ANGLE</span>
            <span className="orbit-caption-divider">/</span>
            <span>PHYSICS · MATHS · CHEMISTRY</span>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <span>BUILT FOR CURIOUS MINDS</span>
        <span className="footer-line" />
        <span>LEARNING WITHOUT LIMITS</span>
      </footer>
    </main>
  );
}
