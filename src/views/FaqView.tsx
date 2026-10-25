import { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FAQ_ITEMS } from '@/data/content';

export function FaqView() {
  const { t } = useApp();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          {t('faqTitle')}
        </h1>
        <p className="text-sm text-muted mt-1">{t('faqDesc')}</p>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="bg-card border border-app rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-base/50 transition-colors"
              >
                <span className="font-medium text-sm">{item.q}</span>
                {isOpen ? (
                  <Minus className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-muted flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-muted leading-relaxed animate-slide-up">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
