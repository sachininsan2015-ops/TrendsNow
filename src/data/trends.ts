import type { Trend, CategoryId, SearchTypeId } from '@/types';

const TEMPLATES: {
  topic: string;
  category: CategoryId;
  volume: number;
  growth: number;
  started: number;
}[] = [
  { topic: 'GPT-5 release date', category: 'tech', volume: 2840000, growth: 312, started: 3 },
  { topic: 'Apple Vision Pro 2 leak', category: 'tech', volume: 1820000, growth: 145, started: 8 },
  { topic: 'Claude 4 benchmarks', category: 'tech', volume: 980000, growth: 220, started: 5 },
  { topic: 'Gemini Ultra 2 review', category: 'tech', volume: 760000, growth: 88, started: 14 },
  { topic: 'RTX 5090 stock shortage', category: 'tech', volume: 540000, growth: 67, started: 22 },
  { topic: 'Tesla Robotaxi launch', category: 'tech', volume: 1650000, growth: 198, started: 6 },
  { topic: 'M4 MacBook Pro', category: 'tech', volume: 430000, growth: 41, started: 30 },
  { topic: 'Linux Mint 22 release', category: 'tech', volume: 180000, growth: 33, started: 18 },
  { topic: 'GTA 6 trailer 2 leak', category: 'gaming', volume: 4120000, growth: 425, started: 2 },
  { topic: 'Helldivers 3 announced', category: 'gaming', volume: 1240000, growth: 167, started: 11 },
  { topic: 'Switch 2 preorders', category: 'gaming', volume: 2890000, growth: 256, started: 4 },
  { topic: 'Elden Ring DLC 2', category: 'gaming', volume: 1670000, growth: 134, started: 9 },
  { topic: 'Valorant mobile beta', category: 'gaming', volume: 620000, growth: 78, started: 16 },
  { topic: 'Fortnite OG Chapter 2', category: 'gaming', volume: 1980000, growth: 102, started: 12 },
  { topic: 'PS5 Pro stock', category: 'gaming', volume: 890000, growth: 56, started: 20 },
  { topic: 'Temu IPO rumors', category: 'ecommerce', volume: 1320000, growth: 89, started: 15 },
  { topic: 'Amazon Prime Day deals', category: 'ecommerce', volume: 3450000, growth: 234, started: 7 },
  { topic: 'Shopify Black Friday', category: 'ecommerce', volume: 720000, growth: 145, started: 13 },
  { topic: 'Shein fast fashion ban', category: 'ecommerce', volume: 540000, growth: 67, started: 19 },
  { topic: 'Dropshipping winning products', category: 'ecommerce', volume: 410000, growth: 38, started: 24 },
  { topic: 'Bitcoin ETF inflows', category: 'finance', volume: 2210000, growth: 178, started: 5 },
  { topic: 'Solana meme coins', category: 'finance', volume: 1780000, growth: 289, started: 3 },
  { topic: 'Nvidia stock split', category: 'finance', volume: 1340000, growth: 112, started: 10 },
  { topic: 'Ethereum Pectra upgrade', category: 'finance', volume: 680000, growth: 84, started: 17 },
  { topic: 'Crypto regulation news', category: 'finance', volume: 920000, growth: 56, started: 21 },
  { topic: 'S&P 500 record high', category: 'finance', volume: 580000, growth: 31, started: 26 },
  { topic: 'Dune Part Three trailer', category: 'entertainment', volume: 3120000, growth: 267, started: 4 },
  { topic: 'Stranger Things 5 release', category: 'entertainment', volume: 2890000, growth: 198, started: 6 },
  { topic: 'Taylor Swift Eras tour', category: 'entertainment', volume: 4120000, growth: 145, started: 9 },
  { topic: 'Saturday Night Live host', category: 'entertainment', volume: 740000, growth: 89, started: 14 },
  { topic: 'Oscars 2026 predictions', category: 'entertainment', volume: 1120000, growth: 102, started: 12 },
  { topic: 'K-pop world tour 2026', category: 'entertainment', volume: 1670000, growth: 156, started: 8 },
];

