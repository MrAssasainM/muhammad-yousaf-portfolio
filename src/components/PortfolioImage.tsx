import { useState } from 'react';
import { Layers } from 'lucide-react';

interface PortfolioImageProps {
  src?: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function PortfolioImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: PortfolioImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#13131a] via-[#101015] to-[#161522] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-blue-400">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="font-display text-sm font-medium tracking-wide text-zinc-300">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
