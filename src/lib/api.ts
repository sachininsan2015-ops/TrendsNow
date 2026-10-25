import { supabase } from '@/lib/supabase';
import type { BlogPost, AdminSettings, VisitorAnalytics } from '@/types';

const EDGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    title: p.title as string,
    excerpt: p.excerpt as string,
    body: p.body as string,
    category: p.category as string,
    tags: (p.tags as string[]) || [],
    readTime: p.read_time as number,
    date: (p.created_at as string).slice(0, 10),
    published: p.published as boolean,
    auto_generated: p.auto_generated as boolean,
  }));
}

export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    category: data.category,
    tags: data.tags || [],
    readTime: data.read_time,
    date: (data.created_at || '').slice(0, 10),
    published: data.published,
    auto_generated: data.auto_generated,
  };
}

export async function trackVisitor(page: string): Promise<void> {
  const sessionId = getOrCreateSessionId();
  const device = detectDevice();
  const referrer = document.referrer || 'direct';
  const country = detectCountry();
  try {
    await fetch(`${EDGE_BASE}/visitor-track`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ session_id: sessionId, page, country, referrer, device }),
    });
  } catch {
    // silent fail — analytics should never break the app
  }
}

export async function verifyAdminPasscode(passcode: string): Promise<{ valid: boolean; settings?: AdminSettings }> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=verify`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ passcode }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { valid: false };
  }
  const data = await res.json();
  return data;
}

export async function fetchAnalytics(hours = 24): Promise<VisitorAnalytics> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=analytics&hours=${hours}`, {
    headers: HEADERS,
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function updateBlogPost(id: string, updates: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=update-post`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ id, ...updates }),
  });
  if (!res.ok) throw new Error('Failed to update post');
}

export async function deleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=delete-post`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete post');
}

export async function updateAdminSettings(updates: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=update-settings`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update settings');
}

export async function triggerBlogGeneration(): Promise<void> {
  const res = await fetch(`${EDGE_BASE}/admin-api?action=generate-blogs`, {
    method: 'POST',
    headers: HEADERS,
  });
  if (!res.ok) throw new Error('Failed to generate blogs');
}

function getOrCreateSessionId(): string {
  const KEY = 'tn_session';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|iphone|android/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectCountry(): string {
  const lang = navigator.language || '';
  if (lang.includes('-')) return lang.split('-')[1]?.toUpperCase() || 'Unknown';
  return 'Unknown';
}
