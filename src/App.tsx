import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Compass, Flame, Sparkles, HelpCircle, 
  Search, RefreshCw, Filter, ArrowUpRight, FileText, Clock, 
  Globe, MapPin, Video, Settings, Lock, User, DollarSign, PlayCircle, Layers, CheckCircle2, Megaphone, Share2, Copy, Bell, Send
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('Past 24 hours');
  const [category, setCategory] = useState('All Categories');
  const [selectedLanguage, setSelectedLanguage] = useState('Haryanvi / Hindi (Desi Mix)');
  const [scriptDuration, setScriptDuration] = useState('60 seconds (Shorts/Reels)');
  const [selectedTrendForScript, setSelectedTrendForScript] = useState('GPT-5 release date & architecture leaks');
  
  const [isShowingAdBreak, setIsShowingAdBreak] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notificationSubscribed, setNotificationSubscribed] = useState(false);

  // Hidden URL Admin Access: Unlocks strictly via ?admin=true
  const [isUserAdmin, setIsUserAdmin] = useState(() => localStorage.getItem('trends_is_admin') === 'true');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsUserAdmin(true);
      localStorage.setItem('trends_is_admin', 'true');
    }
  }, []);

  const [autoBlogStatus, setAutoBlogStatus] = useState(true);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Strategy');

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
    { id: 10, title: 'Semantic Search Algorithms and Entity-Based Optimization in 2026', excerpt: 'Moving beyond exact-match keywords to context-driven semantic topical authority.', date: 'October 15, 2026', readTime: '6 min read', category: 'SEO' }
  ]);

  const masterTrends = [
    { id: 1, title: 'GPT-5 release date & architecture leaks', category: 'TECH & AI', volume: '3.5M search volume', growth: '+325%', time: '3h ago', source: 'Global Intelligence Network', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['GPT-5 release', 'OpenAI leaks', 'next-gen AI architecture', 'AGI timeline'] },
    { id: 2, title: 'Gemini Ultra 2 deep-dive benchmark analysis', category: 'TECH & AI', volume: '1.5M search volume', growth: '+30%', time: '14h ago', source: 'AI Research Wire', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Gemini Ultra 2', 'multimodal benchmarks', 'Google AI updates'] },
    { id: 3, title: 'M4 MacBook Pro performance & thermals review', category: 'TECH & AI', volume: '1.5M search volume', growth: '+40%', time: '1d ago', source: 'Hardware Pulse', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['M4 MacBook Sirsa', 'Apple store Begu Road', 'laptop prices Haryana'] },
    { id: 4, title: 'Helldivers 3 official announcement rumors', category: 'GAMING', volume: '1.9M search volume', growth: '+297%', time: '11h ago', source: 'Gaming Syndicate', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Helldivers 3 leak', 'Arrowhead studios', 'PS5 Pro gaming'] },
    { id: 5, title: 'Valorant mobile beta rollout expansion', category: 'GAMING', volume: '1.1M search volume', growth: '+12%', time: '16h ago', source: 'Esports Radar', country: 'India', region: 'Punjab', city: 'Chandigarh', rankingKeywords: ['Valorant mobile India', 'beta testing Tricity', 'esports tournaments'] },
    { id: 6, title: 'Temu global IPO market speculation', category: 'BUSINESS', volume: '2.4M search volume', growth: '+21%', time: '15h ago', source: 'Fintech Daily', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Temu stock IPO', 'e-commerce valuation', 'supply chain trends'] },
    { id: 7, title: 'Solana $CREATOR token staking mechanics', category: 'CRYPTO & WEB3', volume: '980K search volume', growth: '+185%', time: '2h ago', source: 'BlockWire Global', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Creator token Solana', 'Web3 video monetization', 'crypto staking APY'] },
    { id: 8, title: 'AI Video Generation Tools & Sora 2 API release', category: 'TECH & AI', volume: '4.2M search volume', growth: '+410%', time: '1h ago', source: 'Neural Feed', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Sora 2 API', 'cinematic AI generation', 'text to video tools'] },
    { id: 9, title: 'PMEGP Subsidy Loan Scheme for Handicraft MSMEs', category: 'BUSINESS', volume: '450K search volume', growth: '+95%', time: '4h ago', source: 'Govt Portal Wire', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['PMEGP loan Sirsa', 'MSME subsidy Haryana', 'handicraft funding'] },
    { id: 10, title: 'Ashwagandha & Medicinal Herb Farming Profitability', category: 'AGRICULTURE', volume: '320K search volume', growth: '+64%', time: '6h ago', source: 'AgriTech India', country: 'India', region: 'Haryana', city: 'Dhingtania', rankingKeywords: ['Ashwagandha farming Haryana', 'medicinal crop profit', 'organic farming Sirsa'] }
  ];

  const upcomingTrends = [
    { id: 101, title: 'Quantum computing chip breakthrough in commercial batteries', category: 'TECH & AI', expectedVelocity: 'Very High (+450%)', launchWindow: 'Next 48 hours', source: 'Predictive Neural Engine' },
    { id: 102, title: 'Next-gen solar skin efficiency milestone', category: 'ENERGY & TECH', expectedVelocity: 'High (+280%)', launchWindow: 'This Week', source: 'Predictive Neural Engine' }
  ];

  const filteredTrends = masterTrends.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query) ||
      item.region.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      item.rankingKeywords.some(kw => kw.toLowerCase().includes(query));

    const matchesCategory = category === 'All Categories' || item.category.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleTriggerScriptGeneration = () => {
    setIsShowingAdBreak(true);
    setAdCountdown(5);

    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsShowingAdBreak(false);
          executeScriptGeneration();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const executeScriptGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (selectedLanguage.includes('Haryanvi')) {
        setGeneratedScript(`🔥 Haryanvi / Desi Viral Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"Ram Ram bhaiyo! Yo dekh lo, ${selectedTrendForScript} pe poore area mein bhaukaal mach raha hai, sunlo dhyan te!"\n\n[0:05 - 0:30] BODY:\n- Search velocity upar ja ri hai (${filteredTrends[0]?.growth || '+325%'}).\n- Lokka mein iski jabardast charcha hai.\n- Agar aapne abhi tak action nahi liya, toh samajh lo mauka hath se gaya!\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Video ne like karke channel ne subscribe kar lo, aur share kar do saare yaar-beliyan ke gail!"`);
      } else if (selectedLanguage.includes('Hindi')) {
        setGeneratedScript(`🔥 Hindi Viral Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"Dosto, kya aapko pata hai ki ${selectedTrendForScript} ke baare mein Google par aag ki tarah kya search ho raha hai?"\n\n[0:05 - 0:30] BODY:\n- Sirf kuch ghante mein search volume mein ${filteredTrends[0]?.growth || '+325%'} ka massive jump aaya hai.\n- Experts ka kehna hai ki yeh trend aane wale dino mein sabse bada game-changer banne wala hai.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Apne vichar comments mein bataiye, Trends Now ko subscribe kijiye aur is video ko apne doston ke sath share karein!"`);
      } else {
        setGeneratedScript(`🔥 Global English Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"You won't believe what just dropped regarding ${selectedTrendForScript}! Everything changes today..."\n\n[0:05 - 0:30] BODY:\n- Massive search velocity spikes reaching ${filteredTrends[0]?.growth || '+325%'} in real-time.\n- Unpacking the core implications for digital creators and industry leaders.\n- Why top analysts are tracking this exact query right now.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Drop your thoughts below, subscribe to Trends Now for live intelligence, and share this with your network!"`);
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied successfully to clipboard!`);
  };

  const handleWhatsAppShare = (title: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`🔥 Check out this viral trend on Trends Now: "${title}" - https://trendsnow.site`)}`;
    window.open(url, '_blank');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      
      {/* MONETIZATION AD BREAK OVERLAY */}
      {isShowingAdBreak && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto text-white animate-pulse">
              <Megaphone className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 font-semibold uppercase">
                Sponsored Ad Break (AdSense CPM Revenue)
              </span>
              <h3 className="text-2xl font-bold text-white mt-3">Generating Your Viral Script...</h3>
              <p className="text-sm text-slate-400 mt-1">Please wait {adCountdown} seconds while our AI neural engine compiles trending keywords.</p>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${(5 - adCountdown) * 20}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Trends Now
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">Micro-to-Global</span>
            </h1>
            <p className="text-xs text-slate-400">Real-Time Search Intelligence & Keyword Ranking</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type any city (Sirsa), state (Haryana), country, or keyword..." 
            className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5" /> AdSense Active
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all"
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
            <button onClick={() => setActiveTab('trending')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'trending' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Flame className="w-4 h-4" /> Trending Now ({filteredTrends.length})
            </button>
            <button onClick={() => setActiveTab('upcoming')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'upcoming' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <TrendingUp className="w-4 h-4" /> Upcoming Trends
            </button>
            <button onClick={() => setActiveTab('explore')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'explore' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Compass className="w-4 h-4" /> Explore (City to Global)
            </button>
            <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'blogs' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <FileText className="w-4 h-4" /> Blogs & Insights ({blogPosts.length})
            </button>
            <button onClick={() => setActiveTab('studio')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'studio' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Sparkles className="w-4 h-4" /> Creator Studio / Hub
            </button>
            
            {/* ADMIN DASHBOARD LINK: Appears ONLY when logged in via ?admin=true */}
            {isUserAdmin && (
              <button onClick={() => setActiveTab('admin')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
                <Settings className="w-4 h-4" /> Admin Dashboard
              </button>
            )}

            <button onClick={() => setActiveTab('faq')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'faq' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <HelpCircle className="w-4 h-4" /> FAQ
            </button>
          </nav>

          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-3">
            <button onClick={() => { setNotificationSubscribed(true); alert('Notifications enabled successfully!'); }} className="w-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 py-2 rounded-xl font-semibold">
              {notificationSubscribed ? 'Notifications Active' : 'Allow Notifications'}
            </button>

            {isUserAdmin && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <p className="text-emerald-400 font-semibold">⚡ Admin Active</p>
                <button 
                  onClick={() => {
                    setIsUserAdmin(false);
                    localStorage.removeItem('trends_is_admin');
                    setActiveTab('trending');
                    alert('Admin session locked.');
                  }} 
                  className="w-full bg-slate-800 text-slate-300 py-1.5 rounded-lg"
                >
                  Lock Admin
                </button>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto space-y-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-400 font-bold text-xs uppercase border border-cyan-500/30">Sponsored Ad</div>
              <div>
                <h4 className="text-sm font-bold text-white">Smart Homes Tricity - Commercial & Residential Real Estate</h4>
                <p className="text-xs text-slate-400">Promote your properties across Sirsa and Tricity with high-converting buyer leads.</p>
              </div>
            </div>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="bg-cyan-500 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs">Learn More</a>
          </div>

          {activeTab === 'trending' && (
            <div className="grid grid-cols-3 gap-6">
              {filteredTrends.map((item) => (
                <div key={item.id} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">{item.category}</span>
                      <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">{item.growth}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-100 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{item.volume} • {item.time}</p>
                    <div className="flex items-center gap-2 text-xs text-cyan-300/80 mb-3">
                      <MapPin className="w-3 h-3 text-cyan-400" /> Location: {item.city}, {item.region} ({item.country})
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.rankingKeywords.map((kw, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">#{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    <button onClick={() => { setSelectedTrendForScript(item.title); setActiveTab('studio'); }} className="w-full text-cyan-400 text-xs font-semibold text-right">Create Script &rarr;</button>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/40">
                      <button onClick={() => handleCopyText(`https://trendsnow.site/?trend=${encodeURIComponent(item.title)}`, 'Link')} className="flex-1 bg-slate-950 text-slate-300 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 border border-slate-800"><Copy className="w-3 h-3" /> Copy Link</button>
                      <button onClick={() => handleWhatsAppShare(item.title)} className="flex-1 bg-emerald-500/10 text-emerald-400 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 border border-emerald-500/20"><Share2 className="w-3 h-3" /> WhatsApp</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="space-y-6 max-w-4xl bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Creator Studio / Creator Hub (Multi-Language)</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select Trend Topic</label>
                  <select 
                    value={selectedTrendForScript}
                    onChange={(e) => setSelectedTrendForScript(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                  >
                    {masterTrends.map(t => (
                      <option key={t.id} value={t.title}>{t.title} ({t.city})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Script Language</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                  >
                    <option>Haryanvi / Hindi (Desi Mix)</option>
                    <option>Pure Hindi (Formal)</option>
                    <option>Global English</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Script Duration</label>
                  <select 
                    value={scriptDuration}
                    onChange={(e) => setScriptDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200"
                  >
                    <option>60 seconds (Shorts/Reels)</option>
                    <option>3 minutes (YouTube Deep Dive)</option>
                    <option>10 minutes (Full Documentary/Review)</option>
                  </select>
                </div>
              </div>

              <button onClick={handleTriggerScriptGeneration} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md">
                Generate Script & Social Media Hook
              </button>

              {generatedScript && (
                <div className="mt-6 p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Generated Output ({selectedLanguage})</h4>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCopyText(generatedScript, 'Script')} className="bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-800"><Copy className="w-3 h-3" /> Copy Script</button>
                      <button onClick={() => handleWhatsAppShare(selectedTrendForScript)} className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border border-emerald-500/20"><Share2 className="w-3 h-3" /> Share WhatsApp</button>
                    </div>
                  </div>
                  <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono">{generatedScript}</pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && isUserAdmin && (
            <div className="space-y-6 max-w-4xl bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-1">World-Class Admin & Monetization Monitoring</h2>
              <p className="text-sm text-slate-400">Logged in as Admin ({ADMIN_EMAIL}). Monitor ad impressions, CPM earnings, and automated publishing.</p>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400 mb-1">Estimated Ad Revenue (Today)</p>
                  <h3 className="text-2xl font-bold text-emerald-400">$48.50 USD</h3>
                  <p className="text-[10px] text-slate-500 mt-1">12,450 Ad Impressions (CPM $3.90)</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400 mb-1">Active Ad Units</p>
                  <h3 className="text-2xl font-bold text-cyan-400">3 Placements</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Banner, Sponsored Feed, Video Interstitial</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400 mb-1">Indexed Keywords & Cities</p>
                  <h3 className="text-2xl font-bold text-amber-400">120+ Micro-Regions</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Sirsa, Chandigarh, Global feeds active</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Publish Custom Blog Instantly</h3>
                <form onSubmit={handleAddCustomBlog} className="space-y-3">
                  <input 
                    type="text" 
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    placeholder="Enter SEO blog title..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200"
                  />
                  <button type="submit" className="bg-cyan-500 text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-xs">
                    Publish & Sync to Sitemap
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-white mb-0">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-white mb-1">How often is trend data updated?</h4>
                  <p className="text-xs text-slate-400">Data is refreshed continuously in real-time through automated search intelligence feeds.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-800 bg-slate-900/40 py-4 px-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 Trends Now. All rights reserved. Micro-to-Global Search Intelligence.</p>
      </footer>
    </div>
  );
}
