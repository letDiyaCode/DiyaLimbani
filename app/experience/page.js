export const metadata = {
  title: "Experience · Diya Limbani",
};

const experience = [
  {
    period: "2026",
    role: "Software Development Engineer Intern",
    place: "Amazon",
    text: "SDE intern at Amazon, building and shipping software at scale.",
  },
  {
    period: "2026 — Present",
    role: "Undergraduate Researcher",
    place: "IIT Jodhpur",
    text: "Researching liquidity optimization in blockchain Payment Channel Networks. Co-designing DEBAL, a framework that pairs Deep Reinforcement Learning with a Balance-Aware Graph Neural Network to rebalance channel liquidity, cutting transaction failures and latency while improving network stability.",
  },
  {
    period: "Open Source",
    role: "Contributor",
    place: "KDE Community · LabPlot",
    text: "Contributed to LabPlot, KDE's open-source data visualization and analysis application.",
  },
];

export default function Experience() {
  return (
    <section className="content">
      <h1 className="page-title">
        My <span className="gradient-text">experience</span>
      </h1>
      <p className="lead">Where I&apos;ve worked, researched, and contributed.</p>

      <div className="timeline">
        {experience.map((exp) => (
          <div key={exp.role + exp.place} className="timeline-item">
            <span className="timeline-dot" />
            <div className="timeline-body">
              <span className="timeline-period">{exp.period}</span>
              <h2 className="timeline-role">{exp.role}</h2>
              <p className="timeline-place">{exp.place}</p>
              <p className="timeline-text">{exp.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
