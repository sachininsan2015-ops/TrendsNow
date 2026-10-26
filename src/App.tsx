import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Flame, Clock, Unlock, Database, Sparkles, X, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';

export function App() {
  const [trends, setTrends] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeframe, setTimeframe] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    async function fetchLiveSupabaseData() {
      setLoading(true);
      try {
        const { data: liveTrends, error: trendErr } = await supabase
          .from('live_trends')
          .select('*')
          .order('created_at', { ascending: false });

        const { data: liveBlogs, error: blogErr } = await supabase
          .from('automated_blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (trendErr) console.error('Supabase Trends Error:', trendErr);
        if (blogErr) console.error('Supabase Blogs Error:', blogErr);

        if (liveTrends) setTrends(liveTrends);
        if (liveBlogs) setBlogs(liveBlogs);
      } catch (err) {
        console.error('Fetch exception:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveSupabaseData();
  }, []);

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = !searchQuery || 
      (trend.title && trend.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trend.ranking_keywords && Array.isArray(trend.ranking_keywords) && trend.ranking_keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'All' || (trend.category && trend.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchQuery || 
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());
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
            <span className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold shadow-sm">
              <Unlock className="w-3.5 h-3.5" />
              <span>Live Engine Active</span>
            </span>
            <div className="hidden sm:flex items-center space-x-2 text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-500/20">
              <Database className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Supabase DB Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search live trends, keywords (#tags)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500 shadow-inner transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {['All', 'Past 24 hours', 'Past 7 days', 'Past 30 days'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    timeframe === tf
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
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
              <span>Supabase Connected</span>
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Fetching live data from Supabase...</p>
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
              <p className="text-slate-300 text-sm font-semibold">No live trends found in database. Add rows to `live_trends` table.</p>
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
                      Volume: <strong className="text-slate-200">{trend.search_volume || 'High'}</strong> • {trend.city || 'Global'}, {trend.country || 'World'}
                    </p>
                  </div>

                  {trend.ranking_keywords && Array.isArray(trend.ranking_keywords) && trend.ranking_keywords.length > 0 && (
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
              <span>Autonomous Editorial Intelligence ({filteredBlogs.length})</span>
            </h3>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading articles...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
              <p className="text-slate-400 text-sm">No editorial reports in database. Add rows to `automated_blogs` table.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog) => (
                <article 
                  key={blog.id || blog.slug} 
                  onClick={() => setSelectedBlog(blog)}
                  className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 space-y-4 transition-all shadow-xl cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="text-indigo-400 font-bold px-2.5 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20">{blog.category || 'Technology'}</span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.read_time || '5 min read'}</span>
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors leading-snug">{blog.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-indigo-400 font-bold">
                    <span className="flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Autonomous Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold rounded-lg">
                  {selectedBlog.category || 'Technology'}
                </span>
                <span className="text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedBlog.read_time || '4 min read'}</span>
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {selectedBlog.title}
              </h2>
            </div>

            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-800 pt-4">
              <p className="font-semibold text-indigo-200 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                {selectedBlog.excerpt}
              </p>
              <p>
                {selectedBlog.content || selectedBlog.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-800 bg-slate-900/40 py-8 mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 TrendsNow.site • Real-Time Search Intelligence & Autonomous Publishing Ecosystem</p>
      </footer>
    </div>
  );
}

export default App;
