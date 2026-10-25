import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = { value: string; label: string };

type DropdownProps = {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  label?: string;
  icon?: ReactNode;
  className?: string;
  searchable?: boolean;
};

export function Dropdown({
  value,
  options,
  onChange,
  label,
  icon,
  className = '',
  searchable = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-elev border border-app rounded-lg text-sm text-base hover:border-primary/50 transition-colors"
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{selected?.label || value}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-elev border border-app rounded-lg shadow-xl max-h-64 overflow-auto scrollbar-thin animate-fade-in">
          {searchable && (
            <div className="sticky top-0 p-2 bg-elev border-b border-app">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1.5 bg-base border border-app rounded text-sm outline-none focus:border-primary"
              />
            </div>
          )}
          {filtered.length === 0 && (
            <div className="px-3 py-3 text-sm text-muted">No results</div>
          )}
          {filtered.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
                setSearch('');
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-base transition-colors ${
                o.value === value ? 'text-primary font-medium' : 'text-base'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
