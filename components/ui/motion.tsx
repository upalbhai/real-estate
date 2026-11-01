"use client";

import * as React from "react";
import {
  motion,
  HTMLMotionProps,
  Variants,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const luxuryEasing = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------
 * 1. MotionFadeIn: Smooth upward fade-in on scroll
 * ------------------------------------------------------------------------- */
export interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  className,
  ...props
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: luxuryEasing,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * 2. MotionStaggerContainer & MotionStaggerItem: Coordinated list reveals
 * ------------------------------------------------------------------------- */
export interface MotionStaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

export function MotionStaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.05,
  className,
  ...props
}: MotionStaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface MotionStaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yOffset?: number;
  className?: string;
}

export function MotionStaggerItem({
  children,
  yOffset = 20,
  className,
  ...props
}: MotionStaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: luxuryEasing,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * 3. MotionSlideIn: Horizontal directional slide reveal
 * ------------------------------------------------------------------------- */
export interface MotionSlideInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export function MotionSlideIn({
  children,
  direction = "left",
  distance = 36,
  delay = 0,
  duration = 0.75,
  className,
  ...props
}: MotionSlideInProps) {
  const initialOffset = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: luxuryEasing,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * 4. MotionScale: Subtle scale-up entrance
 * ------------------------------------------------------------------------- */
export interface MotionScaleProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  initialScale?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export function MotionScale({
  children,
  initialScale = 0.95,
  delay = 0,
  duration = 0.7,
  className,
  ...props
}: MotionScaleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: luxuryEasing,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * 5. ScrollProgressIndicator: Elegant gold indicator tracking page scroll
 * ------------------------------------------------------------------------- */
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(202,160,86,0.85)]"
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------
 * 6. ScrollParallax: Smooth vertical optical depth shift on scroll
 * ------------------------------------------------------------------------- */
export interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ScrollParallax({
  children,
  offset = 40,
  className = "",
}: ScrollParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 7. ScrollVelocityMarquee: Continuous luxury ticker reactive to speed
 * ------------------------------------------------------------------------- */
export interface ScrollVelocityMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function ScrollVelocityMarquee({
  items,
  direction = "left",
  speed = 28,
  className = "",
}: ScrollVelocityMarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex items-center gap-8 shrink-0 pr-8"
      >
        {items.concat(items).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-muted-foreground"
          >
            <span className="hover:text-brand-gold transition-colors">{item}</span>
            <span className="text-brand-gold/60 font-bold">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
