import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BLOG_TEMPLATES = [
  { cat: "AI", title: (t: string) => `How ${t} Is Reshaping Content Creation in 2026`, tags: ["AI", "content", "trends", "creators"] },
  { cat: "Tech", title: (t: string) => `${t}: The Tech Trend Everyone Is Searching For`, tags: ["tech", "trends", "innovation"] },
  { cat: "Gaming", title: (t: string) => `Why ${t} Is Dominating Gaming Search Right Now`, tags: ["gaming", "trends", "viral"] },
  { cat: "E-Commerce", title: (t: string) => `The ${t} Boom: How Sellers Are Cashing In Early`, tags: ["ecommerce", "trends", "products"] },
  { cat: "Finance", title: (t: string) => `${t} and the Markets: What Real-Time Trends Reveal`, tags: ["finance", "crypto", "trends"] },
  { cat: "Entertainment", title: (t: string) => `The Viral Cycle of ${t}: Why It Is Trending Now`, tags: ["entertainment", "viral", "trends"] },
  { cat: "Marketing", title: (t: string) => `Hyper-Local Targeting with ${t}: A Marketer's Playbook`, tags: ["marketing", "trends", "strategy"] },
  { cat: "Creators", title: (t: string) => `Creator's Guide to ${t}: Catch the Wave Before It Peaks`, tags: ["creators", "trends", "content"] },
];

const TOPICS = [
  "AI trend forecasting", "generative search", "viral gaming launches", "dropshipping winners",
  "crypto sentiment analysis", "entertainment viral cycles", "hyper-local marketing", "predictive content",
  "real-time trend tracking", "search interest velocity", "related query clustering", "cross-category signals",
];

function genBody(topic: string, category: string): string {
  return `${topic} is one of the fastest-rising search trends tracked by Trends Now this week. The signal first appeared approximately 18 hours ago and has sustained a growth velocity exceeding 150 percent, indicating strong organic interest rather than a transient spike.

**Why this trend matters.** The related query cluster around "${topic.toLowerCase()}" shows users seeking depth, not just headlines. They are searching for guides, comparisons, and practical applications. This depth of intent is what separates durable trends from fleeting ones.

**The opportunity window.** Based on velocity acceleration patterns, the trend is expected to reach peak search interest within the next 12 to 24 hours. Content creators and marketers who publish within this window capture maximum algorithmic distribution before the market saturates.

**How to act on it.** Use the Trends Now platform to monitor the trend's sparkline in real time. Generate a creator script in your language, set your filters to the relevant category, and export the trend data as CSV for your team. The predictive engine rates this signal as high-confidence.

**Looking ahead.** Cross-category correlation suggests this trend may spill into adjacent topics within 48 hours. Keep an eye on related queries for early signals of where the conversation is heading next.`;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Check last generation time
    const { data: settings } = await supabase
      .from("app_settings")
      .select("last_blog_generation")
      .eq("id", 1)
      .maybeSingle();

    const now = new Date();
    const lastGen = settings?.last_blog_generation ? new Date(settings.last_blog_generation) : null;
    const twelveHoursMs = 12 * 60 * 60 * 1000;

    if (lastGen && (now.getTime() - lastGen.getTime()) < twelveHoursMs) {
      return new Response(JSON.stringify({ message: "Blogs generated recently, skipping", lastGeneration: lastGen.toISOString() }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate 2 fresh blog posts from trending topics
    const seed = Math.floor(now.getTime() / 1000);
    const newPosts = Array.from({ length: 2 }, (_, i) => {
      const topicIdx = (seed + i * 3) % TOPICS.length;
      const tmplIdx = (seed + i * 5) % BLOG_TEMPLATES.length;
      const topic = TOPICS[topicIdx];
      const tmpl = BLOG_TEMPLATES[tmplIdx];
      const title = tmpl.title(topic);
      return {
        id: `auto-${slugify(title)}-${seed}-${i}`,
        title,
        excerpt: `${topic} is trending now with strong sustained momentum. Here is what the data shows and how to act on it before the window closes.`,
        body: genBody(topic, tmpl.cat),
        category: tmpl.cat,
        tags: tmpl.tags,
        read_time: 3 + (i % 3),
        published: true,
        auto_generated: true,
        trend_source: topic,
        created_at: now.toISOString(),
      };
    });

    const { error } = await supabase.from("blog_posts").insert(newPosts);

    // Update last generation time
    await supabase.from("app_settings").update({ last_blog_generation: now.toISOString() }).eq("id", 1);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Generated 2 new blog posts", posts: newPosts.map((p) => ({ id: p.id, title: p.title })) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
