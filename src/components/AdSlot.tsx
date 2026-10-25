import { useMemo } from 'react';
import { Megaphone, TrendingUp } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

type AdSlotProps = {
  placement: 'header' | 'sidebar' | 'in-feed' | 'blog-inline';
  className?: string;
};

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  const { adsEnabled, adsenseClient, adsterraKey, loading } = useSettings();

  const dims = useMemo(() => {
    switch (placement) {
      case 'header': return { w: '728px', h: '90px', label: 'Leaderboard 728×90' };
      case 'sidebar': return { w: '300px', h: '250px', label: 'Medium Rectangle 300×250' };
      case 'in-feed': return { w: '100%', h: '120px', label: 'In-Feed Native' };
      case 'blog-inline': return { w: '100%', h: '250px', label: 'In-Article Responsive' };
    }
  }, [placement]);

  if (loading || !adsEnabled) return null;

  const hasAdsense = adsenseClient && adsenseClient.length > 5;
  const hasAdsterra = adsterraKey && adsterraKey.length > 3;

  if (hasAdsense && placement !== 'in-feed') {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-app bg-card/50 ${className}`} style={{ maxWidth: dims.w, minHeight: dims.h }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: dims.h }}
          data-ad-client={adsenseClient}
          data-ad-slot={placement}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <span className="absolute top-1 right-2 text-[9px] text-muted/50 uppercase tracking-wider">Ad</span>
      </div>
    );
  }

  if (hasAdsterra) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-app bg-card/50 ${className}`} style={{ maxWidth: dims.w, minHeight: dims.h }}>
        <div className="w-full h-full flex items-center justify-center" data-adsterra-key={adsterraKey} data-adsterra-placement={placement} />
        <span className="absolute top-1 right-2 text-[9px] text-muted/50 uppercase tracking-wider">Ad</span>
      </div>
    );
  }

  // Placeholder ad slot — shows a clean sponsored placeholder
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-app bg-gradient-to-br from-card to-base flex items-center justify-center ${className}`}
      style={{ maxWidth: dims.w, minHeight: dims.h }}
    >
      <div className="flex flex-col items-center gap-2 text-muted">
        <Megaphone className="w-5 h-5 opacity-40" />
        <span className="text-[10px] uppercase tracking-wider opacity-50">{dims.label}</span>
        <span className="text-[9px] opacity-30">Sponsored</span>
      </div>
      <span className="absolute top-1 right-2 text-[9px] text-muted/50 uppercase tracking-wider">Ad</span>
    </div>
  );
}

export function AffiliateWidget({ className = '' }: { className?: string }) {
  const { affiliateEnabled, loading } = useSettings();
  if (loading || !affiliateEnabled) return null;

  return (
    <div className={`rounded-xl border border-app bg-card p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wide">Sponsored Pick</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-base hover:bg-base/70 transition-colors cursor-pointer">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">Trend Research Pro</div>
            <div className="text-xs text-muted">Advanced analytics & export</div>
          </div>
          <span className="text-xs text-primary font-medium flex-shrink-0">Try Now</span>
        </div>
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-base hover:bg-base/70 transition-colors cursor-pointer">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">Creator Toolkit</div>
            <div className="text-xs text-muted">Script templates & scheduling</div>
          </div>
          <span className="text-xs text-primary font-medium flex-shrink-0">Learn More</span>
        </div>
      </div>
    </div>
  );
}
