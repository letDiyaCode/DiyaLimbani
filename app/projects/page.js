export const metadata = {
  title: "Projects · Diya Limbani",
};

const projects = [
  {
    title: "FastDevFs",
    description:
      "A FUSE-based virtual filesystem written in C++ that tracks project libraries and speeds up developer workflows. Built with CMake and FUSE3.",
    tags: ["C++", "FUSE3", "CMake", "Systems"],
    repo: "https://github.com/letDiyaCode/FastDevFs",
  },
  {
    title: "Uber Mini",
    description:
      "A ride-sharing system simulation with real-time graph visualization, powered by C++ DSA algorithms and a Node.js + Express backend.",
    tags: ["C++", "Node.js", "Express", "DSA"],
    repo: "https://github.com/letDiyaCode/Uber-Mini",
  },
  {
    title: "Spendly",
    description:
      "A Flutter app to track, split, and manage shared expenses, with real-time data syncing and user authentication.",
    tags: ["Flutter", "Dart", "Firebase"],
    repo: "https://github.com/letDiyaCode/Spendly",
  },
];

export default function Projects() {
  return (
    <section className="content">
      <h1 className="page-title">
        My <span className="gradient-text">projects</span>
      </h1>
      <p className="lead">A few things I&apos;ve built. More on the way.</p>

      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="card">
            <h2 className="card-title">{project.title}</h2>
            <p className="card-text">{project.description}</p>
            <div className="card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.repo}
              className="card-link"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
