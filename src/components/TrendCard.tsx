import { useState } from 'react';
import { Flame, TrendingUp, Share2, Code2, Download, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Sparkline } from '@/components/Charts';
import { Modal, ShareModal } from '@/components/Modal';
import { formatVolume, formatGrowth, timeAgo, classForGrowth } from '@/utils/format';
import { exportTrendsCsv, exportTrendsJson, buildEmbedCode, copyToClipboard, shareUrl } from '@/utils/export';
import type { Trend } from '@/types';

export function TrendCard({
  trend,
  rank,
  onOpen,
}: {
  trend: Trend;
  rank: number;
  onOpen: () => void;
}) {
  const { t, addToast } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedCode, setEmbedCode] = useState('');

  const handleEmbed = () => {
    setEmbedCode(buildEmbedCode(trend));
    setEmbedOpen(true);
  };

  const handleCopyEmbed = async () => {
    const ok = await copyToClipboard(embedCode);
    addToast(ok ? t('embedCopied') : 'Copy failed', ok ? 'success' : 'error');
    setEmbedOpen(false);
  };

  return (
    <>
      <div className="group bg-card border border-app rounded-xl p-4 hover:border-primary/40 transition-all hover:shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-base flex items-center justify-center text-sm font-bold text-muted">
            {rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {trend.active && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon uppercase tracking-wide">
                  <Flame className="w-3 h-3" />
                  {t('active')}
                </span>
              )}
              <span className="text-[10px] text-muted uppercase tracking-wide">
                {t(`cat${trend.category.charAt(0).toUpperCase()}${trend.category.slice(1)}`)}
              </span>
            </div>
            <h3
              className="font-semibold text-base leading-snug cursor-pointer hover:text-primary transition-colors"
              onClick={onOpen}
            >
              {trend.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted">
              <span>{formatVolume(trend.searchVolume)} {t('searchVolume').toLowerCase()}</span>
              <span className={classForGrowth(trend.growthPct)}>
                <TrendingUp className="w-3 h-3 inline mr-0.5" />
                {formatGrowth(trend.growthPct)}
              </span>
              <span>{timeAgo(trend.startedHoursAgo)}</span>
            </div>
            <div className="mt-3">
              <Sparkline data={trend.sparkline} width={240} height={40} />
            </div>
            <div className="flex items-center gap-1 mt-3">
              <button
                onClick={onOpen}
                className="text-xs font-medium text-primary hover:underline"
              >
                {t('viewDetails')} →
              </button>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setShareOpen(true)}
                  className="p-1.5 rounded-lg hover:bg-base text-muted hover:text-primary transition-colors"
                  aria-label={t('share')}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleEmbed}
                  className="p-1.5 rounded-lg hover:bg-base text-muted hover:text-primary transition-colors"
                  aria-label={t('embed')}
                >
                  <Code2 className="w-4 h-4" />
                </button>
              </div>
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
        <p className="text-sm text-muted mb-3">
          Embed this trend widget on your site or dashboard.
        </p>
        <div className="bg-base border border-app rounded-lg p-3 mb-3">
          <div className="text-xs text-muted mb-2">Live preview:</div>
          <div className="bg-elev border border-app rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-neon" />
              <span className="font-semibold text-sm">{trend.title}</span>
            </div>
            <Sparkline data={trend.sparkline} width={300} height={50} />
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>{formatVolume(trend.searchVolume)} searches</span>
              <span className={classForGrowth(trend.growthPct)}>{formatGrowth(trend.growthPct)}</span>
            </div>
          </div>
        </div>
        <textarea
          readOnly
          value={embedCode}
          rows={3}
          className="w-full bg-base border border-app rounded-lg p-3 text-xs font-mono text-muted mb-3"
        />
        <button
          onClick={handleCopyEmbed}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          {t('embed')} — {t('copyLink')}
        </button>
      </Modal>
    </>
  );
}

export function ExportButtons({ trends }: { trends: Trend[] }) {
  const { t, addToast } = useApp();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          exportTrendsCsv(trends);
          addToast(t('csvExported'));
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-elev border border-app rounded-lg text-xs font-medium hover:border-primary transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        CSV
      </button>
      <button
        onClick={() => {
          exportTrendsJson(trends);
          addToast(t('jsonExported'));
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-elev border border-app rounded-lg text-xs font-medium hover:border-primary transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        JSON
      </button>
    </div>
  );
}

export { ChevronRight };
