import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { AdminSettings } from '@/types';

export function useSettings() {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [affiliateEnabled, setAffiliateEnabled] = useState(true);
  const [adsenseClient, setAdsenseClient] = useState<string | null>(null);
  const [adsterraKey, setAdsterraKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase
          .from('app_settings')
          .select('ads_enabled, adsense_client, adsterra_key, affiliate_enabled')
          .eq('id', 1)
          .maybeSingle();
        if (mounted && data) {
          setAdsEnabled(data.ads_enabled);
          setAffiliateEnabled(data.affiliate_enabled);
          setAdsenseClient(data.adsense_client);
          setAdsterraKey(data.adsterra_key);
        }
      } catch {
        // defaults are fine
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { adsEnabled, affiliateEnabled, adsenseClient, adsterraKey, loading };
}

export type UseSettings = ReturnType<typeof useSettings>;
