import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SITE_IDENTITY } from '../data/portfolioData';
import { HERO_VISUAL_IMAGE } from '../data/projectImages';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';
import { PortfolioImage } from './PortfolioImage';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  const visualRotateX = useTransform(smoothProgress, [0, 1], [0, 9]);
  const visualRotateY = useTransform(smoothProgress, [0, 1], [0, -7]);
  const visualScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);
  const visualY = useTransform(smoothProgress, [0, 1], [0, 36]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-x-clip border-b border-white/[0.07] py-16 md:py-24 lg:py-28"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.11),rgba(139,92,246,0.05)_55%,transparent_100%)]"
      />

      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: ARCHITECTURAL_EASE }}
          className="flex min-w-0 flex-col justify-center lg:col-span-7"
        >
          <p className="text-xs font-medium tracking-wide text-blue-400 sm:text-sm">
            {SITE_IDENTITY.role}
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 [text-wrap:balance] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            {SITE_IDENTITY.name}
          </h1>

          <p className="mt-5 max-w-xl text-xl font-normal leading-relaxed text-zinc-200 [text-wrap:balance] sm:text-2xl">
            {SITE_IDENTITY.tagline}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
            Focused on web development, artificial intelligence experiments, and lightweight workflow
            automation tools crafted through hands-on building.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-transform duration-150 hover:bg-blue-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#about"
              className="inline-flex min-h-[44px] items-center px-2 text-sm font-medium text-zinc-300 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              About My Approach
            </a>
          </div>
        </motion.div>

        <div className="lg:col-span-5" style={{ perspective: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20, rotateY: 6 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: ARCHITECTURAL_EASE }}
            style={{
              rotateX: visualRotateX,
              rotateY: visualRotateY,
              scale: visualScale,
              y: visualY,
              transformStyle: 'preserve-3d',
            }}
            className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#111116]"
          >
            <PortfolioImage
              src={HERO_VISUAL_IMAGE}
              alt="Minimalist dark developer studio desk illuminated by subtle blue and violet edge light"
              fallbackTitle="Studio Workspace"
              className="aspect-[4/3] w-full object-cover lg:h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
