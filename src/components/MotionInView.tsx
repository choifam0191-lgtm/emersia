"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 카드용: 호버 시 살짝 떠오름 */
  asCard?: boolean;
};

export function MotionInView({
  children,
  className,
  delay = 0,
  asCard = false
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-8% 0px -8% 0px", once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay
      }}
      whileHover={asCard ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