const REGIONS = [
  { country: 'WW', region: 'Global', city: 'Online' },
  { country: 'US', region: 'California', city: 'Los Angeles' },
  { country: 'US', region: 'New York', city: 'New York City' },
  { country: 'IN', region: 'Maharashtra', city: 'Mumbai' },
  { country: 'IN', region: 'Karnataka', city: 'Bengaluru' },
  { country: 'GB', region: 'England', city: 'London' },
  { country: 'JP', region: 'Tokyo', city: 'Shibuya' },
  { country: 'DE', region: 'Bavaria', city: 'Munich' },
  { country: 'BR', region: 'São Paulo', city: 'São Paulo' },
  { country: 'AU', region: 'New South Wales', city: 'Sydney' },
];

const SEARCH_TYPES: SearchTypeId[] = ['web', 'image', 'news'];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function genSparkline(seed: number, growth: number): number[] {
  const rand = seededRandom(seed);
  const points: number[] = [];
  let val = 20 + rand() * 15;
  for (let i = 0; i < 24; i++) {
    const trendBias = (growth / 100) * (i / 23) * 30;
    const noise = (rand() - 0.5) * 14;
    val = Math.max(5, Math.min(100, val + trendBias * 0.3 + noise));
    points.push(Math.round(val));
  }
  const last = points[points.length - 1] || 50;
  points[points.length - 1] = Math.min(100, Math.round(last + growth * 0.08));
  return points;
}

const RELATED_POOL = [
  'what is', 'how to', 'price', 'release date', 'review', 'vs',
  'leaked', 'official', 'rumors', 'explained', 'tutorial', 'best',
  'news', 'update', 'live', 'reddit', 'twitter', 'youtube',
];

function genRelated(seed: number, topic: string, count: number) {
  const rand = seededRandom(seed);
  const out: { query: string; score: number; rising: boolean }[] = [];
  const shuffled = [...RELATED_POOL].sort(() => rand() - 0.5);
  for (let i = 0; i < count; i++) {
    out.push({
      query: `${shuffled[i]} ${topic.toLowerCase()}`,
      score: Math.round(20 + rand() * 80),
      rising: rand() > 0.4,
    });
  }
  return out.sort((a, b) => b.score - a.score);
}

function genArticle(topic: string, category: string, growth: number): string {
  const catLabel = category === 'tech' ? 'technology' : category === 'gaming' ? 'gaming' : category === 'finance' ? 'finance' : category === 'entertainment' ? 'entertainment' : 'e-commerce';
  return `${topic} is currently surging across global search platforms with a growth velocity of ${growth}% over the past 24 hours. This ${catLabel} trend began gaining traction approximately ${Math.max(1, Math.round(growth / 20))} hours ago and shows strong signs of sustained momentum. Analysts attribute the spike to a combination of social media amplification, breaking news catalysts, and organic user curiosity. The related query cluster around "${topic.toLowerCase()}" suggests audiences are actively seeking deeper context, comparisons, and primary sources. Early adopters and content creators who engage with this trend in the next 6 to 12 hours are positioned to capture outsized attention before the broader market saturates. Trends Now's predictive engine currently rates this signal as high-confidence with continued upward trajectory expected through the next news cycle.`;
}

export function generateTrends(): Trend[] {
  return TEMPLATES.map((t, i) => {
    const seed = i * 137 + 7;
    const loc = REGIONS[i % REGIONS.length];
    const sparkline = genSparkline(seed, t.growth);
    return {
      id: `trend-${i + 1}`,
      title: t.topic,
      topic: t.topic,
      category: t.category,
      searchType: SEARCH_TYPES[i % 3],
      country: loc.country,
      region: loc.region,
      city: loc.city,
      searchVolume: t.volume,
      growthPct: t.growth,
      startedHoursAgo: t.started,
      active: true,
      sparkline,
      relatedQueries: genRelated(seed, t.topic, 8),
      article: genArticle(t.topic, t.category, t.growth),
    };
  });
}

export const SEED_TRENDS = generateTrends();
