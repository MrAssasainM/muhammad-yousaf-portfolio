import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, SITE_IDENTITY } from '../data/portfolioData';
import { isGithubPlaceholderUrl } from '../utils/portfolioHelpers';
import { ARCHITECTURAL_EASE, ScrollProgressBar } from './MotionPrimitives';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPlaceholder = isGithubPlaceholderUrl(SITE_IDENTITY.githubUrl);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        <a
          href="#home"
          onClick={handleNavClick}
          className="font-display text-lg font-semibold tracking-tight text-zinc-100 whitespace-nowrap shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {SITE_IDENTITY.name}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative py-1 whitespace-nowrap shrink-0 text-zinc-400 transition-colors duration-150 hover:text-zinc-100 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-violet-400 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SITE_IDENTITY.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#121217] px-4 py-2 text-xs font-medium text-zinc-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-blue-500/50 hover:bg-[#171720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#121217] text-zinc-200 transition-colors duration-150 hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <ScrollProgressBar />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: ARCHITECTURAL_EASE }}
            className="border-t border-white/[0.08] bg-[#0c0c10] px-6 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href="#home"
                  onClick={handleNavClick}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Home
                </a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {item.label === 'Journey' ? 'Learning Journey' : item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-white/[0.08]">
                <a
                  href={SITE_IDENTITY.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-white/15 bg-[#121217] px-4 text-sm font-medium text-zinc-100 transition-colors hover:border-blue-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span>{isPlaceholder ? 'GitHub Profile (Placeholder)' : 'GitHub Profile'}</span>
                  <ArrowUpRight className="h-4 w-4 text-blue-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
