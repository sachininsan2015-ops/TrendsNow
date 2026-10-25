import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { LangId, Filters, Toast, ViewId } from '@/types';
import { DICTS } from '@/data/i18n';
import { LANG_MAP } from '@/data/languages';

type Theme = 'dark' | 'light';

type AppState = {
  theme: Theme;
  toggleTheme: () => void;
  lang: LangId;
  setLang: (l: LangId) => void;
  t: (key: string) => string;
  isRTL: boolean;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  view: ViewId;
  setView: (v: ViewId) => void;
  selectedTrendId: string | null;
  setSelectedTrendId: (id: string | null) => void;
};

const AppContext = createContext<AppState | null>(null);

const DEFAULT_FILTERS: Filters = {
  timeframe: 'past_24h',
  category: 'all',
  searchType: 'web',
  country: 'WW',
  region: 'Global',
  city: 'Online',
  pincode: '',
  sort: 'relevance',
  query: '',
};

const RTL_LANGS: LangId[] = ['ar', 'fa', 'ur' as LangId];

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLangState] = useState<LangId>('en');
  const [filters, setFiltersState] = useState<Filters>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [view, setView] = useState<ViewId>('trending');
  const [selectedTrendId, setSelectedTrendId] = useState<string | null>(null);

  const toggleTheme = () =>
    setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  const setLang = (l: LangId) => setLangState(l);

  const setFilters = (f: Partial<Filters>) =>
    setFiltersState((p) => ({ ...p, ...f }));

  const dismissToast = (id: string) =>
    setToasts((p) => p.filter((t) => t.id !== id));

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => dismissToast(id), 3200);
  };

  const isRTL = RTL_LANGS.includes(lang);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [theme, isRTL, lang]);

  const t = useMemo(() => {
    const dict = DICTS[lang] || DICTS.en;
    return (key: string) => dict[key] ?? DICTS.en[key] ?? key;
  }, [lang]);

  const value: AppState = {
    theme,
    toggleTheme,
    lang,
    setLang,
    t,
    isRTL,
    filters,
    setFilters,
    toasts,
    addToast,
    dismissToast,
    view,
    setView,
    selectedTrendId,
    setSelectedTrendId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useLangLabel() {
  const { lang } = useApp();
  return LANG_MAP[lang]?.native || 'English';
}
