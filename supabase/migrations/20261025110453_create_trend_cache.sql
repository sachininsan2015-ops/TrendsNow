/*
# Trend Cache Table

## Overview
Creates a simple key-value cache table for the trends-api edge function
to store generated trend data and avoid regenerating it on every request.

## New Tables
### trend_cache
- `id` (text, primary key) — cache key (e.g. "latest")
- `data` (jsonb, not null) — the cached trend array
- `updated_at` (timestamptz, default now())

## Security
- RLS enabled. Only service_role can read and write (edge function only).
- No anon or authenticated access.
*/

CREATE TABLE IF NOT EXISTS trend_cache (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trend_cache ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON trend_cache TO service_role;

DROP POLICY IF EXISTS "service_read_cache" ON trend_cache;
CREATE POLICY "service_read_cache"
  ON trend_cache FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "service_write_cache" ON trend_cache;
CREATE POLICY "service_write_cache"
  ON trend_cache FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_update_cache" ON trend_cache;
CREATE POLICY "service_update_cache"
  ON trend_cache FOR UPDATE
  TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_delete_cache" ON trend_cache;
CREATE POLICY "service_delete_cache"
  ON trend_cache FOR DELETE
  TO service_role
  USING (true);
