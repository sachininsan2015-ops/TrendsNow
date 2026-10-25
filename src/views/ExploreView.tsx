import { useState } from 'react';
import { BarChart3, Plus, X, Download, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LineChart, BarChart } from '@/components/Charts';
import { ExportButtons } from '@/components/TrendCard';
import { SEED_TRENDS } from '@/data/trends';
import { formatVolume, formatGrowth, classForGrowth } from '@/utils/format';
import type { Trend } from '@/types';

const COLORS = [
  'rgb(0, 229, 255)',
  'rgb(64, 140, 255)',
  'rgb(120, 180, 255)',
  'rgb(0, 180, 220)',
  'rgb(90, 210, 255)',
];

function genInterestSeries(seed: number, points = 24): number[] {
  let v = 30 + (seed % 40);
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    v += (Math.sin(i / 3 + seed) * 8) + (seed % 5) - 2;
    v = Math.max(8, Math.min(100, v));
    out.push(Math.round(v));
  }
  return out;
}

export function ExploreView() {
  const { t } = useApp();
  const [terms, setTerms] = useState<Trend[]>(
    SEED_TRENDS.slice(0, 2).map((tr, i) => ({
      ...tr,
      sparkline: genInterestSeries(i * 13 + 5),
    })),
  );
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Trend[]>([]);

  const addTerm = (trend: Trend) => {
    if (terms.length >= 5 || terms.some((x) => x.id === trend.id)) return;
    const idx = terms.length;
    setTerms((p) => [
      ...p,
      { ...trend, sparkline: genInterestSeries(idx * 17 + 11) },
    ]);
    setInput('');
    setSuggestions([]);
  };

  const removeTerm = (id: string) =>
    setTerms((p) => p.filter((x) => x.id !== id));

  const onInputChange = (v: string) => {
    setInput(v);
    if (!v.trim()) {
      setSuggestions([]);
      return;
    }
    const q = v.toLowerCase();
    setSuggestions(
      SEED_TRENDS.filter(
        (tr) =>
          tr.title.toLowerCase().includes(q) &&
          !terms.some((x) => x.id === tr.id),
      ).slice(0, 5),
    );
  };

  const labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
  const series = terms.map((tr, i) => ({
    name: tr.title,
    data: tr.sparkline,
    color: COLORS[i % COLORS.length],
  }));

  const topQueries = terms
    .flatMap((tr) => tr.relatedQueries.map((q) => ({ ...q, term: tr.title })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const risingQueries = terms
    .flatMap((tr) => tr.relatedQueries.filter((q) => q.rising).map((q) => ({ ...q, term: tr.title })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const compareBars = terms.map((tr, i) => ({
    label: tr.title.slice(0, 14),
    value: tr.searchVolume,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          {t('navExplore')}
        </h1>
        <p className="text-sm text-muted mt-1">{t('compareTerms')}</p>
      </div>

      <div className="bg-elev border border-app rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {terms.map((tr, i) => (
            <div
              key={tr.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-app bg-base"
              style={{ borderColor: COLORS[i % COLORS.length] }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm font-medium">{tr.title}</span>
              <button
                onClick={() => removeTerm(tr.id)}
                className="text-muted hover:text-error"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {terms.length < 5 && (
            <div className="relative flex-1 min-w-[200px]">
              <div className="relative">
                <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={t('comparePlaceholder')}
                  className="w-full pl-9 pr-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-elev border border-app rounded-lg shadow-xl max-h-56 overflow-auto scrollbar-thin animate-fade-in">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => addTerm(s)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-base transition-colors"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {terms.length === 0 && (
          <p className="text-sm text-muted">
            Add at least one search term to begin comparing interest over time.
          </p>
        )}
      </div>

      {terms.length > 0 && (
        <>
          <div className="bg-elev border border-app rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{t('interestOverTime')}</h2>
              <ExportButtons trends={terms} />
            </div>
            <LineChart series={series} labels={labels} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-elev border border-app rounded-xl p-5">
              <h2 className="font-semibold mb-4">{t('topQueries')}</h2>
              <div className="space-y-1.5">
                {topQueries.map((q, i) => (
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

            <div className="bg-elev border border-app rounded-xl p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon" />
                {t('risingQueries')}
              </h2>
              <div className="space-y-1.5">
                {risingQueries.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 bg-card border border-app rounded-lg text-sm"
                  >
                    <span className="truncate">{q.query}</span>
                    <span className="text-neon text-xs font-medium ml-2 flex-shrink-0">
                      +{Math.round(q.score * 1.5)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-elev border border-app rounded-xl p-5">
            <h2 className="font-semibold mb-4">{t('searchVolume')} — Comparison</h2>
            <BarChart data={compareBars} />
          </div>

          <div className="bg-elev border border-app rounded-xl p-5">
            <h2 className="font-semibold mb-3">Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted uppercase tracking-wide border-b border-app">
                    <th className="pb-2">Term</th>
                    <th className="pb-2 text-right">{t('searchVolume')}</th>
                    <th className="pb-2 text-right">{t('growth')}</th>
                  </tr>
                </thead>
                <tbody>
                  {terms.map((tr, i) => (
                    <tr key={tr.id} className="border-b border-app/50">
                      <td className="py-2.5 flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        {tr.title}
                      </td>
                      <td className="py-2.5 text-right tabular-nums">{formatVolume(tr.searchVolume)}</td>
                      <td className={`py-2.5 text-right tabular-nums ${classForGrowth(tr.growthPct)}`}>
                        {formatGrowth(tr.growthPct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
