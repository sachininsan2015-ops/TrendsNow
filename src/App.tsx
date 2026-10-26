import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Flame, Clock, Lock, Unlock, Database } from 'lucide-react';
import { supabase } from './supabaseClient';

export function App() {
  const [trends, setTrends] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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
        const { data: liveTrendsData } = await supabase.from('live_trends').select('*').order('created_at', { ascending: false });
        const { data: automatedBlogsData } = await supabase.from('automated_blogs').select('*').order('created_at', { ascending: false });
        
        if (liveTrendsData) setTrends(liveTrendsData);
        if (automatedBlogsData) setBlogs(automatedBlogsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = trend.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || trend.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-rose-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                TrendsNow<span className="text-rose-500">.site</span>
              </h1>
              <p className="text-xs text-slate-400">Real-Time Search Intelligence & AI Blogs</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <span className="flex items-center space-x-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium">
                <Unlock className="w-3.5 h-3.5" />
                <span>Admin Unlocked</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Public Mode</span>
              </span>
            )}
            <div className="flex items-center space-x-2 text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/20">
              <Database className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Supabase Connected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search live trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500 shadow-inner"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', 'Technology', 'Entertainment', 'Finance', 'Global News'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center space-x-2 text-white">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Live Search Intelligence ({filteredTrends.length})</span>
            </h3>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time DB Sync Active</span>
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 animate-pulse">
              Loading live intelligence from Supabase database...
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">No live trends found in database. Add rows in Supabase table.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrends.map((trend) => (
                <div key={trend.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold rounded-lg">
                      {trend.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {trend.growth}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{trend.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">Volume: {trend.search_volume} • {trend.city}, {trend.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center space-x-2 text-white">
              <Database className="w-5 h-5 text-rose-400" />
              <span>Automated Daily SEO Articles ({blogs.length})</span>
            </h3>
          </div>
          {blogs.length === 0 ? (
            <div className="py-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">No automated articles published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <span className="text-xs text-indigo-400 font-semibold">{blog.category}</span>
                  <h4 className="text-xl font-bold text-white">{blog.title}</h4>
                  <p className="text-sm text-slate-300">{blog.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
