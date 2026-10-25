import { useMemo, useState, useEffect } from 'react';
import { Flame, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FilterBar } from '@/components/FilterBar';
import { TrendCard, ExportButtons } from '@/components/TrendCard';
import { SEED_TRENDS } from '@/data/trends';
import type { Trend } from '@/types';

export function TrendingView() {
  const { t, filters, setSelectedTrendId } = useApp();
  const [trends, setTrends] = useState<Trend[]>(SEED_TRENDS);
  const [refreshing, setRefreshing] = useState(false);

  // Simulated live updates: jitter the sparklines and volumes periodically
  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTrends((prev) =>
        prev.map((tr) => {
          const jitter = Math.round((Math.random() - 0.3) * 8);
          const newSpark = [...tr.sparkline.slice(1), Math.max(5, Math.min(100, (tr.sparkline[tr.sparkline.length - 1] || 50) + jitter))];
          return {
            ...tr,
            sparkline: newSpark,
            searchVolume: Math.max(1000, tr.searchVolume + Math.round((Math.random() - 0.4) * 50000)),
            growthPct: Math.max(5, tr.growthPct + Math.round((Math.random() - 0.5) * 20)),
          };
        }),
      );
      setRefreshing(false);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(refresh, 45000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let out = [...trends];
    if (filters.category !== 'all')
      out = out.filter((tr) => tr.category === filters.category);
    out = out.filter((tr) => tr.searchType === filters.searchType);
    if (filters.country !== 'WW')
      out = out.filter((tr) => tr.country === filters.country);
    if (filters.region && filters.region !== 'Global')
      out = out.filter((tr) => tr.region === filters.region);
    if (filters.city && filters.city !== 'Online')
      out = out.filter((tr) => tr.city === filters.city);
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      out = out.filter(
        (tr) =>
          tr.title.toLowerCase().includes(q) ||
          tr.relatedQueries.some((rq) => rq.query.toLowerCase().includes(q)),
      );
    }

    if (filters.timeframe === 'started_trending') {
      out = out.sort((a, b) => a.startedHoursAgo - b.startedHoursAgo);
    } else if (filters.timeframe === 'past_hour') {
      out = out.filter((tr) => tr.startedHoursAgo <= 1);
    } else if (filters.timeframe === 'past_4h') {
      out = out.filter((tr) => tr.startedHoursAgo <= 4);
    }

    if (filters.sort === 'volume') out = out.sort((a, b) => b.searchVolume - a.searchVolume);
    else if (filters.sort === 'velocity') out = out.sort((a, b) => b.growthPct - a.growthPct);

    return out;
  }, [trends, filters]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-neon" />
            {t('trendingNow')}
          </h1>
          <p className="text-sm text-muted mt-1">
            {filtered.length} {t('results')} · {t('liveUpdates')} · {filters.city}, {filters.region}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButtons trends={filtered} />
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {t('refresh')}
          </button>
        </div>
      </div>

      <FilterBar />

      {filtered.length === 0 ? (
        <div className="bg-card border border-app rounded-xl p-12 text-center">
          <p className="text-muted">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tr, i) => (
            <TrendCard
              key={tr.id}
              trend={tr}
              rank={i + 1}
              onOpen={() => setSelectedTrendId(tr.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
