import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Compass, Flame, Sparkles, HelpCircle, 
  Search, RefreshCw, Filter, ArrowUpRight, FileText, Clock, 
  Globe, MapPin, Video, Settings, Lock, User, DollarSign, PlayCircle, Layers, CheckCircle2, Megaphone, Share2, Copy, Bell, Send, X, Menu
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      content: 'In 2026, digital marketing is no longer about guessing what audiences want or relying on outdated keyword research; it is entirely driven by real-time search intelligence and trending now keywords. Predictive data pipelines analyze millions of micro-queries across global and regional search networks to forecast momentum shifts 48 hours before mainstream adoption takes place. Brands and digital creators leveraging platforms like Trends Now are capturing hyper-intent traffic in competitive regions like Sirsa, Chandigarh, and London long before competitors even notice the traffic spike. By integrating live search telemetry into your content workflow, you transition from reactive posting to proactive market dominance. This comprehensive approach ensures higher conversion rates, superior audience retention, and sustainable organic growth across all digital touchpoints in the modern web ecosystem.',
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* BLOG MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{selectedBlog.category}</span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">{selectedBlog.title}</h2>
              <p className="text-xs text-slate-400">{selectedBlog.date} • {selectedBlog.readTime}</p>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4 pt-4 border-t border-slate-800">
              <p>{selectedBlog.content}</p>
              <p>As real-time search queries scale across international and regional hubs, understanding these dynamics ensures sustainable digital authority and maximum programmatic ad revenue.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800">
              <button 
                onClick={() => handleCopyText('https://trendsnow.site/blog/' + selectedBlog.id, 'Blog Link')}
                className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
              >
                <Copy className="w-4 h-4" /> Copy Article Link
              </button>
              <button 
                onClick={() => handleWhatsAppShare(selectedBlog.title)}
                className="w-full md:w-auto bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-500/30"
              >
                <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AD BREAK */}
      {isShowingAdBreak && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto text-white animate-pulse">
              <Megaphone className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 font-semibold uppercase">
                Sponsored Ad Break (AdSense CPM Revenue)
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-3">Generating Your Viral Script...</h3>
              <p className="text-sm text-slate-400 mt-1">Please wait {adCountdown} seconds while our AI neural engine compiles trending keywords.</p>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${(5 - adCountdown) * 20}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Trends Now
                <span className="text-[10px] md:text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">Micro-to-Global</span>
              </h1>
              <p className="text-[11px] text-slate-400">Real-Time Search Intelligence & Keyword Ranking</p>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-slate-800 p-2 rounded-xl text-slate-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full md:flex-1 md:max-w-xl md:mx-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Trending Now keywords, city, or country..." 
            className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center justify-end w-full md:w-auto space-x-3">
          {isUserAdmin && (
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-semibold">
              <DollarSign className="w-3.5 h-3.5" /> AdSense Active (Admin)
            </div>
          )}
          <button 
            onClick={handleRefresh}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* SIDEBAR */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 border-r border-slate-800 p-6 flex flex-col justify-between bg-slate-900/30`}>
          <nav className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Navigation</p>
            <button onClick={() => { setActiveTab('trending'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'trending' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
              <Flame className="w-4 h-4" /> Trending Now ({filteredTrends.length})
            </button>
            <button onClick={() => { setActive
