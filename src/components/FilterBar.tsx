import { useState } from 'react';
import { Clock, Tag, Search, MapPin, ArrowDownWideNarrow, Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dropdown } from '@/components/Dropdown';
import { COUNTRIES, suggestPincodes } from '@/data/locations';
import type { TimeFrameId, CategoryId, SearchTypeId, SortId } from '@/types';

const TIMEFRAMES: { value: TimeFrameId; key: string }[] = [
  { value: 'past_hour', key: 'tfPastHour' },
  { value: 'started_trending', key: 'tfStarted' },
  { value: 'past_4h', key: 'tfPast4h' },
  { value: 'past_24h', key: 'tfPast24h' },
  { value: 'past_48h', key: 'tfPast48h' },
  { value: 'past_7d', key: 'tfPast7d' },
  { value: 'past_year', key: 'tfPastYear' },
  { value: 'past_5years', key: 'tfPast5years' },
];

const CATEGORIES: { value: CategoryId; key: string }[] = [
  { value: 'all', key: 'catAll' },
  { value: 'tech', key: 'catTech' },
  { value: 'gaming', key: 'catGaming' },
  { value: 'ecommerce', key: 'catEcommerce' },
  { value: 'finance', key: 'catFinance' },
  { value: 'entertainment', key: 'catEntertainment' },
];

const SEARCH_TYPES: { value: SearchTypeId; key: string }[] = [
  { value: 'web', key: 'typeWeb' },
  { value: 'image', key: 'typeImage' },
  { value: 'news', key: 'typeNews' },
];

const SORTS: { value: SortId; key: string }[] = [
  { value: 'relevance', key: 'sortRelevance' },
  { value: 'volume', key: 'sortVolume' },
  { value: 'velocity', key: 'sortVelocity' },
];

export function FilterBar() {
  const { t, filters, setFilters } = useApp();
  const [pinOpen, setPinOpen] = useState(false);

  const country = COUNTRIES.find((c) => c.code === filters.country);
  const regions = country?.regions || [];
  const cities =
    regions.find((r) => r.name === filters.region)?.cities || [];

  const pinSuggestions = filters.country
    ? suggestPincodes(filters.country, filters.pincode)
    : [];

  return (
    <div className="bg-elev border border-app rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Filter className="w-4 h-4 text-primary" />
        {t('filters')}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Dropdown
          label={t('timeframe')}
          icon={<Clock className="w-4 h-4 text-muted" />}
          value={filters.timeframe}
          options={TIMEFRAMES.map((tf) => ({ value: tf.value, label: t(tf.key) }))}
          onChange={(v) => setFilters({ timeframe: v as TimeFrameId })}
        />
        <Dropdown
          label={t('category')}
          icon={<Tag className="w-4 h-4 text-muted" />}
          value={filters.category}
          options={CATEGORIES.map((c) => ({ value: c.value, label: t(c.key) }))}
          onChange={(v) => setFilters({ category: v as CategoryId })}
        />
        <Dropdown
          label={t('searchType')}
          icon={<Search className="w-4 h-4 text-muted" />}
          value={filters.searchType}
          options={SEARCH_TYPES.map((s) => ({ value: s.value, label: t(s.key) }))}
          onChange={(v) => setFilters({ searchType: v as SearchTypeId })}
        />
        <Dropdown
          label={t('sort')}
          icon={<ArrowDownWideNarrow className="w-4 h-4 text-muted" />}
          value={filters.sort}
          options={SORTS.map((s) => ({ value: s.value, label: t(s.key) }))}
          onChange={(v) => setFilters({ sort: v as SortId })}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Dropdown
          label={t('country')}
          icon={<MapPin className="w-4 h-4 text-muted" />}
          value={filters.country}
          options={COUNTRIES.map((c) => ({ value: c.code, label: c.name }))}
          onChange={(v) => {
            const c = COUNTRIES.find((x) => x.code === v);
            setFilters({
              country: v,
              region: c?.regions[0]?.name || '',
              city: c?.regions[0]?.cities[0] || '',
              pincode: '',
            });
          }}
        />
        <Dropdown
          label={t('region')}
          value={filters.region}
          options={regions.map((r) => ({ value: r.name, label: r.name }))}
          onChange={(v) => {
            const r = regions.find((x) => x.name === v);
            setFilters({ region: v, city: r?.cities[0] || '' });
          }}
        />
        <Dropdown
          label={t('city')}
          value={filters.city}
          options={cities.map((c) => ({ value: c, label: c }))}
          onChange={(v) => setFilters({ city: v })}
        />
        <div className="relative">
          <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
            {t('pincode')}
          </label>
          <div className="relative">
            <input
              value={filters.pincode}
              onFocus={() => setPinOpen(true)}
              onChange={(e) => {
                setFilters({ pincode: e.target.value });
                setPinOpen(true);
              }}
              placeholder="Search zip / pincode..."
              className="w-full px-3 py-2 bg-elev border border-app rounded-lg text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          {pinOpen && pinSuggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-elev border border-app rounded-lg shadow-xl max-h-48 overflow-auto scrollbar-thin animate-fade-in">
              {pinSuggestions.map((p) => (
                <button
                  key={`${p.code}-${p.area}`}
                  onClick={() => {
                    setFilters({ pincode: p.code });
                    setPinOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-base transition-colors"
                >
                  <span className="font-medium">{p.code}</span>
                  <span className="text-muted ml-2">{p.area}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
