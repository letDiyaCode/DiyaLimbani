"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Template({ children }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(12px)",
        clipPath: "inset(8% 0% 100% 0%)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0%)",
      }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}
