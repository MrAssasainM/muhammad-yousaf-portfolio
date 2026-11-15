import { NAV_ITEMS, SITE_IDENTITY } from '../data/portfolioData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-medium text-zinc-200">
            {SITE_IDENTITY.name}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            © {currentYear} {SITE_IDENTITY.name} · {SITE_IDENTITY.tagline}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="#home"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-200 whitespace-nowrap"
          >
            Home
          </a>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs text-zinc-400 transition-colors hover:text-zinc-200 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
