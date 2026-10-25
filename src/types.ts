export type TrendId = string;

export type Trend = {
  id: TrendId;
  title: string;
  topic: string;
  category: CategoryId;
  searchType: SearchTypeId;
  country: string;
  region: string;
  city: string;
  searchVolume: number;
  growthPct: number;
  startedHoursAgo: number;
  active: boolean;
  sparkline: number[];
  relatedQueries: { query: string; score: number; rising: boolean }[];
  article: string;
};

export type CategoryId =
  | 'all'
  | 'tech'
  | 'gaming'
  | 'ecommerce'
  | 'finance'
  | 'entertainment';

export type SearchTypeId = 'web' | 'image' | 'news';

export type TimeFrameId =
  | 'past_hour'
  | 'started_trending'
  | 'past_4h'
  | 'past_24h'
  | 'past_48h'
  | 'past_7d'
  | 'past_year'
  | 'past_5years';

export type SortId = 'relevance' | 'volume' | 'velocity';

export type LangId =
  | 'en' | 'hi' | 'es' | 'fr' | 'ja' | 'de' | 'zh' | 'ar' | 'ru'
  | 'pt' | 'it' | 'ko' | 'tr' | 'id' | 'vi' | 'pl' | 'nl' | 'tl'
  | 'th' | 'bn' | 'fa' | 'uk' | 'ms' | 'sv' | 'no' | 'fi' | 'da'
  | 'cs' | 'ro' | 'el';

export type Language = {
  id: LangId;
  label: string;
  native: string;
  flag: string;
};

export type Country = {
  code: string;
  name: string;
  regions: { name: string; cities: string[] }[];
  pincodes: { code: string; area: string }[];
};

export type ViewId =
  | 'trending'
  | 'explore'
  | 'predictive'
  | 'creator'
  | 'blog'
  | 'faq';

export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
};

export type Filters = {
  timeframe: TimeFrameId;
  category: CategoryId;
  searchType: SearchTypeId;
  country: string;
  region: string;
  city: string;
  pincode: string;
  sort: SortId;
  query: string;
};

export type CreatorScript = {
  id: string;
  title: string;
  language: LangId;
  duration: number;
  tone: 'hype' | 'professional' | 'storytelling';
  script: string;
  hooks: string[];
  hashtags: string[];
  createdAt: number;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: number;
  date: string;
};
