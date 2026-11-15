import { motion } from 'motion/react';
import { SKILLS_LIST } from '../data/portfolioData';
import { ARCHITECTURAL_EASE, PerspectiveReveal } from './MotionPrimitives';

export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-white/[0.07] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <PerspectiveReveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              Skills &amp; Technologies
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Core languages, tools, and areas I am actively learning and working with in practical
              projects.
            </p>
          </div>
        </PerspectiveReveal>

        <PerspectiveReveal delay={0.08} className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS_LIST.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: ARCHITECTURAL_EASE,
                }}
                whileHover={{ y: -2 }}
                className="flex flex-col justify-between bg-[#0f0f13] p-6 transition-colors duration-150 hover:bg-[#14141a]"
              >
                <div>
                  <p className="text-xs font-medium text-blue-400">{skill.focus}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-zinc-100">
                    {skill.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {skill.context}
                </p>
              </motion.div>
            ))}
          </div>
        </PerspectiveReveal>
      </div>
    </section>
  );
}
