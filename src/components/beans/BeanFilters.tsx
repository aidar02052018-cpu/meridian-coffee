'use client';

import { useState, useMemo } from 'react';
import type { Bean, FlavorProfile, Process } from '@/lib/types';
import { BeanCard } from './BeanCard';

interface Props {
  beans: Bean[];
}

const FLAVOR_LABELS: Record<FlavorProfile | 'all', string> = {
  all: 'Все',
  sour: 'Кислые',
  sweet: 'Сладкие',
  bitter: 'Горькие',
  balanced: 'Сбалансированные',
};

const PROCESS_LABELS: Record<Process | 'all', string> = {
  all: 'Любая',
  washed: 'Washed',
  natural: 'Natural',
  honey: 'Honey',
};

export function BeanFilters({ beans }: Props) {
  const [flavor, setFlavor] = useState<FlavorProfile | 'all'>('all');
  const [process, setProcess] = useState<Process | 'all'>('all');

  const countries = useMemo(
    () => Array.from(new Set(beans.map((b) => b.country))).sort(),
    [beans]
  );
  const [country, setCountry] = useState<string>('all');

  const filtered = useMemo(() => {
    return beans.filter((b) => {
      if (flavor !== 'all' && b.flavor_profile !== flavor) return false;
      if (process !== 'all' && b.process !== process) return false;
      if (country !== 'all' && b.country !== country) return false;
      return true;
    });
  }, [beans, flavor, process, country]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-10 pb-6 border-b border-copper/15">
        <FilterGroup label="Вкус">
          {(Object.keys(FLAVOR_LABELS) as Array<keyof typeof FLAVOR_LABELS>).map((k) => (
            <Chip
              key={k}
              active={flavor === k}
              onClick={() => setFlavor(k as FlavorProfile | 'all')}
            >
              {FLAVOR_LABELS[k]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="Обработка">
          {(Object.keys(PROCESS_LABELS) as Array<keyof typeof PROCESS_LABELS>).map((k) => (
            <Chip
              key={k}
              active={process === k}
              onClick={() => setProcess(k as Process | 'all')}
            >
              {PROCESS_LABELS[k]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="Страна">
          <Chip active={country === 'all'} onClick={() => setCountry('all')}>
            Все
          </Chip>
          {countries.map((c) => (
            <Chip key={c} active={country === c} onClick={() => setCountry(c)}>
              {c}
            </Chip>
          ))}
        </FilterGroup>
      </div>

      <div className="text-xs font-mono tracking-[0.2em] text-copper/60 mb-6">
        НАЙДЕНО · {filtered.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-parchment/60 py-16">
          Под эти фильтры ничего не подошло. Попробуйте сбросить часть критериев.
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-2">
        {label.toUpperCase()}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'bg-copper text-night border-copper'
          : 'border-copper/30 text-parchment/70 hover:border-copper/60'
      }`}
    >
      {children}
    </button>
  );
}
