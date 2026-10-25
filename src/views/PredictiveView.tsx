import { useMemo } from 'react';
import { Sparkles, TrendingUp, Clock, Zap, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Sparkline } from '@/components/Charts';
import { SEED_TRENDS } from '@/data/trends';
import { classForGrowth, formatVolume, timeAgo } from '@/utils/format';
import type { Trend } from '@/types';

type Predictive = Trend & {
  confidence: number;
  hoursToPeak: number;
  predictedPeakVolume: number;
};

export function PredictiveView() {
  const { t, setSelectedTrendId } = useApp();

  const predictions: Predictive[] = useMemo(
    () =>
      SEED_TRENDS.filter((tr) => tr.growthPct > 60)
        .map((tr, i) => {
          const confidence = Math.min(96, 55 + Math.round(tr.growthPct / 6) + (i % 10));
          const hoursToPeak = Math.max(2, Math.round(120 / Math.sqrt(tr.growthPct)) - tr.startedHoursAgo);
          return {
            ...tr,
            confidence,
            hoursToPeak,
            predictedPeakVolume: Math.round(tr.searchVolume * (1 + tr.growthPct / 100)),
          };
        })
        .sort((a, b) => b.confidence - a.confidence),
    [],
  );

  const forecastBars = predictions.slice(0, 8).map((p) => ({
    label: p.title.slice(0, 12),
    value: p.confidence,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          {t('predictiveTitle')}
        </h1>
        <p className="text-sm text-muted mt-1 max-w-2xl">{t('predictiveDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="Signals tracked"
          value={String(predictions.length * 14)}
          accent="text-primary"
        />
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="High-confidence"
          value={String(predictions.filter((p) => p.confidence >= 80).length)}
          accent="text-electric"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg. time to peak"
          value={`${Math.round(predictions.reduce((s, p) => s + p.hoursToPeak, 0) / predictions.length)}h`}
          accent="text-neon"
        />
      </div>

      <div className="bg-elev border border-app rounded-xl p-5">
        <h2 className="font-semibold mb-4">Confidence Forecast — Top Signals</h2>
        <div className="space-y-2">
          {forecastBars.map((b) => {
            const max = 100;
            return (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-28 text-xs text-muted truncate" title={b.label}>{b.label}</div>
                <div className="flex-1 bg-base rounded-full h-5 overflow-hidden border border-app">
                  <div
                    className="h-full rounded-full bg-gradient-neon transition-all duration-700"
                    style={{ width: `${(b.value / max) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-xs text-right tabular-nums">{b.value}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((p) => (
          <div
            key={p.id}
            className="bg-card border border-app rounded-xl p-4 hover:border-neon transition-all cursor-pointer shadow-neon-sm"
            onClick={() => setSelectedTrendId(p.id)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                    {t('predictiveTitle')}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug">{p.title}</h3>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-primary">{p.confidence}%</div>
                <div className="text-[10px] text-muted uppercase">{t('confidence')}</div>
              </div>
            </div>

            <div className="my-3">
              <Sparkline data={p.sparkline} width={320} height={48} color="rgb(0, 229, 255)" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-base rounded-lg p-2">
                <div className="text-muted text-[10px] uppercase">{t('predictedPeak')}</div>
                <div className="font-semibold">{formatVolume(p.predictedPeakVolume)}</div>
              </div>
              <div className="bg-base rounded-lg p-2">
                <div className="text-muted text-[10px] uppercase">{t('timeToPeak')}</div>
                <div className="font-semibold">{p.hoursToPeak}h</div>
              </div>
              <div className="bg-base rounded-lg p-2">
                <div className="text-muted text-[10px] uppercase">{t('growth')}</div>
                <div className={`font-semibold ${classForGrowth(p.growthPct)}`}>
                  <TrendingUp className="w-3 h-3 inline" /> +{p.growthPct}%
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-muted">
              Started {timeAgo(p.startedHoursAgo)} · {p.city}, {p.region}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="bg-card border border-app rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg bg-base flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        <div className="text-xs text-muted">{label}</div>
      </div>
    </div>
  );
}
