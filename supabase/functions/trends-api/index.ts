import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CATEGORIES = ["tech", "gaming", "ecommerce", "finance", "entertainment"] as const;
const SEARCH_TYPES = ["web", "image", "news"] as const;
const REGIONS = [
  { country: "WW", region: "Global", city: "Online" },
  { country: "US", region: "California", city: "San Francisco" },
  { country: "IN", region: "Maharashtra", city: "Mumbai" },
  { country: "GB", region: "England", city: "London" },
  { country: "JP", region: "Tokyo", city: "Tokyo" },
  { country: "DE", region: "Berlin", city: "Berlin" },
  { country: "BR", region: "Sao Paulo", city: "Sao Paulo" },
  { country: "AU", region: "New South Wales", city: "Sydney" },
];

const TOPICS: Record<string, string[]> = {
  tech: ["AI breakthrough", "New GPU launch", "Cloud platform update", "Smartphone release", "Developer tool", "Quantum computing", "AR headset", "Robotics advancement"],
  gaming: ["New game release", "Esports tournament", "Game patch notes", "Speedrun record", "Indie game viral", "Gaming console", "Mobile gaming trend", "VR game launch"],
  ecommerce: ["Viral product", "Dropshipping winner", "Flash sale trend", "Sustainable product", "Smart home gadget", "Fashion trend", "Beauty product viral", "Kitchen gadget"],
  finance: ["Crypto rally", "Stock surge", "ETF launch", " fintech app", "Economic report", "Bitcoin update", "DeFi protocol", "Market correction"],
  entertainment: ["Movie trailer drop", "Celebrity news", "Music album release", "Streaming show viral", "Concert announcement", "Award show moment", "Social media challenge", "Viral video trend"],
};

function genSparkline(seed: number, growth: number): number[] {
  let v = 30 + (seed % 40);
  const out: number[] = [];
  for (let i = 0; i < 24; i++) {
    v += Math.sin(i / 3 + seed) * 8 + (seed % 5) - 2;
    v = Math.max(5, Math.min(100, v));
    out.push(Math.round(v));
  }
  const last = out[out.length - 1] || 50;
  out[out.length - 1] = Math.min(100, last + Math.round(growth / 10));
  return out;
}

function genRelated(seed: number, topic: string, count: number) {
  const variants = [
    `${topic} explained`, `${topic} 2026`, `best ${topic}`, `${topic} guide`,
    `${topic} tips`, `${topic} review`, `how to ${topic}`, `${topic} trends`,
    `${topic} news`, `${topic} update`, `${topic} tutorial`, `${topic} comparison`,
  ];
  return Array.from({ length: count }, (_, i) => {
    const idx = (seed + i * 7) % variants.length;
    return {
      query: variants[idx],
      score: 100 - i * 8 + (seed % 5),
      rising: (seed + i) % 3 === 0,
    };
  });
}

function genArticle(topic: string, category: string, growth: number): string {
  const catLabel = category === "tech" ? "technology" : category === "gaming" ? "gaming" : category === "finance" ? "finance" : category === "entertainment" ? "entertainment" : "e-commerce";
  return `${topic} is currently surging across global search platforms with a growth velocity of ${growth}% over the past 24 hours. This ${catLabel} trend began gaining traction approximately ${Math.max(1, Math.round(growth / 20))} hours ago and shows strong signs of sustained momentum. Analysts attribute the spike to a combination of social media amplification, breaking news catalysts, and organic user curiosity. The related query cluster around "${topic.toLowerCase()}" suggests audiences are actively seeking deeper context, comparisons, and primary sources. Early adopters and content creators who engage with this trend in the next 6 to 12 hours are positioned to capture outsized attention before the broader market saturates. Trends Now's predictive engine currently rates this signal as high-confidence with continued upward trajectory expected through the next news cycle.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const timeframe = params.get("timeframe") || "past_24h";
    const category = params.get("category") || "all";
    const country = params.get("country") || "WW";
    const searchType = params.get("searchType") || "web";
    const sort = params.get("sort") || "relevance";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Check for cached trends in the database
    const { data: cached } = await supabase
      .from("trend_cache")
      .select("data, updated_at")
      .eq("id", "latest")
      .maybeSingle();

    const now = Date.now();
    let trends: unknown[] = [];

    if (cached && (now - new Date(cached.updated_at).getTime()) < 300000) {
      trends = cached.data as unknown[];
    } else {
      // Generate fresh trend data
      const count = 25;
      trends = Array.from({ length: count }, (_, i) => {
        const seed = i * 137 + Math.floor(now / 60000);
        const cat = CATEGORIES[i % CATEGORIES.length];
        const topics = TOPICS[cat];
        const topic = topics[i % topics.length];
        const loc = REGIONS[i % REGIONS.length];
        const growth = 50 + (seed % 400);
        const volume = 10000 + (seed % 500000);
        const started = (i % 24) + 1;
        return {
          id: `trend-${i + 1}`,
          title: topic,
          topic,
          category: cat,
          searchType: SEARCH_TYPES[i % 3],
          country: loc.country,
          region: loc.region,
          city: loc.city,
          searchVolume: volume,
          growthPct: growth,
          startedHoursAgo: started,
          active: true,
          sparkline: genSparkline(seed, growth),
          relatedQueries: genRelated(seed, topic, 8),
          article: genArticle(topic, cat, growth),
        };
      });

      // Cache in database
      await supabase
        .from("trend_cache")
        .upsert({ id: "latest", data: trends, updated_at: new Date().toISOString() });
    }

    // Apply filters
    let filtered = [...trends] as Record<string, unknown>[];
    if (category !== "all") filtered = filtered.filter((t) => t.category === category);
    if (country !== "WW") filtered = filtered.filter((t) => t.country === country);
    if (searchType !== "all") filtered = filtered.filter((t) => t.searchType === searchType);

    if (timeframe === "past_hour") filtered = filtered.filter((t) => (t.startedHoursAgo as number) <= 1);
    else if (timeframe === "past_4h") filtered = filtered.filter((t) => (t.startedHoursAgo as number) <= 4);
    else if (timeframe === "started_trending") filtered = filtered.sort((a, b) => (a.startedHoursAgo as number) - (b.startedHoursAgo as number));

    if (sort === "volume") filtered.sort((a, b) => (b.searchVolume as number) - (a.searchVolume as number));
    else if (sort === "velocity") filtered.sort((a, b) => (b.growthPct as number) - (a.growthPct as number));

    return new Response(JSON.stringify({ trends: filtered, count: filtered.length, generatedAt: new Date().toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
