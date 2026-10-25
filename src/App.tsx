import { useEffect, useMemo, useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/Toaster';
import { TrendDetailPanel } from '@/components/TrendDetailPanel';
import { TrendingView } from '@/views/TrendingView';
import { ExploreView } from '@/views/ExploreView';
import { PredictiveView } from '@/views/PredictiveView';
import { CreatorView } from '@/views/CreatorView';
import { BlogView } from '@/views/BlogView';
import { FaqView } from '@/views/FaqView';
import { SEED_TRENDS } from '@/data/trends';
import type { ViewId } from '@/types';

const VIEW_TITLES: Record<ViewId, string> = {
  trending: 'Trending Now',
  explore: 'Explore',
  predictive: 'Coming Trends',
  creator: 'Creator Studio',
  blog: 'Guides',
  faq: 'FAQ',
};

function Layout() {
  const { view, selectedTrendId, setSelectedTrendId } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedTrend = useMemo(
    () => SEED_TRENDS.find((tr) => tr.id === selectedTrendId) || null,
    [selectedTrendId],
  );

  useEffect(() => {
    const viewTitle = VIEW_TITLES[view];
    document.title = `${viewTitle} — TrendNow`;
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', `${viewTitle} — TrendNow`);
  }, [view]);

  // Programmatic SEO: inject per-view JSON-LD
  useEffect(() => {
    const id = 'view-jsonld';
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'TrendNow',
      url: `https://trendsnow.site/${view}`,
    };
    if (view === 'faq') {
      schema['@type'] = 'FAQPage';
      schema['mainEntity'] = [];
    }
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [view]);

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {view === 'trending' && <TrendingView />}
            {view === 'explore' && <ExploreView />}
            {view === 'predictive' && <PredictiveView />}
            {view === 'creator' && <CreatorView />}
            {view === 'blog' && <BlogView />}
            {view === 'faq' && <FaqView />}
          </div>
        </main>
      </div>
      <Footer />
      <TrendDetailPanel
        trend={selectedTrend}
        onClose={() => setSelectedTrendId(null)}
      />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
