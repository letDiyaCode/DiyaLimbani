"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";

const ease = [0.22, 1, 0.36, 1];
const roles = ["a Curious Mind", "a Deep Thinker", "a Problem Solver", "a Lifelong Learner"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
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

const experience = [
  {
    period: "2026",
    role: "Software Development Engineer Intern",
    place: "Amazon",
    text: "SDE intern at Amazon ('26), building and shipping software at scale.",
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

const contacts = [
  { label: "Email", value: "diyalimbani173@gmail.com", href: "mailto:diyalimbani173@gmail.com" },
  { label: "GitHub", value: "letDiyaCode", href: "https://github.com/letDiyaCode" },
  { label: "LinkedIn", value: "Diya Limbani", href: "https://www.linkedin.com/in/diya-limbani-b80b84325/" },
];

function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero section">
      <motion.div
        className="hero-content"
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
      >
        <motion.p className="hero-eyebrow" variants={item}>
          Hello, I&apos;m
        </motion.p>
        <motion.h1 className="hero-title" variants={item}>
          Diya <span className="gradient-text">Limbani</span>
        </motion.h1>
        <motion.div className="hero-role" variants={item}>
          <span>I&apos;m&nbsp;</span>
          <span className="role-slot">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                className="role-word gradient-text"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
        <motion.p className="hero-tagline" variants={item}>
          Interested in solving real problems that haven&apos;t been solved yet, the ones
          with no clear answer.
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <a href="#projects" className="btn btn-primary">
            View my work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* About */}
      <section id="about" className="section">
        <Reveal>
          <h2 className="page-title">
            About <span className="gradient-text">me</span>
          </h2>
          <p className="lead">
            Curious about AI and the deep problem-solving behind it. Always open to
            collaboration, if you&apos;re building something meaningful, let&apos;s talk.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="section-heading">Tech I work with</h3>
          <ul className="skill-grid">
            {skills.map((skill) => (
              <li key={skill} className="skill-chip">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <Reveal>
          <h2 className="page-title">
            My <span className="gradient-text">experience</span>
          </h2>
          <p className="lead">Where I&apos;ve worked, researched, and contributed.</p>
        </Reveal>
        <div className="timeline">
          {experience.map((exp, i) => (
            <Reveal key={exp.role + exp.place} delay={i * 0.08} className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-body">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-place">{exp.place}</p>
                <p className="timeline-text">{exp.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <Reveal>
          <h2 className="page-title">
            My <span className="gradient-text">projects</span>
          </h2>
          <p className="lead">A few things I&apos;ve built. More on the way.</p>
        </Reveal>
        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="card">
                <h3 className="card-title">{project.title}</h3>
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <Reveal>
          <h2 className="page-title">
            Get in <span className="gradient-text">touch</span>
          </h2>
          <p className="lead">
            Want to work together or just say hi? Reach me through any of these.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="contact-list">
            {contacts.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="contact-item"
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="contact-label">{link.label}</span>
                    <span className="contact-value">{link.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
