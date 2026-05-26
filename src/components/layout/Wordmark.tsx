import Link from 'next/link';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  withSubtitle?: boolean;
}

const sizeClasses: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'text-2xl tracking-[0.3em]',
  md: 'text-3xl tracking-[0.4em]',
  lg: 'text-5xl tracking-[0.5em]',
};

export function Wordmark({ size = 'md', withSubtitle = false }: WordmarkProps) {
  return (
    <Link href="/" className="inline-block">
      <div className={`font-serif font-normal text-copper ${sizeClasses[size]}`}>
        МЕРИДИАН
      </div>
      {withSubtitle && (
        <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mt-1">
          SPECIALTY COFFEE · EST. 2026
        </div>
      )}
    </Link>
  );
}
