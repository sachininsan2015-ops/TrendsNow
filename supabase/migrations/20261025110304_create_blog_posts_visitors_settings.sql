/*
# Trends Now — Blog Posts, Visitor Analytics, and App Settings

## Overview
Creates three tables to power the automated SEO blog system, real-time visitor
tracking for the admin dashboard, and global monetization/admin configuration.

## New Tables

### 1. blog_posts
Stores auto-generated and manually-created SEO blog articles.
- `id` (text, primary key) — slug-style identifier (e.g. "ai-trends-2026")
- `title` (text, not null) — article headline
- `excerpt` (text, not null) — short summary for list views and meta description
- `body` (text, not null) — full article content (markdown-style plain text)
- `category` (text, not null) — e.g. "Creators", "Marketing", "AI", "Tech"
- `tags` (text[], default '{}') — SEO keyword tags
- `read_time` (integer, default 4) — estimated read time in minutes
- `published` (boolean, default true) — whether the post is publicly visible
- `auto_generated` (boolean, default false) — true if created by the generator system
- `trend_source` (text) — the trending topic this article was generated from (nullable)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 2. visitors
Records each visitor session for the admin analytics dashboard.
- `id` (uuid, primary key)
- `session_id` (text, not null) — anonymous browser session identifier
- `page` (text, not null) — which view/page the visitor landed on
- `country` (text) — detected country (nullable)
- `referrer` (text) — referring URL or "direct" (nullable)
- `device` (text) — "desktop" | "mobile" | "tablet" (nullable)
- `created_at` (timestamptz, default now())

### 3. app_settings
Single-row configuration table for admin passcode and monetization toggles.
- `id` (integer, primary key, default 1) — always row 1
- `admin_passcode` (text, not null) — passcode to access the admin dashboard
- `ads_enabled` (boolean, default true) — master toggle for ad display
- `adsense_client` (text) — Google AdSense client ID (nullable, e.g. "ca-pub-XXXX")
- `adsterra_key` (text) — Adsterra banner key (nullable)
- `affiliate_enabled` (boolean, default true) — toggle for affiliate/sponsored widgets
- `last_blog_generation` (timestamptz) — when the blog generator last ran (nullable)
- `updated_at` (timestamptz, default now())

## Security

### blog_posts
- RLS enabled. Public can read published posts (anon + authenticated SELECT
  where published = true). Only the service role (edge functions) can insert,
  update, delete — granted to service_role directly, no anon writes.

### visitors
- RLS enabled. Public can INSERT their own visit (anon + authenticated INSERT,
  no SELECT — visitors cannot read analytics). Service role has full access.

### app_settings
- RLS enabled. No anon or authenticated access at all. Only service_role
  can read and update settings. The admin-verify edge function uses the
  service role key to check the passcode server-side.

## Notes
1. The admin passcode is stored in plain text in app_settings. The admin-verify
   edge function checks it server-side using the service role key, so the
   passcode never reaches the client. The default passcode is "trends-admin-2026"
   and should be changed from the admin panel after first login.
2. A trigger updates `updated_at` automatically on blog_posts and app_settings.
3. visitor inserts are intentionally open (no ownership check) because they are
   anonymous analytics events — the INSERT-only policy prevents reading.
*/

-- ===== blog_posts =====
CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  body text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  read_time integer DEFAULT 4,
  published boolean DEFAULT true,
  auto_generated boolean DEFAULT false,
  trend_source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON blog_posts TO service_role;

DROP POLICY IF EXISTS "public_read_published_posts" ON blog_posts;
CREATE POLICY "public_read_published_posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

DROP POLICY IF EXISTS "service_manage_posts" ON blog_posts;
CREATE POLICY "service_manage_posts"
  ON blog_posts FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_update_posts" ON blog_posts;
CREATE POLICY "service_update_posts"
  ON blog_posts FOR UPDATE
  TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_delete_posts" ON blog_posts;
CREATE POLICY "service_delete_posts"
  ON blog_posts FOR DELETE
  TO service_role
  USING (true);

-- ===== visitors =====
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page text NOT NULL,
  country text,
  referrer text,
  device text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON visitors TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON visitors TO service_role;

DROP POLICY IF EXISTS "anon_insert_visit" ON visitors;
CREATE POLICY "anon_insert_visit"
  ON visitors FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_read_visits" ON visitors;
CREATE POLICY "service_read_visits"
  ON visitors FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "service_delete_visits" ON visitors;
CREATE POLICY "service_delete_visits"
  ON visitors FOR DELETE
  TO service_role
  USING (true);

-- ===== app_settings =====
CREATE TABLE IF NOT EXISTS app_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  admin_passcode text NOT NULL DEFAULT 'trends-admin-2026',
  ads_enabled boolean DEFAULT true,
  adsense_client text,
  adsterra_key text,
  affiliate_enabled boolean DEFAULT true,
  last_blog_generation timestamptz,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON app_settings TO service_role;

-- Only service_role can read settings (no anon/authenticated policies)

-- ===== updated_at triggers =====
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS app_settings_updated_at ON app_settings;
CREATE TRIGGER app_settings_updated_at
  BEFORE UPDATE ON app_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===== indexes =====
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id);

-- ===== seed initial settings row =====
INSERT INTO app_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;
