import { useState, useRef, useEffect } from 'react';
import { TrendingUp, Search, Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LANGUAGES } from '@/data/languages';
import { Dropdown } from '@/components/Dropdown';
import { AdSlot } from '@/components/AdSlot';

export function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { t, theme, toggleTheme, lang, setLang, filters, setFilters } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.id === lang);

  return (
    <header className="sticky top-0 z-40 bg-elev/95 backdrop-blur-md border-b border-app">
      <div className="flex items-center gap-3 px-4 h-16">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-base transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-none tracking-tight flex items-center gap-2">
              Trends Now
              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">Live</span>
            </div>
            <div className="text-[10px] text-muted leading-none mt-0.5">{t('tagline')}</div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        <div ref={ref} className="relative flex-shrink-0">
          <button
            onClick={() => setLangOpen((p) => !p)}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-base transition-colors text-sm"
            aria-label={t('language')}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline text-xs">{currentLang?.native}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-elev border border-app rounded-lg shadow-xl max-h-80 overflow-auto scrollbar-thin animate-fade-in">
              <div className="sticky top-0 px-3 py-2 bg-elev border-b border-app text-xs font-semibold text-muted uppercase tracking-wide">
                {t('language')} — 30+
              </div>
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLang(l.id);
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-base transition-colors ${
                    l.id === lang ? 'text-primary font-medium' : 'text-base'
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1 text-left">
                    <span className="block leading-tight">{l.native}</span>
                    <span className="block text-xs text-muted leading-tight">{l.label}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-base transition-colors flex-shrink-0"
          aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="hidden lg:flex justify-center px-4 pb-2">
        <AdSlot placement="header" />
      </div>
    </header>
  );
}

export { Dropdown };
export type { };
