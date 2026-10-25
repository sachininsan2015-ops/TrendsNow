import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "";

    // POST /admin-api?action=verify — verify admin passcode
    if (req.method === "POST" && action === "verify") {
      const body = await req.json();
      const { passcode } = body;

      const { data: settings } = await supabase
        .from("app_settings")
        .select("admin_passcode, ads_enabled, adsense_client, adsterra_key, affiliate_enabled")
        .eq("id", 1)
        .maybeSingle();

      if (!settings) {
        return new Response(JSON.stringify({ valid: false, error: "Settings not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (passcode !== settings.admin_passcode) {
        return new Response(JSON.stringify({ valid: false, error: "Invalid passcode" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        valid: true,
        settings: {
          ads_enabled: settings.ads_enabled,
          adsense_client: settings.adsense_client,
          adsterra_key: settings.adsterra_key,
          affiliate_enabled: settings.affiliate_enabled,
        },
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET /admin-api?action=analytics — fetch visitor analytics
    if (req.method === "GET" && action === "analytics") {
      const hours = parseInt(url.searchParams.get("hours") || "24", 10);
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

      const { data: visits, error: vErr } = await supabase
        .from("visitors")
        .select("page, country, device, referrer, created_at, session_id")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);

      if (vErr) throw vErr;

      const totalVisits = visits?.length || 0;
      const uniqueSessions = new Set(visits?.map((v) => v.session_id)).size;
      const byPage: Record<string, number> = {};
      const byCountry: Record<string, number> = {};
      const byDevice: Record<string, number> = {};
      const byHour: Record<string, number> = {};

      for (const v of visits || []) {
        byPage[v.page] = (byPage[v.page] || 0) + 1;
        byCountry[v.country || "Unknown"] = (byCountry[v.country || "Unknown"] || 0) + 1;
        byDevice[v.device || "Unknown"] = (byDevice[v.device || "Unknown"] || 0) + 1;
        const hr = new Date(v.created_at).toISOString().slice(0, 13);
        byHour[hr] = (byHour[hr] || 0) + 1;
      }

      const { data: blogs } = await supabase
        .from("blog_posts")
        .select("id, title, published, auto_generated, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

      const { data: settings } = await supabase
        .from("app_settings")
        .select("ads_enabled, adsense_client, adsterra_key, affiliate_enabled, last_blog_generation")
        .eq("id", 1)
        .maybeSingle();

      return new Response(JSON.stringify({
        totalVisits,
        uniqueVisitors: uniqueSessions,
        byPage,
        byCountry,
        byDevice,
        byHour,
        blogs: blogs || [],
        settings: settings || {},
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /admin-api?action=update-post — edit a blog post
    if (req.method === "POST" && action === "update-post") {
      const body = await req.json();
      const { id, ...updates } = body;
      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return new Response(JSON.stringify({ post: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /admin-api?action=delete-post — delete a blog post
    if (req.method === "POST" && action === "delete-post") {
      const body = await req.json();
      const { id } = body;
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /admin-api?action=update-settings — update monetization settings
    if (req.method === "POST" && action === "update-settings") {
      const body = await req.json();
      const { ads_enabled, adsense_client, adsterra_key, affiliate_enabled, admin_passcode } = body;
      const updates: Record<string, unknown> = {};
      if (typeof ads_enabled === "boolean") updates.ads_enabled = ads_enabled;
      if (typeof adsense_client === "string") updates.adsense_client = adsense_client;
      if (typeof adsterra_key === "string") updates.adsterra_key = adsterra_key;
      if (typeof affiliate_enabled === "boolean") updates.affiliate_enabled = affiliate_enabled;
      if (typeof admin_passcode === "string" && admin_passcode.length > 0) updates.admin_passcode = admin_passcode;

      const { data, error } = await supabase
        .from("app_settings")
        .update(updates)
        .eq("id", 1)
        .select()
        .maybeSingle();
      if (error) throw error;
      return new Response(JSON.stringify({ settings: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /admin-api?action=generate-blogs — manually trigger blog generation
    if (req.method === "POST" && action === "generate-blogs") {
      const now = new Date().toISOString();
      const seed = Math.floor(Date.now() / 1000);
      const TOPICS = ["AI trend velocity", "viral gaming breakout", "crypto market shift", "e-commerce product surge", "entertainment viral moment"];
      const CATS = ["AI", "Gaming", "Finance", "E-Commerce", "Entertainment"];

      const newPosts = Array.from({ length: 2 }, (_, i) => {
        const topic = TOPICS[(seed + i) % TOPICS.length];
        const cat = CATS[(seed + i) % CATS.length];
        const title = `${topic}: Real-Time Trend Analysis ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
        return {
          id: `auto-manual-${seed}-${i}`,
          title,
          excerpt: `${topic} is surging in search interest. Here is what the trend data reveals and how to act on it.`,
          body: `${topic} has emerged as a high-confidence trending signal on Trends Now. The growth velocity exceeds 150 percent over the past 24 hours, with related queries showing deep user intent.\n\nThis trend presents a significant opportunity for content creators and marketers. The predictive engine estimates 12 to 18 hours remain before peak interest, meaning there is still time to capture early mover advantage.\n\nUse the platform's filters to drill into specific regions and categories. Export the data as CSV for your team, generate a creator script, and publish within the window for maximum reach.`,
          category: cat,
          tags: ["trends", cat.toLowerCase(), "real-time", "analysis"],
          read_time: 3,
          published: true,
          auto_generated: true,
          trend_source: topic,
          created_at: now,
        };
      });

      const { error } = await supabase.from("blog_posts").insert(newPosts);
      await supabase.from("app_settings").update({ last_blog_generation: now }).eq("id", 1);
      if (error) throw error;

      return new Response(JSON.stringify({ message: "Generated 2 blog posts", posts: newPosts.map((p) => p.id) }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
