import { Flame, BarChart3, Sparkles, PenTool, BookOpen, HelpCircle, X, TrendingUp, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ViewId } from '@/types';

const NAV: { id: ViewId; icon: typeof Flame; key: string }[] = [
  { id: 'trending', icon: Flame, key: 'navTrending' },
  { id: 'explore', icon: BarChart3, key: 'navExplore' },
  { id: 'predictive', icon: Sparkles, key: 'navPredictive' },
  { id: 'creator', icon: PenTool, key: 'navCreator' },
  { id: 'blog', icon: BookOpen, key: 'navBlog' },
  { id: 'faq', icon: HelpCircle, key: 'navFaq' },
  { id: 'admin', icon: Shield, key: 'navAdmin' },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, view, setView } = useApp();

  const go = (id: ViewId) => {
    setView(id);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4rem)] w-60 bg-elev border-r border-app flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-app">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Trends Now</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-base">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-auto scrollbar-thin">
          <div className="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wide">
            {t('appName')}
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted hover:text-base hover:bg-base'
                }`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                <span>{t(item.key)}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-app">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            <span>{t('liveUpdates')}</span>
            <span className="ml-auto">{t('poweredBy')}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
