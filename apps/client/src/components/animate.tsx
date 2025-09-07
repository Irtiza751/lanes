"use client";
import { motion } from "motion/react";

export const AnimateFadeFromTop = ({
  children,
  delay = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export const AnimateFadeScale = ({
  children,
  delay = 0.1,
  scaleFrom = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  scaleFrom?: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: scaleFrom,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

export const AnimateFadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
