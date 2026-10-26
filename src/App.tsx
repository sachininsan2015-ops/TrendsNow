import React, { useState } from 'react';
import { Search, TrendingUp, Flame, Clock, Unlock, LayoutDashboard, Sparkles, X, ArrowRight, PlusCircle } from 'lucide-react';

const INFINITE_MASTER_TRENDS = Array.from({ length: 150 }, (_, i) => {
  const categories = ['Technology', 'Finance', 'Entertainment', 'Global News'];
  const cities = ['Sirsa', 'Delhi', 'Mumbai', 'Bengaluru', 'Chandigarh', 'Global'];
  const keywords = ['ai', 'crypto', 'stocks', 'cinema', 'economy', 'gaming', 'tech', 'startup', 'innovation', 'reels', 'growth', 'infra'];
  
  return {
    id: `trend-node-${i + 1}`,
    title: `Real-Time Search Ecosystem Peak #${i + 1}: ${categories[i % 4]} & Viral Intelligence Surge`,
    category: categories[i % 4],
    search_volume: `${(Math.random() * 9 + 0.5).toFixed(1)}M searches`,
    growth: `+${Math.floor(Math.random() * 600 + 50)}%`,
    city: cities[i % cities.length],
    country: i % 6 === 5 ? 'Global' : 'India',
    ranking_keywords: [keywords[i % keywords.length], keywords[(i + 4) % keywords.length], 'trend2026', 'viral'],
    created_at: new Date(Date.now() - (i * 3600000 * 2.5)).toISOString()
  };
});

const INFINITE_MASTER_BLOGS = Array.from({ length: 45 }, (_, i) => ({
  id: `blog-node-${i + 1}`,
  title: `Autonomous Editorial Intelligence Report #${i + 1}: Scaling Real-Time Search Ecosystems`,
  slug: `autonomous-report-${i + 1}`,
  excerpt: `Comprehensive deep dive into micro-to-global search analytics, algorithmic publishing, and high-frequency trend tracking across digital platforms.`,
  content: `Autonomous intelligence systems are completely reshaping how digital trends are captured, analyzed, and published worldwide without human intervention. In 2026, real-time search intelligence engines leverage advanced neural architectures to aggregate viral sentiment, predict breakout search queries, and autonomously generate deep editorial reports within seconds. Daily publications ensure continuous audience engagement across multiple digital verticals, optimizing search rankings and programmatic traffic distribution seamlessly.`,
  category: ['Technology', 'Finance', 'Entertainment', 'Global News'][i % 4],
  read_time: `${Math.floor(Math.random() * 4 + 3)} min read`,
  created_at: new Date(Date.now() - (i * 3600000 * 8)).toISOString()
}));

export function App() {
  const [trends] = useState(INFINITE_MASTER_TRENDS);
  const [blogs, setBlogs] = useState(INFINITE_MASTER_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeframe, setTimeframe] = useState('All');
  const [activeTab, setActiveTab] = useState('portal');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technology');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePublishBlog = (e) => {
    e.preventDefault();
    if (!newTitle || !newExcerpt) return;
    const newEntry = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newExcerpt,
      content: newContent || newExcerpt,
      category: newCategory,
      read_time: '4 min read',
      created_at: new Date().toISOString()
    };

    setBlogs([newEntry, ...blogs]);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setActiveTab('portal');
    alert('Autonomous Report Published Successfully via Creator Studio!');
  };

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = !searchQuery || 
      (trend.title && trend.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trend.ranking_keywords && Array.isArray(trend.ranking_keywords) && trend.ranking_keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'All' || (trend.category && trend.category.toLowerCase() === selectedCategory.toLowerCase());
    
    let matchesTimeframe = true;
    if (timeframe !== 'All' && trend.created_at) {
      const diffHours = Math.abs(Date.now() - new Date(trend.created_at).getTime()) / 36e5;
      if (timeframe === 'Past 24 hours' && diffHours > 24) matchesTimeframe = false;
      if (timeframe === 'Past 7 days' && diffHours > 24 * 7) matchesTimeframe = false;
      if (timeframe === 'Past 30 days' && diffHours > 24 * 30) matchesTimeframe = false;
    }

    return matchesSearch && matchesCategory && matchesTimeframe;
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
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/25">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                TrendsNow<span className="text-rose-500">.site</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Micro-to-Global Real-Time Search Intelligence Ecosystem</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab(activeTab === 'portal' ? 'creator' : 'portal')}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{activeTab === 'portal' ? 'Creator Studio' : 'Live Portal'}</span>
            </button>

            <span className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
              <Unlock className="w-3.5 h-3.5" />
              <span>Admin Unlocked</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'creator' ? (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">Autonomous Creator Studio</h2>
                <p className="text-xs text-slate-400 mt-1">Publish unlimited daily reports and live editorial insights instantly.</p>
              </div>
              <PlusCircle className="w-8 h-8 text-indigo-400" />
            </div>

            <form onSubmit={handlePublishBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter viral headline..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Global News">Global News</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Excerpt / Summary</label>
                <textarea
                  required
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Short description for card display..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detailed breakdown for full reader modal..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-rose-600 hover:opacity-90 text-white font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  Publish Report Instantly (Zero Limits)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="space-y-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search unlimited trends, keywords (#tags)..."
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
                  <span>Micro-to-Global Live Search Intelligence ({filteredTrends.length} Active Trends)</span>
                </h3>
              </div>

              {filteredTrends.length === 0 ? (
                <div className="py-16 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
                  <p className="text-slate-300 text-sm font-semibold">No trends found matching your filter criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[700px] overflow-y-auto pr-2">
                  {filteredTrends.map((trend) => (
                    <div key={trend.id || trend.title} className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-4 transition-all shadow-xl group">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-lg">
                          {trend.category || 'General'}
                        </span>
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          {trend.growth || '+200%'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors leading-snug">
                          {trend.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1.5">
                          Volume: <strong className="text-slate-200">{trend.search_volume || '2.5M searches'}</strong> • {trend.city || 'Sirsa'}, {trend.country || 'India'}
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
                  <span>Autonomous Editorial Intelligence ({filteredBlogs.length} Reports Published)</span>
                </h3>
              </div>

              {filteredBlogs.length === 0 ? (
                <div className="py-12 text-center bg-slate-900/30 border border-slate-800/80 rounded-2xl">
                  <p className="text-slate-400 text-sm">No editorial reports found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
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
                          <span>{blog.read_time || '4 min read'}</span>
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
          </>
        )}
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
                  {selectedBlog.category}
                </span>
                <span className="text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedBlog.read_time}</span>
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
              <p className="whitespace-pre-wrap leading-relaxed">
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
        <p>© 2026 TrendsNow.site • Micro-to-Global Real-Time Search Intelligence & Autonomous Ecosystem</p>
      </footer>
    </div>
  );
}

export default App;
