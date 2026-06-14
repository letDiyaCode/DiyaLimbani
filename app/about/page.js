export const metadata = {
  title: "About · Diya Limbani",
};

const skills = [
  "C++",
  "Python",
  "Data Structures & Algorithms",
  "Machine Learning",
  "Node.js",
  "Express",
  "Flutter",
  "JavaScript",
  "Git",
];

export default function About() {
  return (
    <section className="content">
      <h1 className="page-title">
        About <span className="gradient-text">me</span>
      </h1>
      <p className="lead">
        Interested in solving real problems that haven&apos;t been solved yet, the ones
        with no clear answer.
      </p>
      <p className="muted">
        Curious about AI and the deep problem-solving behind it. Always open to
        collaboration, if you&apos;re building something meaningful, let&apos;s
        talk.
      </p>

      <h2 className="section-heading">Tech I work with</h2>
      <ul className="skill-grid">
        {skills.map((skill) => (
          <li key={skill} className="skill-chip">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
