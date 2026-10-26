import { useState } from "react";
import Circuit3D from "./Circuit3D";
import LandingPage from "./LandingPage";
import "./App.css";


const subjects = [
  {
    name: "Physics",
    icon: "⚡",
    description: "Discover how the physical world works.",
    topics: "Electricity, Motion, Forces and Waves",
    color: "#36D9F5",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mathematics",
    icon: "∑",
    description: "Turn complex equations into clear visuals.",
    topics: "Geometry, Graphs and Transformations",
    color: "#A78BFA",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chemistry",
    icon: "⚗",
    description: "Explore atoms, molecules and reactions.",
    topics: "Atoms, Bonding and Chemical Reactions",
    color: "#34D399",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85",
  },
];

export default function App() {
  const [page, setPage] = useState("Landing");
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [notice, setNotice] = useState("");

  const isDark = theme === "dark";
  if (page === "Landing") {
  return <LandingPage onEnter={() => setPage("Dashboard")} />;
}

  const filteredSubjects = subjects.filter((subject) => {
    const text =
      `${subject.name} ${subject.description} ${subject.topics}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  function openSubject(subject) {
    setSelectedSubject(subject.name);

    if (subject.name === "Physics") {
      setPage("Physics");
      setNotice("");
    } else {
      setNotice(
        `${subject.name} is part of Visual Bridge. Its interactive lessons are coming next!`
      );
    }
  }

  function navigate(destination) {
    setPage(destination);
    setNotice("");
  }

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate("Dashboard")}>
          <span className="brand-icon">V</span>
          <span>
            <strong>Visual Bridge</strong>
            <small>See it. Explore it. Understand it.</small>
          </span>
        </button>

        <div className="nav-label">LEARNING SPACE</div>

        {[
          ["Dashboard", "⌂"],
          ["Explore", "◎"],
          ["My Learning", "▤"],
          ["Interactive Studio", "◈"],
        ].map(([label, icon]) => (
          <button
            key={label}
            className={`nav-item ${page === label ? "active" : ""}`}
            onClick={() => navigate(label)}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span>✦ Your learning journey</span>
            <p>Understand concepts by exploring them, not just memorising.</p>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span>{isDark ? "☀" : "☾"}</span>
            Switch to {isDark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-icon">V</span>
            <strong>Visual Bridge</strong>
          </div>

          <div className="breadcrumb">
            Learning space <span>/</span> {page}
          </div>

          <div className="topbar-right">
            <span className="status-dot" />
            <span className="status-text">Visual learning</span>
            <button
              className="mobile-theme"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? "☀" : "☾"}
            </button>
          </div>
        </header>

        {page === "Physics" ? (
          <section className="page-section">
            <button
              className="back-button"
              onClick={() => navigate("Explore")}
            >
              ← Back to subjects
            </button>

            <div className="page-heading">
              <span className="eyebrow">SUBJECT EXPLORER</span>
              <h1>Explore Physics <span>⚡</span></h1>
              <p>See physical concepts in action through interactive models.</p>
            </div>

            <article className="lesson-feature">
              <img
                src={subjects[0].image}
                alt="Electric power and energy"
              />
              <div className="lesson-overlay">
                <span className="lesson-tag">INTERACTIVE LESSON</span>
                <h2>Understanding Electric Circuits</h2>
                <p>
                  Explore a battery, switch and bulb. Control the circuit,
                  inspect its components and test your understanding.
                </p>
                <button
                  className="primary-button"
                  onClick={() => navigate("Interactive Studio")}
                >
                  Open 3D Lab <span>→</span>
                </button>
              </div>
            </article>

            <h2 className="section-title">Your Physics journey</h2>
            <div className="mini-grid">
              <div className="mini-card">
                <span>01</span>
                <h3>Electricity</h3>
                <p>Explore circuits and electrical components.</p>
              </div>
              <div className="mini-card">
                <span>02</span>
                <h3>Motion and Forces</h3>
                <p>Visualise movement, speed and forces.</p>
              </div>
              <div className="mini-card">
                <span>03</span>
                <h3>Waves</h3>
                <p>Discover how waves move and transfer energy.</p>
              </div>
            </div>
          </section>
        ) : page === "Interactive Studio" ? (
          <section className="page-section">
            <button
              className="back-button"
              onClick={() => navigate("Physics")}
            >
              ← Back to Physics
            </button>
            <div className="page-heading">
              <span className="eyebrow">HANDS-ON LEARNING</span>
              <h1>Interactive <span>Studio</span></h1>
              <p>Experiment, observe and learn at your own pace.</p>
            </div>
            <div className="studio-frame">
              <Circuit3D />
            </div>
          </section>
        ) : page === "My Learning" ? (
          <section className="page-section">
            <div className="page-heading">
              <span className="eyebrow">YOUR SPACE</span>
              <h1>My <span>Learning</span></h1>
              <p>Your learning journey starts with one interactive lesson.</p>
            </div>
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h2>Keep exploring</h2>
              <p>
                Open an interactive lesson to begin building your learning
                journey. Progress tracking will be added in a future version.
              </p>
              <button
                className="primary-button"
                onClick={() => navigate("Explore")}
              >
                Explore subjects →
              </button>
            </div>
          </section>
        ) : (
          <section className="page-section">
            <div className="welcome-row">
              <div className="page-heading">
                <span className="eyebrow">YOUR VISUAL LEARNING SPACE</span>
                <h1>
                  Make difficult concepts
                  <br />
                  <span>visible.</span>
                </h1>
                <p>
                  Explore Physics, Mathematics and Chemistry through
                  interactive visuals and hands-on learning.
                </p>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit-core">V</div>
                <span className="float-symbol symbol-one">∑</span>
                <span className="float-symbol symbol-two">⚛</span>
                <span className="float-symbol symbol-three">ϟ</span>
              </div>
            </div>

            <div className="search-row">
              <label className="search-box">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search Physics, Mathematics, Chemistry..."
                />
                <kbd>SEARCH</kbd>
              </label>
              <span className="subject-count">
                {filteredSubjects.length} subjects
              </span>
            </div>

            {notice && (
              <div className="notice">
                <span>✦</span> {notice}
                <button onClick={() => setNotice("")} aria-label="Dismiss">
                  ×
                </button>
              </div>
            )}

            <div className="section-heading-row">
              <div>
                <span className="eyebrow">CHOOSE YOUR PATH</span>
                <h2 className="section-title">Explore subjects</h2>
              </div>
              <button
                className="text-button"
                onClick={() => navigate("Explore")}
              >
                View all subjects →
              </button>
            </div>

            <div className="subject-grid">
              {filteredSubjects.map((subject, index) => (
                <article className="subject-card" key={subject.name}>
                  <button
                    className="subject-image-button"
                    onClick={() => openSubject(subject)}
                    aria-label={`Explore ${subject.name}`}
                  >
                    <img
                      className="subject-image"
                      src={subject.image}
                      alt={`${subject.name} learning visual`}
                      loading="lazy"
                    />
                    <span className="image-number">
                      0{index + 1} / 03
                    </span>
                    <span
                      className="subject-symbol"
                      style={{ "--subject-color": subject.color }}
                    >
                      {subject.icon}
                    </span>
                  </button>

                  <div className="subject-card-content">
                    <div className="subject-title-row">
                      <h3>{subject.name}</h3>
                      <span
                        className="subject-dot"
                        style={{ background: subject.color }}
                      />
                    </div>
                    <p>{subject.description}</p>
                    <div className="topic-preview">{subject.topics}</div>
                    <button
                      className="card-link"
                      onClick={() => openSubject(subject)}
                    >
                      Explore lessons <span>↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredSubjects.length === 0 && (
              <div className="empty-state">
                <h2>No subjects found</h2>
                <p>Try searching for Physics, Mathematics or Chemistry.</p>
              </div>
            )}

            <div className="continue-card">
              <div className="continue-icon">ϟ</div>
              <div className="continue-copy">
                <span className="eyebrow">READY TO EXPERIMENT?</span>
                <h2>Step inside the Physics 3D Lab</h2>
                <p>Switch a circuit on, observe the bulb and explore.</p>
              </div>
              <button
                className="primary-button"
                onClick={() => navigate("Interactive Studio")}
              >
                Enter the lab <span>→</span>
              </button>
            </div>

            <footer className="footer">
              <span>Visual Bridge</span>
              <span>Learn by seeing. Understand by exploring.</span>
            </footer>
          </section>
        )}
      </main>

      <nav className="mobile-nav">
        {[
          ["Dashboard", "⌂"],
          ["Explore", "◎"],
          ["My Learning", "▤"],
          ["Interactive Studio", "◈"],
        ].map(([label, icon]) => (
          <button
            key={label}
            className={page === label ? "mobile-active" : ""}
            onClick={() => navigate(label)}
          >
            <span>{icon}</span>
            <small>
              {label === "Interactive Studio" ? "3D Lab" : label}
            </small>
          </button>
        ))}
      </nav>
    </div>
  );
}
