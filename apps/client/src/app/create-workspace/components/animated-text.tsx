"use client";

import { motion } from "motion/react";
import React from "react";

export default function AnimatedText({
  children,
  delay = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.1, delay }}
    >
      {children}
    </motion.div>
  );
}
