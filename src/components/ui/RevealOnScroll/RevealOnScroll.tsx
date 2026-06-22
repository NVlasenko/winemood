import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const revealInitial = {
  opacity: 0,
  y: 60,
};

const revealAnimate = {
  opacity: 1,
  y: 0,
};

const revealViewport = {
  once: true,
  amount: 0.15,
};

const revealTransition = {
  duration: 0.7,
  ease: "easeOut",
} as const;

export const RevealOnScroll = ({ children, className }: Props) => {
  return (
    <motion.div
      className={className}
      initial={revealInitial}
      whileInView={revealAnimate}
      viewport={revealViewport}
      transition={revealTransition}
    >
      {children}
    </motion.div>
  );
};