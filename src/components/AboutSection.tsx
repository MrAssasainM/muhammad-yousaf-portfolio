import { ABOUT_CONTENT } from '../data/portfolioData';
import { PerspectiveReveal } from './MotionPrimitives';

export function AboutSection() {
  return (
    <section id="about" className="border-b border-white/[0.07] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <PerspectiveReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                {ABOUT_CONTENT.heading}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Background &amp; Builder Mindset
              </p>
            </div>

            <div className="space-y-5 lg:col-span-8">
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-200 sm:text-xl">
                {ABOUT_CONTENT.lead}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {ABOUT_CONTENT.body}
              </p>
            </div>
          </div>
        </PerspectiveReveal>
      </div>
    </section>
  );
}
