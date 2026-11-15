import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github } from 'lucide-react';
import { SITE_IDENTITY } from '../data/portfolioData';
import { isGithubPlaceholderUrl } from '../utils/portfolioHelpers';
import { PerspectiveReveal, TiltCard3D } from './MotionPrimitives';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const isPlaceholder = isGithubPlaceholderUrl(SITE_IDENTITY.githubUrl);

  const handleCopyGithub = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE_IDENTITY.githubUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // Fallback for restricted iframe/clipboard contexts below
    }

    try {
      const tempInput = document.createElement('input');
      tempInput.value = SITE_IDENTITY.githubUrl;
      tempInput.setAttribute('readonly', '');
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.select();
      const succeeded = document.execCommand('copy');
      document.body.removeChild(tempInput);
      if (succeeded) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <PerspectiveReveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="min-w-0 lg:col-span-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                Contact &amp; Code
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Explore repositories, follow ongoing experiments, or connect through GitHub.
              </p>
              {isPlaceholder && (
                <p className="mt-4 max-w-xl text-xs leading-relaxed text-zinc-400">
                  Placeholder active: replace{' '}
                  <code className="break-all font-mono text-zinc-300">githubUrl</code> in{' '}
                  <code className="break-all font-mono text-zinc-300">
                    src/data/portfolioData.ts
                  </code>{' '}
                  with your GitHub profile link before publishing.
                </p>
              )}
            </div>

            <div className="min-w-0 lg:col-span-6">
              <TiltCard3D className="group" maxTilt={3.5}>
                <div className="rounded-2xl border border-white/[0.08] bg-[#111115] p-6 sm:p-7">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161d] text-zinc-200">
                      <Github className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-400">
                        GitHub Profile {isPlaceholder ? '· Placeholder' : ''}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-sm text-zinc-100">
                        {SITE_IDENTITY.githubUrl}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-5">
                    <a
                      href={SITE_IDENTITY.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <span>Open GitHub</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyGithub}
                      aria-label="Copy GitHub profile URL"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#16161d] px-4 py-2.5 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-violet-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-blue-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </PerspectiveReveal>
      </div>
    </section>
  );
}
