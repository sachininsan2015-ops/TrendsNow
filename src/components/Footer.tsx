import { TrendingUp, Github, Twitter, Linkedin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ViewId } from '@/types';

export function Footer() {
  const { t, setView } = useApp();

  const links: { id: ViewId; key: string }[] = [
    { id: 'trending', key: 'navTrending' },
    { id: 'explore', key: 'navExplore' },
    { id: 'predictive', key: 'navPredictive' },
    { id: 'creator', key: 'navCreator' },
    { id: 'blog', key: 'navBlog' },
    { id: 'faq', key: 'navFaq' },
  ];

  return (
    <footer className="border-t border-app bg-elev mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Trends Now</div>
                <div className="text-xs text-muted">{t('tagline')}</div>
              </div>
            </div>
            <p className="text-sm text-muted max-w-md">
              The world's most advanced real-time trend tracking platform. Discover
              trending searches, compare interest over time, predict viral spikes,
              and generate creator scripts in 30+ languages.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-base hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-base hover:bg-primary/10 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-base hover:bg-primary/10 hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Platform</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setView(l.id)}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {t(l.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>30+ Languages</li>
              <li>Real-Time RSS Feeds</li>
              <li>Programmatic SEO</li>
              <li>Embed Widgets</li>
              <li>CSV / JSON Export</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-app flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span>© 2026 Trends Now — trendsnow.site. All rights reserved.</span>
          <span>Built for creators, marketers & researchers worldwide.</span>
        </div>
      </div>
    </footer>
  );
}
