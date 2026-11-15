import type { PointerEvent, ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from 'motion/react';
import { calculateTiltAngles } from '../utils/motionHelpers';

export const ARCHITECTURAL_EASE = [0.16, 1, 0.3, 1] as const;

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-violet-500"
    />
  );
}

interface PerspectiveRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  rotateXDeg?: number;
}

export function PerspectiveReveal({
  children,
  delay = 0,
  className = '',
  yOffset = 24,
  rotateXDeg = 5,
}: PerspectiveRevealProps) {
  return (
    <div style={{ perspective: '1200px' }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: yOffset, rotateX: rotateXDeg }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.65,
          delay,
          ease: ARCHITECTURAL_EASE,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard3D({
  children,
  className = '',
  maxTilt = 4.5,
}: TiltCard3DProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, { stiffness: 210, damping: 24 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 210, damping: 24 });
  const smoothGlowX = useSpring(glowX, { stiffness: 210, damping: 28 });
  const smoothGlowY = useSpring(glowY, { stiffness: 210, damping: 28 });

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(96, 165, 250, 0.10), rgba(139, 92, 246, 0.05) 45%, transparent 75%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const normX = (event.clientX - rect.left) / rect.width;
    const normY = (event.clientY - rect.top) / rect.height;
    const angles = calculateTiltAngles(normX, normY, maxTilt);

    rotateX.set(angles.rotateX);
    rotateY.set(angles.rotateY);
    glowX.set(normX * 100);
    glowY.set(normY * 100);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div style={{ perspective: '1200px' }} className="h-full">
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full ${className}`}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
        {children}
      </motion.div>
    </div>
  );
}
