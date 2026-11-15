import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, FolderPlus } from 'lucide-react';
import {
  FEATURED_PROJECTS,
  MORE_PROJECTS,
  SITE_IDENTITY,
  type ProjectItem,
} from '../data/portfolioData';
import { PROJECT_IMAGES } from '../data/projectImages';
import {
  filterProjectsByCategory,
  formatDisplayHostname,
  getProjectCategories,
} from '../utils/portfolioHelpers';
import {
  ARCHITECTURAL_EASE,
  PerspectiveReveal,
  TiltCard3D,
} from './MotionPrimitives';
import { PortfolioImage } from './PortfolioImage';

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const imageSrc = project.image ?? PROJECT_IMAGES[project.id];
  const displayHost = formatDisplayHostname(project.liveUrl);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: ARCHITECTURAL_EASE,
      }}
      style={{ perspective: '1200px' }}
      className="h-full"
    >
      <TiltCard3D className="group">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111115] transition-colors duration-200 hover:border-blue-500/35">
          <div className="overflow-hidden border-b border-white/[0.07] bg-[#0d0d11]">
            <PortfolioImage
              src={imageSrc}
              alt={project.imageAlt ?? `${project.title} project preview`}
              fallbackTitle={project.title}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="text-blue-400">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-zinc-400">{displayHost}</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
                {project.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {project.description}
              </p>

              <p className="mt-4 text-xs text-zinc-400">
                {project.stack.join(' · ')}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.07] pt-5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live website for ${project.title}`}
                className="relative z-20 inline-flex min-h-[44px] items-center gap-2 rounded-md text-sm font-medium text-zinc-100 transition-colors duration-150 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight
                  className="h-4 w-4 text-violet-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </article>
      </TiltCard3D>
    </motion.div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const allProjects = [...FEATURED_PROJECTS, ...MORE_PROJECTS];
  const categories = getProjectCategories(allProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const visibleProjects = filterProjectsByCategory(allProjects, selectedCategory);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });
  const gridRotateX = useTransform(smoothScroll, [0, 0.45, 1], [4, 0, -2]);
  const gridY = useTransform(smoothScroll, [0, 1], [16, -12]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="overflow-x-clip border-b border-white/[0.07] py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <PerspectiveReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                Projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-400 sm:text-base">
                Selected live websites and prototypes built to solve practical problems.
              </p>
            </div>

            {categories.length > 2 && (
              <div
                role="group"
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center gap-1 self-start rounded-lg border border-white/[0.08] bg-[#111115] p-1"
              >
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={isActive}
                      className={`relative min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="project-filter-active"
                          transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
                          className="absolute inset-0 rounded-md border border-white/10 bg-[#1d1d26]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </PerspectiveReveal>

        <div style={{ perspective: '1400px' }}>
          <motion.div
            style={{
              rotateX: gridRotateX,
              y: gridY,
              transformStyle: 'preserve-3d',
            }}
            className="mt-10 grid gap-8 md:grid-cols-2"
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        <PerspectiveReveal delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-dashed border-white/15 bg-[#0e0e12] p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#14141a] text-violet-400">
                  <FolderPlus className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-zinc-100">
                    More Projects
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-400">
                    This portfolio is structured to grow as new builds are completed—including web
                    applications, AI experiments, and workflow automation utilities. Add entries to{' '}
                    <code className="break-all font-mono text-xs text-zinc-300">MORE_PROJECTS</code>{' '}
                    in{' '}
                    <code className="break-all font-mono text-xs text-zinc-300">
                      src/data/portfolioData.ts
                    </code>{' '}
                    to publish new cards here.
                  </p>
                </div>
              </div>

              <a
                href={SITE_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg border border-white/15 bg-[#14141a] px-4 py-2.5 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-blue-500/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:self-center"
              >
                <span>Follow on GitHub</span>
                <ArrowUpRight className="h-4 w-4 text-blue-400" aria-hidden="true" />
              </a>
            </div>
          </div>
        </PerspectiveReveal>
      </div>
    </section>
  );
}
