import { motion } from 'motion/react';
import { LEARNING_JOURNEY } from '../data/portfolioData';
import { ARCHITECTURAL_EASE, PerspectiveReveal } from './MotionPrimitives';

export function JourneySection() {
  return (
    <section id="journey" className="border-b border-white/[0.07] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <PerspectiveReveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              Learning Journey
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
              How I approach software development: hands-on exploration, testing ideas in the real
              world, and steady iteration.
            </p>
          </div>
        </PerspectiveReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: '1200px' }}>
          {LEARNING_JOURNEY.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 22, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: ARCHITECTURAL_EASE,
              }}
              whileHover={{ y: -4 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#111115] p-6 transition-colors duration-200 hover:border-violet-500/30"
            >
              <span className="font-mono text-xs font-medium tabular-nums text-violet-400">
                {step.number}.
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
