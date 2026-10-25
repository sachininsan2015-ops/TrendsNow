import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Toaster() {
  const { toasts, dismissToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon =
          t.type === 'success'
            ? CheckCircle2
            : t.type === 'error'
              ? XCircle
              : Info;
        const color =
          t.type === 'success'
            ? 'text-neon'
            : t.type === 'error'
              ? 'text-error'
              : 'text-electric';
        return (
          <div
            key={t.id}
            className="flex items-start gap-3 bg-elev border border-app rounded-xl shadow-lg px-4 py-3 animate-slide-up min-w-[260px]"
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
            <p className="text-sm text-base flex-1">{t.message}</p>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-muted hover:text-base"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
