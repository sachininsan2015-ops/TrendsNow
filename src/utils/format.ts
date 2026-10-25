export function formatVolume(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return String(v);
}

export function formatGrowth(g: number): string {
  return `+${g}%`;
}

export function timeAgo(hours: number): string {
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function classForGrowth(g: number): string {
  if (g >= 200) return 'text-neon';
  if (g >= 100) return 'text-electric';
  if (g >= 50) return 'text-primary';
  return 'text-muted';
}
