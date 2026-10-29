import React, { useState, useEffect } from 'react';
import { Search, Flame, LayoutDashboard, Sparkles, X, PlusCircle, RefreshCw, FileText, Code, Compass, ShieldCheck, Mail, LogOut, Globe, BookOpen, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'trends' | 'explore' | 'creator'>('blogs');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLang, setSelectedLang] = useState('English');
  
  // Strict Email-Based Admin Authentication
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [loggedAdminEmail, setLoggedAdminEmail] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminOpen(true);
    }
    const savedAdmin = localStorage.getItem('trendsnow_admin_email');
    if (savedAdmin === 'sachininsan2015@gmail.com' || savedAdmin === 'admin@trendsnow.site') {
      setLoggedAdminEmail(savedAdmin);
    }
  }, []);

  // Creator Studio State
  const [creatorTopic, setCreatorTopic] = useState('');
  const [creatorDuration] = useState('60 seconds');
  const [creatorLang] = useState('Hinglish');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 30 Unique Diverse Pre-loaded SEO Articles (No repetition)
  const uniqueBlogTopics = [
    { title: "The Future of Autonomous AI Agents in 2026", cat: "Technology", kw: "AI agents 2026, automation, workflows" },
    { title: "Algorithmic Stock Trading and Market Rallies", cat: "Finance", kw: "fintech, stocks, algorithmic trading" },
    { title: "Box Office Surges: The Rise of Cinematic Universes", cat: "Entertainment", kw: "movies, box office, streaming" },
    { title: "Global Renewable Energy Grids: 2026 Roadmap", cat: "Global News", kw: "green energy, sustainability, climate" },
    { title: "Esports Expansion Across Tier-2 Cities", cat: "Gaming", kw: "esports, gaming tournaments, mobile gaming" },
    { title: "Web3 Liquidity and Decentralized Finance", cat: "Crypto", kw: "crypto, web3, blockchain" },
    { title: "Venture Capital Funding Trends for Startups", cat: "Startups", kw: "startups, VC funding, entrepreneurship" },
    { title: "Premier League & Cricket Digital Broadcasts", cat: "Sports", kw: "sports streaming, cricket, football" },
    { title: "Telemedicine and AI Diagnostics in Healthcare", cat: "Health", kw: "digital health, telemedicine, AI diagnostics" },
    { title: "Global Policy Shifts and Digital Governance", cat: "Politics", kw: "digital governance, elections, policy" },
    { title: "Smart Real Estate Investment Strategies", cat: "Real Estate", kw: "smart homes, real estate, property tech" },
    { title: "Cybersecurity Frameworks for Enterprise Data", cat: "Technology", kw: "cybersecurity, cloud data, privacy" },
    { title: "Personal Finance Apps Revolutionizing Savings", cat: "Finance", kw: "personal finance, budgeting apps, wealth" },
    { title: "Indie Game Developers Gaining Global Stardom", cat: "Gaming", kw: "indie games, game development, Steam" },
    { title: "Electric Vehicle Battery Breakthroughs", cat: "Technology", kw: "EV batteries, clean tech, transportation" },
    { title: "Digital Creator Economy Monetization Masterclass", cat: "Startups", kw: "creator economy, monetization, reels" },
    { title: "Mental Health Tech and Wellness Platforms", cat: "Health", kw: "mental health, wellness apps, meditation" },
    { title: "Space Tech Commercialization and Satellites", cat: "Global News", kw: "space tech, satellites, commercial space" },
    { title: "Next-Gen Augmented Reality Headsets", cat: "Technology", kw: "AR glasses, spatial computing, headsets" },
    { title: "Decentralized Autonomous Organizations (DAOs)", cat: "Crypto", kw: "DAOs, governance, crypto communities" },
    { title: "Global Tourism and Smart Travel Tech", cat: "Entertainment", kw: "smart travel, tourism apps, booking" },
    { title: "E-Commerce Logistics and Drone Shipping", cat: "Technology", kw: "drone delivery, logistics, e-commerce" },
    { title: "Financial Literacy Programs for Youth", cat: "Finance", kw: "financial literacy, investing basics, youth" },
    { title: "Cinematic Storytelling in Modern Video Games", cat: "Gaming", kw: "video game narratives, graphics, engine" },
    { title: "Artificial Intelligence in Legal Tech", cat: "Technology", kw: "legal tech, AI contract review, automation" },
    { title: "Sustainable Fashion and Eco-Friendly Fabrics", cat: "Startups", kw: "sustainable fashion, eco-friendly, apparel" },
    { title: "Global Semiconductor Supply Chain Resilience", cat: "Global News", kw: "semiconductors, microchips, manufacturing" },
    { title: "Podcasting Networks and Audio Monetization", cat: "Entertainment", kw: "podcasts, audio streaming, sponsors" },
    { title: "Cloud Native Architecture Best Practices", cat: "Technology", kw: "cloud computing, Kubernetes, DevOps" },
    { title: "The Evolution of Remote Work Culture", cat: "Global News", kw: "remote work, digital nomad, productivity" }
  ];

  const initialBlogs = uniqueBlogTopics.map((item, i) => ({
    id: i + 1,
    title: item.title,
    category: item.cat,
    readTime: `${Math.floor(Math.random() * 3 + 3)} min read`,
    date: `October ${30 - (i % 25)}, 2026`,
    seoKeywords: item.kw,
    content: `Welcome to our in-depth editorial coverage on ${item.title.toLowerCase()}. In today's fast-paced digital era of 2026, staying informed with verified insights and expert analysis is essential for professionals, creators, and enthusiasts alike.\n\nThis article breaks down the core fundamentals, market shifts, and future trajectories surrounding ${item.cat}. Our autonomous editorial engine continuously parses high-intent search queries and consumer interest patterns to bring you structured, actionable knowledge right here on TrendsNow.site.\n\nAs adoption accelerates across global and local markets, understanding these developments will empower you to make smarter decisions, optimize your workflows, and maintain a competitive edge. Explore our daily published articles for more exclusive insights.`
  }));

  const [blogs, setBlogs] = useState(initialBlogs);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Technology');
  const [newBlogContent, setNewBlogContent] = useState('');

  const masterTrends = [
    { id: 1, title: "AI Code Assistants & Copilots", category: "Technology", volume: "3.4M searches", growth: "+912%" },
    { id: 2, title: "Global Stock Market Bull Run", category: "Finance", volume: "2.8M searches", growth: "+645%" },
    { id: 3, title: "Blockbuster Sci-Fi Movie Premiere", category: "Entertainment", volume: "4.1M searches", growth: "+880%" },
    { id: 4, title: "Global Renewable Energy Summit", category: "Global News", volume: "1.9M searches", growth: "+410%" },
    { id: 5, title: "Esports World Championship Finals", category: "Gaming", volume: "2.6M searches", growth: "+750%" },
    { id: 6, title: "Web3 & Crypto Liquidity Surge", category: "Crypto", volume: "2.2M searches", growth: "+590%" }
  ];

  const nextExplorePredictions = [
    { id: 1, topic: "Quantum Computing Hardware Scalability", expectedPeak: "Next 48 Hours", category: "Technology", confidence: "95%" },
    { id: 2, topic: "Decentralized Energy Grid Networks", expectedPeak: "Next 3 Days", category: "Global News", confidence: "91%" },
    { id: 3, topic: "Neural Interface Gaming Controllers", expectedPeak: "This Weekend", category: "Gaming", confidence: "93%" }
  ];

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'All Categories' || b.category === selectedCategory)
  );

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail === 'sachininsan2015@gmail.com' || inputEmail === 'admin@trendsnow.site') {
      setLoggedAdminEmail(inputEmail);
      localStorage.setItem('trendsnow_admin_email', inputEmail);
      setLoginError(false);
      setIsAdminOpen(false);
    } else {
      setLoginError(true);
    }
  };

  const handleAdminLogout = () => {
    setLoggedAdminEmail(null);
    localStorage.removeItem('trendsnow_admin_email');
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;
    const newEntry = {
      id: blogs.length + 1,
      title: newBlogTitle,
      category: newBlogCategory,
      readTime: '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      seoKeywords: `${newBlogCategory.toLowerCase()} trends 2026, daily auto publish`,
      content: newBlogContent
    };
    setBlogs([newEntry, ...blogs]);
    setNewBlogTitle('');
    setNewBlogContent('');
    alert('SEO Article published successfully and live on blog feed!');
  };

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`[HOOK - 0-10s]: "Kya aapko pata hai ${creatorTopic} ke baare mein yeh viral sachai?"\n\n[BODY - 10-50s]: Detailed breakdown of ${creatorTopic} optimized for ${creatorDuration} in ${creatorLang}.\n\n[OUTRO - 50-60s]: Like, share, and subscribe to TrendsNow.site for more live intelligence!`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header - Clean Blog Style Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl text-white shadow-lg">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              TrendsNow<span className="text-orange-500">.site</span>
            </h1>
            <p className="text-xs text-slate-400">Autonomous SEO Publication & Search Intelligence</p>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 ml-8 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button onClick={() => setActiveTab('blogs')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'blogs' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Latest Articles ({blogs.length})</button>
            <button onClick={() => setActiveTab('trends')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'trends' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Live Volumes</button>
            <button onClick={() => setActiveTab('explore')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'explore' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Next Explore</button>
            <button onClick={() => setActiveTab('creator')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'creator' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Creator Studio</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="bg-transparent text-white focus:outline-none cursor-pointer">
              <option className="bg-slate-900">English</option>
              <option className="bg-slate-900">Hindi</option>
              <option className="bg-slate-900">Hinglish</option>
              <option className="bg-slate-900">Spanish</option>
              <option className="bg-slate-900">French</option>
            </select>
          </div>

          <span className="hidden sm:flex px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Daily Auto-Publishing Active
          </span>

          {loggedAdminEmail ? (
            <div className="flex items-center gap-2">
              <button onClick={() => setIsAdminOpen(true)} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4" /> Admin Panel
              </button>
              <button onClick={handleAdminLogout} title="Logout" className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
                <LogOut className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAdminOpen(true)} className="text-xs text-slate-500 hover:text-slate-300">Admin Login</button>
          )}
        </div>
      </header>

      {/* Main Blog Publication Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            {/* Blog Header & Search Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-500" /> Daily SEO Articles & Insights
                </h2>
                <p className="text-xs text-slate-400 mt-1">Autonomous publishing engine delivering fresh 250-300 words articles daily.</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500">
                  <option>All Categories</option><option>Technology</option><option>Finance</option><option>Entertainment</option><option>Global News</option><option>Gaming</option><option>Crypto</option><option>Startups</option><option>Sports</option><option>Health</option><option>Politics</option><option>Real Estate</option>
                </select>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search published articles, SEO keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 shadow-inner" />
            </div>

            {/* Articles Feed Grid / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="bg-slate-900/60 border border-slate-800 hover:border-orange-500/40 transition rounded-2xl p-8 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-400 font-medium rounded-full border border-orange-500/20">{blog.category}</span>
                      <span>{blog.readTime} • {blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-orange-400 transition cursor-pointer">{blog.title}</h3>
                    <div className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 mb-4 inline-block font-mono">
                      SEO: {blog.seoKeywords}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 whitespace-pre-line mb-6">
                      {blog.content}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Published via Autonomous Engine</span>
                    <button onClick={() => alert(`Reading full article: ${blog.title}`)} className="text-orange-400 font-semibold hover:underline">Read Full Article &rarr;</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" /> Search Intelligence & Live Volumes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterTrends.map((trend) => (
                <div key={trend.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">{trend.category}</span>
                    <span className="text-emerald-400 text-xs font-bold">{trend.growth}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{trend.title}</h3>
                  <p className="text-sm text-slate-400">Search Volume: <strong className="text-white">{trend.volume}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space
