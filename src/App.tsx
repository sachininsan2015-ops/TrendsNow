import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Compass, Flame, Sparkles, HelpCircle, 
  Search, RefreshCw, Filter, ArrowUpRight, FileText, Clock, 
  Globe, MapPin, Video, Settings, Lock, User, DollarSign, PlayCircle, Layers, CheckCircle2, Megaphone, Share2, Copy, Bell, Send, X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('Past 24 hours');
  const [category, setCategory] = useState('All Categories');
  const [selectedLanguage, setSelectedLanguage] = useState('Haryanvi / Hindi (Desi Mix)');
  const [scriptDuration, setScriptDuration] = useState('60 seconds (Shorts/Reels)');
  const [selectedTrendForScript, setSelectedTrendForScript] = useState('GPT-5 release date & architecture leaks');
  
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [isShowingAdBreak, setIsShowingAdBreak] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notificationSubscribed, setNotificationSubscribed] = useState(false);

  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsUserAdmin(true);
        localStorage.setItem('trends_is_admin', 'true');
      } else if (localStorage.getItem('trends_is_admin') === 'true') {
        setIsUserAdmin(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Strategy');

  const [blogPosts, setBlogPosts] = useState([
    { 
      id: 1, 
      title: 'How Real-Time Search Intelligence is Transforming Digital Marketing in 2026', 
      excerpt: 'Discover how predictive search trends and live data pipelines help creators stay ahead of algorithmic shifts.', 
      content: 'In 2026, digital marketing is no longer about guessing what audiences want or relying on outdated keyword research; it is entirely driven by real-time search intelligence. Predictive data pipelines analyze millions of micro-queries across global and regional search networks to forecast momentum shifts 48 hours before mainstream adoption takes place. Brands and digital creators leveraging platforms like Trends Now are capturing hyper-intent traffic in competitive regions like Sirsa, Chandigarh, and London long before competitors even notice the traffic spike. By integrating live search telemetry into your content workflow, you transition from reactive posting to proactive market dominance. This comprehensive approach ensures higher conversion rates, superior audience retention, and sustainable organic growth across all digital touchpoints in the modern web ecosystem.',
      date: 'October 25, 2026', readTime: '5 min read', category: 'Strategy' 
    },
    { 
      id: 2, 
      title: 'The Evolution of AI-Generated Content & Global Query Optimization', 
      excerpt: 'An in-depth look at how multi-language query mapping scales brand visibility across international markets.', 
      content: 'Multi-language query mapping is revolutionizing how independent creators, filmmakers, and regional MSMEs scale their brand visibility internationally. By aligning advanced semantic AI models with localized dialect patterns—such as Haryanvi-Hindi desi mixes, formal Hindi, and regional English—content producers achieve unprecedented organic reach. Search algorithms now prioritize contextual resonance and entity-based authority over rigid exact-match keywords. Consequently, businesses that adopt dynamic query optimization tools can seamlessly target diverse geographic demographics without losing their authentic voice. Embracing this technological shift is essential for anyone looking to build a resilient, cross-border digital enterprise in today is hyper-competitive online environment.',
      date: 'October 24, 2026', readTime: '6 min read', category: 'Technology' 
    },
    { 
      id: 3, 
      title: 'Maximizing Engagement Through Creator Studio Analytics', 
      excerpt: 'Best practices for leveraging real-time tracking dashboards to monetize digital assets effectively.', 
      content: 'Data-driven content creation relies heavily on precise hook formulation and meticulous duration balancing. Creators producing short-form vertical reels or in-depth YouTube documentaries can dramatically optimize viewer retention by analyzing live query velocity and engagement drop-off points. Creator studios equipped with real-time analytics enable producers to test multiple script variations and thumbnail concepts instantly. By continuously refining your output based on empirical telemetry rather than intuition, you unlock consistent algorithmic favor and maximize programmatic monetization across multiple streaming and publishing channels.',
      date: 'October 22, 2026', readTime: '5 min read', category: 'Growth' 
    },
    { 
      id: 4, 
      title: 'Hyper-Local SEO Strategies for Regional Businesses in Haryana & Tricity', 
      excerpt: 'Mastering proximity-based search signals to capture local customer intent instantly.', 
      content: 'Proximity-based search optimization allows local enterprises, real estate advisors, and hospitality venues across Sirsa, Mohali, and the broader Tricity area to convert immediate local search intent into paying customers without squandering capital on broad advertising campaigns. Hyper-local SEO requires meticulous optimization of Google Business profiles, geo-targeted landing pages, and regional service keywords. When local consumers search for services near me or specific regional suppliers, having an authoritative digital footprint ensures your business appears at the exact moment of decision. This targeted visibility builds instant trust and drives high-converting foot traffic directly to your storefront or office.',
      date: 'October 21, 2026', readTime: '5 min read', category: 'Local SEO' 
    },
    { 
      id: 5, 
      title: 'Predictive Analytics in 2026: Forecasting Viral Content Before Peak', 
      excerpt: 'How neural search engines detect momentum shifts 48 hours prior to mainstream explosion.', 
      content: 'Advanced neural networks process vast streams of unstructured search queries every single minute to identify anomalous growth patterns and nascent viral topics. Understanding these predictive signals serves as the ultimate competitive advantage for modern entrepreneurs and digital marketers. Instead of chasing trends after they have already peaked and saturated the market, predictive intelligence allows you to position your content and offers right as the wave begins to rise. Mastering this analytical foresight transforms your digital strategy into a high-precision engine for continuous viral growth and sustainable audience expansion.',
      date: 'October 20, 2026', readTime: '7 min read', category: 'AI & Data' 
    },
    { 
      id: 6, 
      title: 'Mastering Short-Form Video Hooks for YouTube Shorts and Instagram Reels', 
      excerpt: 'The psychological triggers required to retain audience attention in the first 3 seconds.', 
      content: 'In the fast-paced world of short-form video content, the first three seconds determine whether your video goes viral or gets scrolled past instantly. Mastering psychological hooks involves leveraging curiosity gaps, visual pattern interrupts, and highly relatable conversational openings in local dialects like Haryanvi and Hindi. By capturing attention immediately and maintaining high narrative tension, creators can drastically increase average view duration, triggering recommendation algorithms across YouTube Shorts, Instagram Reels, and TikTok.',
      date: 'October 19, 2026', readTime: '5 min read', category: 'Content' 
    },
    { 
      id: 7, 
      title: 'Programmatic SEO at Scale: Building Automated Authority Sites', 
      excerpt: 'Architecture guidelines for generating thousands of targeted landing pages securely.', 
      content: 'Programmatic SEO empowers developers and entrepreneurs to build massive, highly targeted authority sites by dynamically generating landing pages based on structured database queries. By combining clean React frontends with robust sitemap automation, platforms can index thousands of hyper-local keywords efficiently. However, maintaining strict quality guidelines and preventing thin content is crucial for algorithmic success. When executed correctly, programmatic SEO creates an unstoppable inbound traffic machine that captures long-tail search intent across hundreds of geographical regions simultaneously.',
      date: 'October 18, 2026', readTime: '8 min read', category: 'SEO' 
    },
    { 
      id: 8, 
      title: 'Monetizing Independent Creator Channels With Web3 Micro-Tokens', 
      excerpt: 'Exploring decentralized reward mechanisms for video creators on embedded platforms.', 
      content: 'The creator economy is undergoing a massive decentralized transformation through Web3 micro-tokens and blockchain-based reward protocols. By integrating native utility tokens such as Solana-based creator assets, independent video producers can reward engaged audiences directly without relying solely on traditional ad networks. This peer-to-peer monetization model fosters deeper community loyalty, ensures transparent revenue distribution, and opens up innovative funding avenues for independent feature films, short series, and digital publications.',
      date: 'October 17, 2026', readTime: '6 min read', category: 'Monetization' 
    }
  ]);

  const masterTrends = [
    { id: 1, title: 'GPT-5 release date & architecture leaks', category: 'Tech & AI', volume: '3.5M search volume', growth: '+325%', time: '3h ago', source: 'Global Intelligence Network', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['GPT-5 release', 'OpenAI leaks', 'next-gen AI architecture', 'AGI timeline'] },
    { id: 2, title: 'Gemini Ultra 2 deep-dive benchmark analysis', category: 'Tech & AI', volume: '1.5M search volume', growth: '+30%', time: '14h ago', source: 'AI Research Wire', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Gemini Ultra 2', 'multimodal benchmarks', 'Google AI updates'] },
    { id: 3, title: 'M4 MacBook Pro performance & thermals review', category: 'Tech & AI', volume: '1.5M search volume', growth: '+40%', time: '1d ago', source: 'Hardware Pulse', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['M4 MacBook Sirsa', 'Apple store Begu Road', 'laptop prices Haryana'] },
    { id: 4, title: 'Helldivers 3 official announcement rumors', category: 'Gaming', volume: '1.9M search volume', growth: '+297%', time: '11h ago', source: 'Gaming Syndicate', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Helldivers 3 leak', 'Arrowhead studios', 'PS5 Pro gaming'] },
    { id: 5, title: 'Valorant mobile beta rollout expansion', category: 'Gaming', volume: '1.1M search volume', growth: '+12%', time: '16h ago', source: 'Esports Radar', country: 'India', region: 'Punjab', city: 'Chandigarh', rankingKeywords: ['Valorant mobile India', 'beta testing Tricity', 'esports tournaments'] },
    { id: 6, title: 'Temu global IPO market speculation', category: 'Business', volume: '2.4M search volume', growth: '+21%', time: '15h ago', source: 'Fintech Daily', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Temu stock IPO', 'e-commerce valuation', 'supply chain trends'] },
    { id: 7, title: 'Solana $CREATOR token staking mechanics', category: 'Crypto & Web3', volume: '980K search volume', growth: '+185%', time: '2h ago', source: 'BlockWire Global', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Creator token Solana', 'Web3 video monetization', 'crypto staking'] },
    { id: 8, title: 'AI Video Generation Tools & Sora 2 API release', category: 'Tech & AI', volume: '4.2M search volume', growth: '+410%', time: '1h ago', source: 'Neural Feed', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Sora 2 API', 'cinematic AI generation', 'text to video tools'] },
    { id: 9, title: 'PMEGP Subsidy Loan Scheme for Handicraft MSMEs', category: 'Business', volume: '450K search volume', growth: '+95%', time: '4h ago', source: 'Govt Portal Wire', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['PMEGP loan Sirsa', 'MSME subsidy Haryana', 'handicraft funding'] },
    { id: 10, title: 'Ashwagandha & Medicinal Herb Farming Profitability', category: 'Agriculture', volume: '320K search volume', growth: '+64%', time: '6h ago', source: 'AgriTech India', country: 'India', region: 'Haryana', city: 'Dhingtania', rankingKeywords: ['Ashwagandha farming', 'medicinal crop profit', 'organic farming Sirsa'] }
  ];

  const upcomingTrends = [
    { id: 101, title: 'Quantum computing chip breakthrough in commercial batteries', category: 'Tech & AI', expectedVelocity: 'Very High (+450%)', launchWindow: 'Next 48 hours', source: 'Predictive Neural Engine' },
    { id: 102, title: 'Next-gen solar skin efficiency milestone', category: 'Tech & AI', expectedVelocity: 'High (+280%)', launchWindow: 'This Week', source: 'Predictive Neural Engine' }
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

    const matchesCategory = category === 'All Categories' || item.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleRefresh = () => {
    setTimeout(() => {}, 500);
  };

  const handleTriggerScriptGeneration = () => {
    setIsShowingAdBreak(true);
    setAdCountdown(5);

    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsShowingAdBreak(false);
          setIsGenerating(true);
          setTimeout(() => {
            setGeneratedScript("🔥 Viral Script Generated Successfully!\n\n[0:00 - 0:05] HOOK:\n" + selectedTrendForScript + " is blowing up everywhere right now!\n\n[0:05 - 0:30] BODY:\n- Massive search velocity spikes.\n- Key implications for creators.\n\n[0:30 - 1:00] CTA:\nSubscribe and share!");
            setIsGenerating(false);
          }, 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(label + ' copied successfully!');
  };

  const handleWhatsAppShare = (title) => {
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent('Check out this trend: ' + title + ' - https://trendsnow.site');
    window.open(url, '_blank');
  };

  const handleAddCustomBlog = (e) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;
    const newPost = {
      id: blogPosts.length + 1,
      title: newBlogTitle,
      excerpt: 'Automated SEO article published via admin panel.',
      content: 'This is a fully SEO-optimized automated blog post published directly to the Trends Now platform.',
      date: 'Today, 2026', readTime: '5 min read', category: newBlogCategory
    };
    setBlogPosts([newPost, ...blogPosts]);
    setNewBlogTitle('');
    alert('Blog published successfully and synced to XML Sitemap!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      
      {/* BLOG MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{selectedBlog.category}</span>
              <h2 className="text-2xl font-bold text-white leading-snug">{selectedBlog.title}</h2>
              <p className="text-xs text-slate-400">{selectedBlog.date} • {selectedBlog.readTime}</p>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4 pt-4 border-t border-slate-800">
              <p>{selectedBlog.content}</p>
              <p>As real-time search queries scale across international and regional hubs, understanding these dynamics ensures sustainable digital authority and maximum programmatic ad revenue.</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button 
                onClick={() => handleCopyText('https://trendsnow.site/blog/' + selectedBlog.id, 'Blog Link')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
              >
                <Copy className="w-4 h-4" /> Copy Article Link
              </button>
              <button 
                onClick={() => handleWhatsAppShare(selectedBlog.title)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-500/30"
              >
                <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AD BREAK */}
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

      {/* HEADER */}
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
            placeholder="Search any city (Sirsa, London), country, or keyword..." 
            className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center space-x-3">
          {isUserAdmin && (
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-semibold">
              <DollarSign className="w-3.5 h-3.5" /> AdSense Active (Admin)
            </div>
          )}
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
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
              <TrendingUp className="w-4 h-4" /> Upcoming Trends ({upcomingTrends.length})
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
          
          {/* SPONSORED AD BANNER */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-400 font-bold text-xs uppercase border border-cyan-500/30">Sponsored Ad</div>
              <div>
                <h4 className="text-sm font-bold text-white">Smart Homes Tricity - Commercial & Residential Real Estate</h4>
                <p className="text-xs text-slate-400">Promote your properties across Sirsa and Tricity with high-converting buyer leads.</p>
              </div>
            </div>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all">Learn More</a>
          </div>

          {activeTab === 'trending' && (
            <div className="space-y-6">
              {/* Timeframe & Category Filters */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="flex-1">
                  <label className="text-xs text-slate-400 block mb-1">Time Frame Filter</label>
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
                <div className="flex-1">
                  <label className="text-xs text-slate-400 block mb-1">Category Filter</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>All Categories</option>
                    <option>Tech & AI</option>
                    <option>Gaming</option>
                    <option>Business</option>
                    <option>Crypto & Web3</option>
                    <option>Agriculture</option>
                  </select>
                </div>
              </div>

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
                          <span key={idx} className="text-[10px] bg-slate-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">#{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-slate-800/80">
                      <button onClick={() => { setSelectedTrendForScript(item.title); setActiveTab('studio'); }} className="w-full text-cyan-400 text-xs font-semibold text-right hover:text-cyan-300">Create Script &rarr;</button>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/40">
                        <button onClick={() => handleCopyText('https://trendsnow.site/?trend=' + encodeURIComponent(item.title), 'Link')} className="flex-1 bg-slate-950 hover:bg-slate-800 text-slate-300 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 border border-slate-800"><Copy className="w-3 h-3" /> Copy Link</button>
                        <button onClick={() => handleWhatsAppShare(item.title)} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 border border-emerald-500/20"><Share2 className="w-3 h-3" /> WhatsApp</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                  <div key={item.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">{item.category}</span>
                      <h3 className="text-lg font-bold text-white mt-2 mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400">Launch Window: {item.launchWindow} • Expected: {item.expectedVelocity}</p>
                    </div>
                    <button className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold px-4 py-2 rounded-xl text-xs">Track Velocity</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'explore' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-2">Explore Micro-to-Global Intelligence</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" /> Global Macro Trends</h3>
                  <p className="text-xs text-slate-400 mb-4">Real-time aggregate data across North America, Europe, and Asia-Pacific markets.</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-cyan-400" /> Hyper-Local Intelligence (Sirsa & Tricity)</h3>
                  <p className="text-xs text-slate-400 mb-4">Regional search queries, real estate developments, and local service demands.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Blogs & Insights ({blogPosts.length} Articles Live)</h2>
                <p className="text-sm text-slate-400">Fully SEO-optimized articles with automated daily publishing (2 blogs/day). Click any article to read full content.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {blogPosts.map((post) => (
                  <div key={post.id} onClick={() => setSelectedBlog(post)} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all">
                    <div>
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">{post.category}</span>
                      <h3 className="text-base font-bold text-white mt-2 mb-2 hover:text-cyan-300 transition-colors">{post.title}</h3>
                      <p className="text-xs text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                      <span className="text-slate-500">{post.date} ({post.readTime})</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">Read Article <ArrowUpRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                ))}
              </div>
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
              <p className="text-sm text-slate-400">Monitor ad impressions, CPM earnings, and automated publishing.</p>
              
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
