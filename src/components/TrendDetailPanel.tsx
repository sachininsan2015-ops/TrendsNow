import { useState } from 'react';
import { X, Flame, TrendingUp, Clock, MapPin, Share2, Code2, Copy, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Sparkline, BarChart } from '@/components/Charts';
import { ShareModal, Modal } from '@/components/Modal';
import { formatVolume, formatGrowth, timeAgo, classForGrowth } from '@/utils/format';
import { buildEmbedCode, copyToClipboard, shareUrl } from '@/utils/export';
import type { Trend } from '@/types';

export function TrendDetailPanel({
  trend,
  onClose,
}: {
  trend: Trend | null;
  onClose: () => void;
}) {
  const { t, addToast } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);

  if (!trend) return null;

  const hours = Array.from({ length: 24 }, (_, i) => `${i}h`);
  const hourlyBars = trend.sparkline.map((v, i) => ({
    label: hours[i],
    value: v,
  }));

  const handleCopyArticle = async () => {
    const ok = await copyToClipboard(trend.article);
    addToast(ok ? 'Article copied' : 'Copy failed', ok ? 'success' : 'error');
  };

  const handleCopyEmbed = async () => {
    const ok = await copyToClipboard(buildEmbedCode(trend));
    addToast(ok ? t('embedCopied') : 'Copy failed', ok ? 'success' : 'error');
    setEmbedOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] flex justify-end animate-fade-in">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-elev border-l border-app h-full overflow-auto scrollbar-thin animate-slide-up">
          <div className="sticky top-0 bg-elev border-b border-app px-5 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              {trend.active && <Flame className="w-4 h-4 text-neon" />}
              <h3 className="font-semibold text-sm truncate">{trend.title}</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-base">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat label={t('searchVolume')} value={formatVolume(trend.searchVolume)} />
              <Stat
                label={t('growth')}
                value={formatGrowth(trend.growthPct)}
                valueClass={classForGrowth(trend.growthPct)}
              />
              <Stat label={t('started')} value={timeAgo(trend.startedHoursAgo)} />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-base rounded">
                <MapPin className="w-3 h-3" /> {trend.city}, {trend.region}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-base rounded">
                <Clock className="w-3 h-3" /> {t(`tfPast${trend.startedHoursAgo <= 1 ? 'Hour' : '24h'}`)}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">{t('hourlyBreakdown')}</h4>
                <span className="text-xs text-muted">24h sparkline</span>
              </div>
              <div className="bg-card border border-app rounded-lg p-3">
                <Sparkline data={trend.sparkline} width={340} height={70} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">{t('hourlyBreakdown')}</h4>
              <BarChart data={hourlyBars.slice(-12)} height={180} />
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">{t('topQueries')}</h4>
              <div className="space-y-1.5">
                {trend.relatedQueries
                  .filter((q) => !q.rising)
                  .slice(0, 5)
                  .map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 bg-card border border-app rounded-lg text-sm"
                    >
                      <span className="truncate">{q.query}</span>
                      <span className="text-muted text-xs ml-2 flex-shrink-0">{q.score}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">{t('risingQueries')}</h4>
              <div className="space-y-1.5">
                {trend.relatedQueries
                  .filter((q) => q.rising)
                  .slice(0, 5)
                  .map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 bg-card border border-app rounded-lg text-sm"
                    >
                      <span className="truncate flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-neon flex-shrink-0" />
                        {q.query}
                      </span>
                      <span className="text-neon text-xs font-medium ml-2 flex-shrink-0">
                        +{Math.round(q.score * 1.5)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t('article')}
                </h4>
                <button
                  onClick={handleCopyArticle}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <p className="text-sm text-muted leading-relaxed bg-card border border-app rounded-lg p-4">
                {trend.article}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShareOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <Share2 className="w-4 h-4" />
                {t('share')}
              </button>
              <button
                onClick={() => setEmbedOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-elev border border-app rounded-lg text-sm font-medium hover:border-primary transition-colors"
              >
                <Code2 className="w-4 h-4" />
                {t('embed')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl(trend)}
        title={trend.title}
      />
      <Modal open={embedOpen} onClose={() => setEmbedOpen(false)} title={t('embed')}>
        <p className="text-sm text-muted mb-3">Embed this trend widget on your site.</p>
        <textarea
          readOnly
          value={buildEmbedCode(trend)}
          rows={3}
          className="w-full bg-base border border-app rounded-lg p-3 text-xs font-mono text-muted mb-3"
        />
        <button
          onClick={handleCopyEmbed}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          {t('embed')} — Copy
        </button>
      </Modal>
    </>
  );
}

function Stat({
  label,
  value,
  valueClass = '',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-card border border-app rounded-lg p-3">
      <div className="text-[10px] text-muted uppercase tracking-wide mb-1">{label}</div>
      <div className={`text-sm font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}
