import type { Trend } from '@/types';

export function exportTrendsCsv(trends: Trend[], filename = 'trendnow-export.csv') {
  const headers = ['Title', 'Category', 'Search Type', 'Country', 'Region', 'City', 'Search Volume', 'Growth %', 'Started Hours Ago', 'Active'];
  const rows = trends.map((t) => [
    escapeCsv(t.title),
    t.category,
    t.searchType,
    t.country,
    escapeCsv(t.region),
    escapeCsv(t.city),
    t.searchVolume,
    t.growthPct,
    t.startedHoursAgo,
    t.active ? 'Yes' : 'No',
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadFile(csv, filename, 'text/csv');
}

export function exportTrendsJson(trends: Trend[], filename = 'trendnow-export.json') {
  downloadFile(JSON.stringify(trends, null, 2), filename, 'application/json');
}

function escapeCsv(val: string | number): string {
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildEmbedCode(trend: Trend): string {
  return `<iframe src="https://trendsnow.site/embed/${trend.id}" width="100%" height="420" frameborder="0" title="Trends Now: ${trend.title}"></iframe>`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function shareUrl(trend: Trend): string {
  return `https://trendsnow.site/trend/${trend.id}`;
}

export function shareToSocial(platform: string, url: string, text: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const map: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };
  return map[platform] || url;
}
