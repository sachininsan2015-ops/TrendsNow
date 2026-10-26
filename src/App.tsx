import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Flame, Clock, Lock, Unlock, Database, Sparkles } from 'lucide-react';
import { supabase } from './supabaseClient';

export function App() {
  const [trends, setTrends] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeframe, setTimeframe] = useState('Past 24 hours');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
      localStorage.setItem('trendsnow_admin', 'true');
    } else if (localStorage.getItem('trendsnow_admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const { data: trendsData } = await supabase.from('live_trends').select('*').order('created_at', { ascending: false });
        const { data: blogsData } = await supabase.from('automated_blogs').select('*').order('created_at', { ascending: false });
        
        if (trendsData) setTrends(trendsData);
        if (blogsData) setBlogs(blogsData);
      } catch (err) {
        console.error('Database fetch error:', err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = !searchQuery || 
      (trend.title && trend.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trend.ranking_keywords && trend.ranking_keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === 'All' || trend.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-rose-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/25">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                TrendsNow<span className="text-rose-500">.site</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Real-Time Search Intelligence & Autonomous Ecosystem</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAdmin ? (
              <span className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold shadow-sm">
                <Unlock className="w-3.5 h-3.5" />
                <span>Admin Suite Unlocked</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-800/80 text-slate-400 border border-slate-700/50 rounded-full text-xs font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Public Mode</span>
              </span>
            )}
            <div className="hidden sm:flex items-center space-x-2 text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-500/20">
              <Database className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Supabase Live Sync</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 border border-indigo-500/30 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/30 uppercase tracking-wider">
                Enterprise Partner Network
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white">Global Search Intelligence & High-CPM Syndication</h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Empowering real-time programmatic monetization and automated viral news distribution across global nodes.
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 whitespace-nowrap">
              Access API & SDKs
            </button>
          </div>
        </div>

        <div className="space-y-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search viral trends, keywords (#tags)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500 shadow-inner transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {['Past 24 hours', 'Past 7 days', 'Past 30 days'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    timeframe === tf
                      ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pt-2 border-t border-slate-800/60">
            {['All', 'Technology', 'Entertainment', 'Finance', 'Global News'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black flex items-center space-x-2 text-white">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Live Search Intelligence ({filteredTrends.length})</span>
            </h3>
            <span className="text-xs text-slate-400 flex items-center space-x-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time DB Sync Active</span>
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 animate-pulse font-medium">
              Fetching high-frequency intelligence from Supabase nodes...
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl space-y-2">
              <p className="text-slate-300 text-sm font-semibold">No active intelligence found matching criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTrends.map((trend) => (
                <div key={trend.id || trend.title} className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-4 transition-all shadow-xl group">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-lg">
                      {trend.category || 'General'}
                    </span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {trend.growth || '+100%'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {trend.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Search Volume: <strong className="text-slate-200">{trend.search_volume || 'High'}</strong> • {trend.city || 'Global'}, {trend.country || 'World'}
                    </p>
                  </div>

                  {trend.ranking_keywords && trend.ranking_keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                      {trend.ranking_keywords.map((kw, i) => (
                        <span key={i} className="text-[11px] font-medium bg-slate-800/80 text-indigo-300 px-2.5 py-0.5 rounded-md border border-slate-700/50">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black flex items-center space-x-2 text-white">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <span>Autonomous Editorial Intelligence ({blogs.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Published 2x Daily via Cron Engine
            </span>
          </div>

          {blogs.length === 0 ? (
            <div className="py-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
              <p className="text-slate-400 text-sm">No editorial insights published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <article key={blog.id || blog.slug} className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all shadow-xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="text-indigo-400 font-bold px-2.5 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20">{blog.category || 'Technology'}</span>
                    <span>{blog.read_time || '5 min read'}</span>
                  </div>
                  <h4 className="text-xl font-black text-white leading-snug">{blog.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{blog.excerpt}</p>
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Today'}
                    </span>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-1">
                      <span>Read Complete Intelligence Report</span>
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/40 py-8 mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 TrendsNow.site • Real-Time Search Intelligence & Autonomous Publishing Ecosystem</p>
      </footer>
    </div>
  );
}

export default App;
