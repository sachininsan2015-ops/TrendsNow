import React, { useState } from 'react';
import { 
  TrendingUp, Compass, Flame, Sparkles, HelpCircle, 
  Search, RefreshCw, Filter, ArrowUpRight, FileText, Clock, 
  Shield, Globe, MapPin, Download, Share2, Layers, Database, CheckCircle2, Video
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('Past 24 hours');
  const [category, setCategory] = useState('All Categories');
  const [country, setCountry] = useState('Worldwide');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scriptDuration, setScriptDuration] = useState('60 seconds (Shorts/Reels)');
  const [selectedTrendForScript, setSelectedTrendForScript] = useState('GPT-5 release date & architecture leaks');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const allTrends = [
    {
      id: 1,
      title: 'GPT-5 release date & architecture leaks',
      category: 'TECH & AI',
      volume: '2.8M search volume',
      growth: '+312%',
      time: '3h ago',
      source: 'Global Intelligence Network',
      type: 'Global'
    },
    {
      id: 2,
      title: 'Gemini Ultra 2 deep-dive benchmark analysis',
      category: 'TECH & AI',
      volume: '760.0K search volume',
      growth: '+88%',
      time: '14h ago',
      source: 'AI Research Wire',
      type: 'Global'
    },
    {
      id: 3,
      title: 'M4 MacBook Pro performance & thermals review',
      category: 'TECH & AI',
      volume: '430.0K search volume',
      growth: '+41%',
      time: '1d ago',
      source: 'Hardware Pulse',
      type: 'Local'
    },
    {
      id: 4,
      title: 'Helldivers 3 official announcement rumors',
      category: 'GAMING',
      volume: '1.2M search volume',
      growth: '+167%',
      time: '11h ago',
      source: 'Gaming Syndicate',
      type: 'Global'
    },
    {
      id: 5,
      title: 'Valorant mobile beta rollout expansion',
      category: 'GAMING',
      volume: '620.0K search volume',
      growth: '+78%',
      time: '16h ago',
      source: 'Esports Radar',
      type: 'Local'
    },
    {
      id: 6,
      title: 'Temu global IPO market speculation',
      category: 'BUSINESS',
      volume: '1.3M search volume',
      growth: '+89%',
      time: '15h ago',
      source: 'Fintech Daily',
      type: 'Global'
    }
  ];

  const upcomingTrends = [
    {
      id: 101,
      title: 'Quantum computing chip breakthrough in commercial batteries',
      category: 'TECH & AI',
      expectedVelocity: 'Very High (+450%)',
      launchWindow: 'Next 48 hours',
      source: 'Predictive Neural Engine'
    },
    {
      id: 102,
      title: 'Next-gen solar skin efficiency milestone',
      category: 'ENERGY & TECH',
      expectedVelocity: 'High (+280%)',
      launchWindow: 'This Week',
      source: 'Predictive Neural Engine'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'How Real-Time Search Intelligence is Transforming Digital Marketing in 2026',
      excerpt: 'Discover how predictive search trends and live data pipelines help creators stay ahead of algorithmic shifts.',
      date: 'October 25, 2026',
      readTime: '4 min read',
      category: 'Strategy'
    },
    {
      id: 2,
      title: 'The Evolution of AI-Generated Content & Global Query Optimization',
      excerpt: 'An in-depth look at how multi-language query mapping scales brand visibility across international markets.',
      date: 'October 24, 2026',
      readTime: '6 min read',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Maximizing Engagement Through Creator Studio Analytics',
      excerpt: 'Best practices for leveraging real-time tracking dashboards to monetize digital assets effectively.',
      date: 'October 22, 2026',
      readTime: '5 min read',
      category: 'Growth'
    }
  ];

  const filteredTrends = allTrends.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All Categories' || item.category.toLowerCase().includes(category.toLowerCase());
    const matchesCountry = country === 'Worldwide' || (country === 'India' ? item.type === 'Local' : true);
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`🔥 Viral Script for: "${selectedTrendForScript}" (${scriptDuration})\n\n[0:00 - 0:05] HOOK:\n"You won't believe what just leaked about ${selectedTrendForScript}! Everything changes today..."\n\n[0:05 - 0:30] BODY:\n- Massive search velocity spikes (+312% in 24 hours).\n- Key implications for creators and digital strategists.\n- Why industry experts are closely monitoring this trend right now.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Drop your thoughts in the comments, subscribe to Trends Now for live intelligence, and share this with a creator!"`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Trends Now
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">Live Intelligence</span>
            </h1>
            <p className="text-xs text-slate-400">Global & Local Real-Time Trend Tracking</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trends, topics, queries..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            className={`flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 ${isRefreshing ? 'opacity-75' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-800 p-6 flex flex-col justify-between bg-slate-900/30">
          <nav className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Navigation</p>
            
            <button 
              onClick={() => setActiveTab('trending')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'trending' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <Flame className="w-4 h-4" />
              Trending Now
            </button>

            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'upcoming' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <TrendingUp className="w-4 h-4" />
              Upcoming Trends
            </button>

            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'explore' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <Compass className="w-4 h-4" />
              Explore (Local/Global)
            </button>

            <button 
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'blogs' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <FileText className="w-4 h-4" />
              Blogs & Insights
            </button>

            <button 
              onClick={() => setActiveTab('studio')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'studio' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <Sparkles className="w-4 h-4" />
              Creator Studio / Hub
            </button>

            <button 
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <Shield className="w-4 h-4" />
              Admin & SEO Features
            </button>

            <button 
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'faq' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </button>
          </nav>

          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              System Online (v2.6)
            </div>
            <p>All features, SEO pipelines & creator tools active.</p>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'trending' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Filters & Parameters (Local to Global)
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Time Frame</label>
                    <select 
                      value={timeframe} 
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>Past 24 hours</option>
                      <option>Past 7 days</option>
                      <option>Past 30 days</option>
                      <option>Real-Time Velocity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>All Categories</option>
                      <option>Tech & AI</option>
                      <option>Gaming</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Scope (Local / Global)</label>
                    <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>Worldwide</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>Local (Sirsa / Tricity)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={handleRefresh}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2 rounded-xl text-sm transition-colors shadow-md"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              {filteredTrends.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                  <Search className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-60" />
                  <p className="text-base font-semibold text-slate-200">No matching trends found</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your time frame or category filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {filteredTrends.map((item) => (
                    <div key={item.id} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-cyan-400 tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                            {item.category}
                          </span>
                          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                            {item.growth}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 mb-4">{item.volume} • {item.time}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">{item.source}</span>
                        <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold">
                          View Details <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Upcoming Trends & Predictive Signals</h2>
                <p className="text-sm text-slate-400">AI-powered predictive forecasting before queries hit peak mainstream search volume.</p>
              </div>

              <div className="space-y-4">
                {upcomingTrends.map((item) => (
                  <div key={item.id} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                          {item.category}
                        </span>
                        <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded">
                          Expected: {item.expectedVelocity}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400">Launch Window: {item.launchWindow} • Source: {item.source}</p>
                    </div>
                    <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-semibold px-4 py-2 rounded-xl text-xs transition-all">
                      Track Velocity
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'explore' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-2">Explore Local to Global Intelligence</h2>
              <p className="text-sm text-slate-400">Compare regional velocity metrics against global search trends.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" /> Global Macro Trends
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Real-time aggregate data across North America, Europe, and Asia-Pacific markets.</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span>GPT-5 Architecture Leaks</span>
                      <span className="text-emerald-400">+312%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span>Temu Global IPO Speculation</span>
                      <span className="text-emerald-400">+89%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" /> Local Intelligence (Regional)
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Hyper-local search queries, service demands, and regional trending signals.</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span>M4 MacBook Pro Performance</span>
                      <span className="text-emerald-400">+41%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                      <span>Valorant Mobile Beta</span>
                      <span className="text-emerald-400">+78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Blogs & Insights (SEO Optimized)</h2>
                <p className="text-sm text-slate-400">Expert analysis, trend forecasts, and high-ranking articles from the Trends Now editorial team.</p>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime} • {post.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 hover:text-cyan-300 cursor-pointer transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">
                      {post.excerpt}
                    </p>
                    <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                      Read Full Article & SEO Metadata <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Creator Studio / Creator Hub</h2>
                <p className="text-sm text-slate-400">Generate viral video scripts, hooks, and content briefs tailored precisely by duration.</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Select Trend Topic</label>
                    <select 
                      value={selectedTrendForScript}
                      onChange={(e) => setSelectedTrendForScript(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>GPT-5 release date & architecture leaks</option>
                      <option>Gemini Ultra 2 deep-dive benchmark analysis</option>
                      <option>M4 MacBook Pro performance & thermals review</option>
                      <option>Helldivers 3 official announcement rumors</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">Select Script Duration</label>
                    <select 
                      value={scriptDuration}
                      onChange={(e) => setScriptDuration(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>60 seconds (Shorts/Reels)</option>
                      <option>3 minutes (YouTube Deep Dive)</option>
                      <option>10 minutes (Full Documentary/Review)</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGenerateScript}
                  disabled={isGenerating}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  {isGenerating ? 'Generating Neural Script...' : 'Generate Script & Social Media Hook'}
                </button>

                {generatedScript && (
                  <div className="mt-6 p-5 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Generated Output</h4>
                    <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono">{generatedScript}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Admin & SEO Features</h2>
                <p className="text-sm text-slate-400">Manage sitemaps, meta tags, OpenGraph previews, and real-time query caching.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-white mb-1">XML Sitemap Status</h4>
                  <p className="text-xs text-slate-400 mb-3">Auto-updated hourly for Google & Bing indexing.</p>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold">Active & Indexed</span>
                </div>
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-white mb-1">Meta OpenGraph Tags</h4>
                  <p className="text-xs text-slate-400 mb-3">Social sharing cards optimized for Twitter & LinkedIn.</p>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold">Configured</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-white mb-1">How often is trend data updated?</h4>
                  <p className="text-xs text-slate-400">Data is refreshed continuously in real-time through automated search intelligence feeds.</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-white mb-1">Can I export trend reports?</h4>
                  <p className="text-xs text-slate-400">Yes, CSV and JSON export options are available directly from the top navigation panel.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
