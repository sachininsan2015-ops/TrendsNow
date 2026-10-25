import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Compass, Flame, Sparkles, HelpCircle, 
  Search, RefreshCw, Filter, ArrowUpRight, FileText, Clock, 
  Shield, Globe, MapPin, Video, Plus, CheckCircle2, Layers, Database, Settings
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

  // Admin automation state
  const [autoBlogStatus, setAutoBlogStatus] = useState(true);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Strategy');

  // Initial 30 SEO Optimized Blog Posts
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'How Real-Time Search Intelligence is Transforming Digital Marketing in 2026', excerpt: 'Discover how predictive search trends and live data pipelines help creators stay ahead of algorithmic shifts.', date: 'October 25, 2026', readTime: '4 min read', category: 'Strategy' },
    { id: 2, title: 'The Evolution of AI-Generated Content & Global Query Optimization', excerpt: 'An in-depth look at how multi-language query mapping scales brand visibility across international markets.', date: 'October 24, 2026', readTime: '6 min read', category: 'Technology' },
    { id: 3, title: 'Maximizing Engagement Through Creator Studio Analytics', excerpt: 'Best practices for leveraging real-time tracking dashboards to monetize digital assets effectively.', date: 'October 22, 2026', readTime: '5 min read', category: 'Growth' },
    { id: 4, title: 'Hyper-Local SEO Strategies for Regional Businesses in Haryana & Tricity', excerpt: 'Mastering proximity-based search signals to capture local customer intent instantly.', date: 'October 21, 2026', readTime: '5 min read', category: 'Local SEO' },
    { id: 5, title: 'Predictive Analytics in 2026: Forecasting Viral Content Before Peak', excerpt: 'How neural search engines detect momentum shifts 48 hours prior to mainstream explosion.', date: 'October 20, 2026', readTime: '7 min read', category: 'AI & Data' },
    { id: 6, title: 'Mastering Short-Form Video Hooks for YouTube Shorts and Instagram Reels', excerpt: 'The psychological triggers required to retain audience attention in the first 3 seconds.', date: 'October 19, 2026', readTime: '4 min read', category: 'Content' },
    { id: 7, title: 'Programmatic SEO at Scale: Building Automated Authority Sites', excerpt: 'Architecture guidelines for generating thousands of targeted landing pages securely.', date: 'October 18, 2026', readTime: '8 min read', category: 'SEO' },
    { id: 8, title: 'Monetizing Independent Creator Channels With Web3 Micro-Tokens', excerpt: 'Exploring decentralized reward mechanisms for video creators on embedded platforms.', date: 'October 17, 2026', readTime: '6 min read', category: 'Monetization' },
    { id: 9, title: 'Optimizing Core Web Vitals for Next-Generation React Single Page Apps', excerpt: 'Performance tuning techniques to achieve 100/100 Lighthouse scores effortlessly.', date: 'October 16, 2026', readTime: '5 min read', category: 'Development' },
    { id: 10, title: 'Semantic Search Algorithms and Entity-Based Optimization in 2026', excerpt: 'Moving beyond exact-match keywords to context-driven semantic topical authority.', date: 'October 15, 2026', readTime: '6 min read', category: 'SEO' },
    { id: 11, title: 'Scaling Automated Social Media Syndication via Make.com and APIs', excerpt: 'Connecting live data feeds to multi-platform publishing pipelines without manual friction.', date: 'October 14, 2026', readTime: '4 min read', category: 'Automation' },
    { id: 12, title: 'The Psychology of Viral Click-Through Rates in Search Snippets', excerpt: 'Crafting meta descriptions and titles that outperform algorithmic competitors.', date: 'October 13, 2026', readTime: '5 min read', category: 'Copywriting' },
    { id: 13, title: 'Enterprise AI Search Infrastructure: What CTOs Need to Know', excerpt: 'Evaluating distributed vector databases and real-time indexing models for high throughput.', date: 'October 12, 2026', readTime: '9 min read', category: 'Enterprise' },
    { id: 14, title: 'Cross-Border E-Commerce SEO: Overcoming Localization Barriers', excerpt: 'Structuring multilingual metadata to capture international buyer intent seamlessly.', date: 'October 11, 2026', readTime: '6 min read', category: 'E-Commerce' },
    { id: 15, title: 'Leveraging ElevenLabs and AI Voice Synthesis in Production Workflows', excerpt: 'Best practices for generating lifelike voiceovers for cinematic storytelling and reels.', date: 'October 10, 2026', readTime: '5 min read', category: 'Media' },
    { id: 16, title: 'Real Estate Digital Marketing: Turning Search Velocity Into Property Leads', excerpt: 'Connecting buyer query spikes directly with CRM lead generation pipelines.', date: 'October 9, 2026', readTime: '6 min read', category: 'Real Estate' },
    { id: 17, title: 'Deep Dive Into GPT-5 Architecture Rumors and Search Implications', excerpt: 'Analyzing how upcoming LLM upgrades will reshape automated content generation.', date: 'October 8, 2026', readTime: '7 min read', category: 'AI & Tech' },
    { id: 18, title: 'Automated XML Sitemap Generation and Dynamic Indexing Protocols', excerpt: 'Ensuring Google and Bing bots crawl fresh content within minutes of publishing.', date: 'October 7, 2026', readTime: '4 min read', category: 'SEO' },
    { id: 19, title: 'Building High-Converting Landing Pages With AI Prototyping Tools', excerpt: 'Rapid iteration workflows using modern design systems and clean component structures.', date: 'October 6, 2026', readTime: '5 min read', category: 'Design' },
    { id: 20, title: 'The Future of Programmatic Advertising in Real-Time Trend Networks', excerpt: 'Maximizing CPM yields through high-intent programmatic keyword placement.', date: 'October 5, 2026', readTime: '6 min read', category: 'Business' },
    { id: 21, title: 'Voice Search Optimization: Capturing Conversational Queries in 2026', excerpt: 'Adapting content strategies for natural language AI assistants and smart speakers.', date: 'October 4, 2026', readTime: '5 min read', category: 'SEO' },
    { id: 22, title: 'Data Privacy and GDPR Compliance in Automated Real-Time Analytics', excerpt: 'Balancing high-performance visitor tracking with strict regulatory compliance standards.', date: 'October 3, 2026', readTime: '6 min read', category: 'Legal & Tech' },
    { id: 23, title: 'Maximizing YouTube Creator Revenue Through Trend-Driven Content Briefs', excerpt: 'How data-backed video concepts consistently achieve higher retention and CTR.', date: 'October 2, 2026', readTime: '5 min read', category: 'Growth' },
    { id: 24, title: 'Advanced Tailwind CSS Design Patterns for Dark-Mode Dashboards', excerpt: 'Creating immersive, high-contrast user interfaces for complex data visualization.', date: 'October 1, 2026', readTime: '5 min read', category: 'Design' },
    { id: 25, title: 'The Role of Backlinks in the Era of Generative AI Search Engines', excerpt: 'Evaluating how authority links persist when search engines synthesize direct answers.', date: 'September 28, 2026', readTime: '7 min read', category: 'SEO' },
    { id: 26, title: 'Scaling Content Operations: How to Publish 2 Automated Blogs Daily', excerpt: 'Workflows and cron automation setups for consistent daily publishing without burnout.', date: 'September 25, 2026', readTime: '6 min read', category: 'Automation' },
    { id: 27, title: 'Measuring Content ROI: Connecting Organic Traffic to Revenue Dashboards', excerpt: 'Attribution models that prove the business impact of long-tail SEO articles.', date: 'September 22, 2026', readTime: '6 min read', category: 'Analytics' },
    { id: 28, title: 'Optimizing Video Metadata for Algorithmic Discovery Across Platforms', excerpt: 'Tagging, descriptions, and transcript indexing best practices for maximum reach.', date: 'September 19, 2026', readTime: '5 min read', category: 'Video' },
    { id: 29, title: 'Securing React Applications Against Client-Side Vulnerabilities', excerpt: 'Essential security headers, input sanitization, and dependency auditing protocols.', date: 'September 16, 2026', readTime: '6 min read', category: 'Security' },
    { id: 30, title: 'The Ultimate Checklist for Launching a Real-Time Intelligence Platform', excerpt: 'From domain configuration to Vercel continuous deployment and automated SEO.', date: 'September 15, 2026', readTime: '8 min read', category: 'Strategy' }
  ]);

  const allTrends = [
    { id: 1, title: 'GPT-5 release date & architecture leaks', category: 'TECH & AI', volume: '2.8M search volume', growth: '+312%', time: '3h ago', source: 'Global Intelligence Network', type: 'Global' },
    { id: 2, title: 'Gemini Ultra 2 deep-dive benchmark analysis', category: 'TECH & AI', volume: '760.0K search volume', growth: '+88%', time: '14h ago', source: 'AI Research Wire', type: 'Global' },
    { id: 3, title: 'M4 MacBook Pro performance & thermals review', category: 'TECH & AI', volume: '430.0K search volume', growth: '+41%', time: '1d ago', source: 'Hardware Pulse', type: 'Local' },
    { id: 4, title: 'Helldivers 3 official announcement rumors', category: 'GAMING', volume: '1.2M search volume', growth: '+167%', time: '11h ago', source: 'Gaming Syndicate', type: 'Global' },
    { id: 5, title: 'Valorant mobile beta rollout expansion', category: 'GAMING', volume: '620.0K search volume', growth: '+78%', time: '16h ago', source: 'Esports Radar', type: 'Local' },
    { id: 6, title: 'Temu global IPO market speculation', category: 'BUSINESS', volume: '1.3M search volume', growth: '+89%', time: '15h ago', source: 'Fintech Daily', type: 'Global' }
  ];

  const upcomingTrends = [
    { id: 101, title: 'Quantum computing chip breakthrough in commercial batteries', category: 'TECH & AI', expectedVelocity: 'Very High (+450%)', launchWindow: 'Next 48 hours', source: 'Predictive Neural Engine' },
    { id: 102, title: 'Next-gen solar skin efficiency milestone', category: 'ENERGY & TECH', expectedVelocity: 'High (+280%)', launchWindow: 'This Week', source: 'Predictive Neural Engine' }
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
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`🔥 Viral Script for: "${selectedTrendForScript}" (${scriptDuration})\n\n[0:00 - 0:05] HOOK:\n"You won't believe what just leaked about ${selectedTrendForScript}! Everything changes today..."\n\n[0:05 - 0:30] BODY:\n- Massive search velocity spikes (+312% in 24 hours).\n- Key implications for creators and digital strategists.\n- Why industry experts are closely monitoring this trend right now.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Drop your thoughts in the comments, subscribe to Trends Now for live intelligence, and share this with a creator!"`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleAddCustomBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;
    const newPost = {
      id: blogPosts.length + 1,
      title: newBlogTitle,
      excerpt: 'Newly published automated SEO article optimized for high-intent search queries.',
      date: 'Today, 2026',
      readTime: '5 min read',
      category: newBlogCategory
    };
    setBlogPosts([newPost, ...blogPosts]);
    setNewBlogTitle('');
    alert('Blog published successfully and added to the automated SEO pipeline!');
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
              Blogs & Insights ({blogPosts.length})
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
              <Settings className="w-4 h-4" />
              World-Class Admin Panel
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
              Automation Active (2 blogs/day)
            </div>
            <p>SEO Pipeline & 30 Starter Articles Live.</p>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'trending' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Filters & Parameters (Time Frame: 1 Hour to 30 Days)
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Time Frame</label>
                    <select 
                      value={timeframe} 
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>Past 1 hour</option>
                      <option>Past 4 hours</option>
                      <option>Past 12 hours</option>
                      <option>Past 24 hours</option>
                      <option>Past 7 days</option>
                      <option>Past 30 days</option>
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
                        <p className="text-xs text-slate-400 mb-4">{item.volume} • {item.time} ({timeframe})</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Blogs & Insights ({blogPosts.length} Articles Live)</h2>
                  <p className="text-sm text-slate-400">Fully SEO-optimized articles with automated daily publishing (2 blogs/day).</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 hover:text-cyan-300 cursor-pointer transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                      <span className="text-slate-500">{post.date}</span>
                      <button className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                        Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">World-Class Admin Panel & SEO Automation</h2>
                <p className="text-sm text-slate-400">Manage automated daily blog generation, XML sitemaps, OpenGraph metadata, and crawler indexing.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400" /> Automated Blogging (2/day)
                  </h3>
                  <p className="text-xs text-slate-400">Configure automated AI blog generation and keyword syndication.</p>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-medium text-slate-300">Daily Cron Pipeline (2 Blogs)</span>
                    <button 
                      onClick={() => setAutoBlogStatus(!autoBlogStatus)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${autoBlogStatus ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}
                    >
                      {autoBlogStatus ? 'ACTIVE' : 'PAUSED'}
                    </button>
                  </div>

                  <form onSubmit={handleAddCustomBlog} className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-slate-300 block">Publish Custom Blog Instantly</label>
                    <input 
                      type="text" 
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                      placeholder="Enter SEO blog title..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2 rounded-xl text-xs transition-colors">
                      Publish & Sync to Sitemap
                    </button>
                  </form>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-1">XML Sitemap Status</h4>
                    <p className="text-xs text-slate-400 mb-3">All {blogPosts.length} SEO articles auto-indexed for Google & Bing.</p>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold">Fully Indexed ({blogPosts.length} URLs)</span>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-1">Meta OpenGraph & Schema Markup</h4>
                    <p className="text-xs text-slate-400 mb-3">Structured JSON-LD schema injected for high search CTR.</p>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold">Active & Optimized</span>
                  </div>
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
