"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const roles = ["an AI Enthusiast", "a Deep Thinker", "a Problem Solver", "a Curious Mind"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

export default function Home() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
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
          Always learning, always questioning, always building on what I know.
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <Link href="/projects" className="btn btn-primary">
            View my work
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
