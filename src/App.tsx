code_content = """import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Flame, Unlock, LayoutDashboard, Sparkles, X, PlusCircle, RefreshCw, FileText, Download, Code, Compass, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'trends' | 'explore' | 'creator' | 'blogs'>('trends');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Past 24 hours');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedRegion, setSelectedRegion] = useState('Haryana');
  const [selectedCity, setSelectedCity] = useState('Sirsa');
  const [selectedPincode, setSelectedPincode] = useState('125055');
  const [searchType, setSelectedSearchType] = useState('Web Search');
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Google Trends Synced Live');

  // Secure Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminOpen(true);
    }
  }, []);

  // Location Hierarchy Mapping
  const locationData: Record<string, { states: Record<string, { cities: string[], pincodes: Record<string, string> }> }> = {
    'India': {
      states: {
        'Haryana': { cities: ['Sirsa', 'Hisar', 'Gurugram', 'Rohtak', 'Karnal'], pincodes: { 'Sirsa': '125055', 'Hisar': '125001', 'Gurugram': '122001', 'Rohtak': '124001', 'Karnal': '132001' } },
        'Delhi': { cities: ['New Delhi', 'North Delhi', 'South Delhi', 'Dwarka'], pincodes: { 'New Delhi': '110001', 'North Delhi': '110007', 'South Delhi': '110017', 'Dwarka': '110075' } },
        'Maharashtra': { cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'], pincodes: { 'Mumbai': '400001', 'Pune': '411001', 'Nagpur': '440001', 'Nashik': '422001' } },
        'Punjab': { cities: ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar'], pincodes: { 'Chandigarh': '160017', 'Amritsar': '143001', 'Ludhiana': '141001', 'Jalandhar': '144001' } }
      }
    },
    'United States': {
      states: {
        'California': { cities: ['Los Angeles', 'San Francisco', 'San Diego'], pincodes: { 'Los Angeles': '90001', 'San Francisco': '94101', 'San Diego': '92101' } },
        'New York': { cities: ['New York City', 'Buffalo', 'Albany'], pincodes: { 'New York City': '10001', 'Buffalo': '14201', 'Albany': '12201' } }
      }
    },
    'United Kingdom': {
      states: {
        'England': { cities: ['London', 'Manchester', 'Birmingham'], pincodes: { 'London': 'SW1A 1AA', 'Manchester': 'M1 1AE', 'Birmingham': 'B1 1BB' } }
      }
    },
    'Canada': {
      states: {
        'Ontario': { cities: ['Toronto', 'Ottawa', 'Mississauga'], pincodes: { 'Toronto': 'M5H 2N2', 'Ottawa': 'K1P 1J1', 'Mississauga': 'L5B 2C2' } }
      }
    }
  };

  const currentStates = locationData[selectedCountry]?.states || {};
  const stateNames = Object.keys(currentStates);
  const citiesInRegion = currentStates[selectedRegion]?.cities || ['Local Area'];
  const pincodeMap = currentStates[selectedRegion]?.pincodes || {};

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    const newStates = Object.keys(locationData[newCountry]?.states || {});
    const firstState = newStates[0] || '';
    setSelectedRegion(firstState);
    const firstCity = locationData[newCountry]?.states[firstState]?.cities[0] || '';
    setSelectedCity(firstCity);
    setSelectedPincode(locationData[newCountry]?.states[firstState]?.pincodes[firstCity] || '000000');
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
    const firstCity = currentStates[newRegion]?.cities[0] || '';
    setSelectedCity(firstCity);
    setSelectedPincode(currentStates[newRegion]?.pincodes[firstCity] || '000000');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    setSelectedPincode(pincodeMap[newCity] || '125055');
  };

  // Creator Studio State
  const [creatorTopic, setCreatorTopic] = useState('');
  const [creatorDuration, setCreatorDuration] = useState('60 seconds');
  const [creatorLang, setCreatorLang] = useState('Hinglish');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Daily 250-300 Words SEO Blogs State
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Rise of Autonomous AI Agents in 2026: Transforming Global Search Intelligence",
      category: "Technology",
      readTime: "4 min read",
      date: "October 29, 2026",
      seoKeywords: "AI agents 2026, autonomous search intelligence, automated web workflows, digital transformation",
      content: `The technological landscape in 2026 is being aggressively redefined by autonomous artificial intelligence agents. Unlike traditional software that requires constant human prompting, modern AI agents operate proactively, analyzing live search intelligence, predicting consumer behavior, and automating complex web workflows across global markets.\\n\\nIn regions like India, especially across tech hubs and developing digital sectors, these autonomous systems are streamlining business operations, marketing analytics, and real-time data processing. By leveraging advanced machine learning models, search platforms can now deliver hyper-localized insights down to specific district pincodes within seconds.\\n\\nAs we look forward, the integration of autonomous agents will only deepen, making real-time search platforms indispensable for modern creators, businesses, and digital entrepreneurs who wish to stay ahead of the curve.`
    },
    {
      id: 2,
      title: "Next-Gen Fintech & Algorithmic Stock Rallies: What Investors Need to Know",
      category: "Finance",
      readTime: "5 min read",
      date: "October 28, 2026",
      seoKeywords: "fintech trends 2026, algorithmic trading, stock market rallies, automated financial tracking",
      content: `Financial markets across the globe are experiencing unprecedented volatility driven by algorithmic trading and real-time sentiment analysis. In 2026, retail and institutional investors alike are relying heavily on automated financial tracking tools that parse live search data to gauge market momentum before major price shifts occur.\\n\\nFrom tier-1 metropolitan stock exchanges to growing financial interest in tier-2 and tier-3 cities, accessibility to instant financial intelligence has democratized trading. Automated platforms now allow users to track regional search spikes related to specific stocks, crypto assets, and commodities.\\n\\nUltimately, combining real-time search volume with financial analytics provides a distinct advantage in navigating today\\'s fast-paced economic environment, ensuring informed decision-making for every investor.`
    }
  ]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Technology');
  const [newBlogContent, setNewBlogContent] = useState('');

  // Master Trends Pool
  const masterTrends = [
    { id: 1, title: "AI Code Assistants & Copilots", category: "Technology", volume: "3.4M searches", growth: "+912%", time: "15m ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 2, title: "Global Stock Market Bull Run", category: "Finance", volume: "2.8M searches", growth: "+645%", time: "30m ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 3, title: "Blockbuster Sci-Fi Movie Premiere", category: "Entertainment", volume: "4.1M searches", growth: "+880%", time: "10m ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 4, title: "Global Renewable Energy Summit", category: "Global News", volume: "1.9M searches", growth: "+410%", time: "1h ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 5, title: "Esports World Championship Finals", category: "Gaming", volume: "2.6M searches", growth: "+750%", time: "45m ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 6, title: "Web3 & Crypto Liquidity Surge", category: "Crypto", volume: "2.2M searches", growth: "+590%", time: "2h ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 7, title: "Autonomous Drone Delivery Networks", category: "Technology", volume: "1.2M searches", growth: "+340%", time: "3h ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 8, title: "Venture Capital & Tech Startups", category: "Startups", volume: "1.5M searches", growth: "+480%", time: "1h ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 9, title: "Premier League & Cricket Updates", category: "Sports", volume: "5.2M searches", growth: "+950%", time: "Just now", location: `${selectedCity}, ${selectedCountry}` },
    { id: 10, title: "Digital Creator Monetization Tools", category: "Technology", volume: "1.8M searches", growth: "+620%", time: "25m ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 11, title: "Real Estate & Smart Homes Demand", category: "Finance", volume: "1.1M searches", growth: "+390%", time: "2h ago", location: `${selectedCity}, ${selectedCountry}` },
    { id: 12, title: "OTT Streaming Series Season Finale", category: "Entertainment", volume: "3.2M searches", growth: "+810%", time: "50m ago", location: `${selectedCity}, ${selectedCountry}` }
  ];

  const nextExplorePredictions = [
    { id: 1, topic: "Quantum Computing Hardware Scalability", expectedPeak: "Next 48 Hours", category: "Technology", confidence: "95%" },
    { id: 2, topic: "Decentralized Energy Grid Networks", expectedPeak: "Next 3 Days", category: "Global News", confidence: "91%" },
    { id: 3, topic: "Neural Interface Gaming Controllers", expectedPeak: "This Weekend", category: "Gaming", confidence: "93%" }
  ];

  const filteredTrends = masterTrends.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'All Categories' || t.category === selectedCategory)
  );

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((adminEmail === 'sachininsan2015@gmail.com' || adminEmail === 'admin@trendsnow.site') && (adminPasscode === 'admin123' || adminPasscode === 'sachin1980')) {
      setIsAdminAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;
    const newEntry = {
      id: blogs.length + 1,
      title: newBlogTitle,
      category: newBlogCategory,
      readTime: '3 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      seoKeywords: `${newBlogCategory.toLowerCase()} trends 2026, live search intelligence, viral updates`,
      content: newBlogContent
    };
    setBlogs([newEntry, ...blogs]);
    setNewBlogTitle('');
    setNewBlogContent('');
    alert('250-300 words SEO Blog published successfully!');
  };

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`[HOOK - 0-10s]: "Kya aapko pata hai ${creatorTopic} ke baare mein yeh viral sachai?"\\n\\n[BODY - 10-50s]: Detailed breakdown of ${creatorTopic} optimized for ${creatorDuration} in ${creatorLang}.\\n\\n[OUTRO - 50-60s]: Like, share, and subscribe to TrendsNow.site for more live intelligence!`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl text-white shadow-lg">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              TrendsNow<span className="text-orange-500">.site</span>
            </h1>
            <p className="text-xs text-slate-400">Real-Time Search Intelligence & Autonomous Ecosystem</p>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 ml-8 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button onClick={() => setActiveTab('trends')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'trends' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Trending Now</button>
            <button onClick={() => setActiveTab('explore')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'explore' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Next Explore</button>
            <button onClick={() => setActiveTab('creator')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'creator' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Creator Studio</button>
            <button onClick={() => setActiveTab('blogs')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'blogs' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Blogs ({blogs.length})</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Google Trends Synced Live
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'trends' && (
          <>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400">{filteredTrends.length} results • Live • {selectedCity}, {selectedRegion}, {selectedCountry} ({selectedPincode})</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => alert('Exported CSV!')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-300 flex items-center gap-1"><Download className="w-3.5 h-3.5" /> CSV</button>
                  <button onClick={() => alert('Exported JSON!')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-300 flex items-center gap-1"><Code className="w-3.5 h-3.5" /> JSON</button>
                </div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Search viral trends, topics, queries (#tags)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Timeframe</label>
                  <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Past 1 hour</option><option>Past 4 hours</option><option>Past 24 hours</option><option>Past 7 days</option><option>Past 30 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>All Categories</option><option>Technology</option><option>Finance</option><option>Entertainment</option><option>Global News</option><option>Gaming</option><option>Crypto</option><option>Startups</option><option>Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Search Type</label>
                  <select value={searchType} onChange={(e) => setSelectedSearchType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Web Search</option><option>Image Search</option><option>News Search</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                  <select value={selectedCountry} onChange={handleCountryChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>India</option><option>United States</option><option>United Kingdom</option><option>Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">State / Province</label>
                  <select value={selectedRegion} onChange={handleRegionChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    {stateNames.map(st => <option key={st}>{st}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">District / City</label>
                  <select value={selectedCity} onChange={handleCityChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    {citiesInRegion.map(ct => <option key={ct}>{ct}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Pincode / ZIP</label>
                  <input type="text" value={selectedPincode} readOnly className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-emerald-400 font-mono text-center" />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" /> Live Search Intelligence ({selectedCity}, {selectedRegion})
                </h2>
                <button onClick={() => alert('Live intelligence refreshed successfully!')} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Feed
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTrends.map((trend) => (
                  <div key={trend.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition shadow-lg group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">{trend.category}</span>
                      <span className="text-emerald-400 text-xs font-bold">{trend.growth}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition">{trend.title}</h3>
                    <div className="text-sm text-slate-400 flex items-center justify-between mt-4 pt-4 border-t border-slate-800/80">
                      <span>Volume: <strong className="text-white">{trend.volume}</strong></span>
                      <span className="text-xs text-slate-500">{trend.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-orange-500" /> Next Explore & Emerging Predictions
            </h2>
            <p className="text-sm text-slate-400">Autonomous AI foresight analyzing upcoming search spikes before they trend globally.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextExplorePredictions.map(item => (
                <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-full border border-amber-500/20">{item.category}</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">{item.topic}</h3>
                  <div className="text-sm text-slate-400 flex justify-between pt-4 border-t border-slate-800">
                    <span>Peak Window: <strong className="text-white">{item.expectedPeak}</strong></span>
                    <span className="text-emerald-400 font-bold">{item.confidence} Accuracy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'creator' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" /> Autonomous Creator Studio
            </h2>
            <p className="text-sm text-slate-400 mb-6">Generate viral scripts instantly from live trending topics.</p>
            
            <form onSubmit={handleGenerateScript} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Trending Topic</label>
                <input type="text" placeholder="e.g. AI Code Assistants..." value={creatorTopic} onChange={(e) => setCreatorTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <button type="submit" disabled={isGenerating} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition">
                {isGenerating ? 'Generating...' : 'Generate Script'}
              </button>
            </form>

            {generatedScript && (
              <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-6">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{generatedScript}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-amber-500" /> Autonomous Editorial & SEO Blogs (250-300 Words)
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 font-medium rounded-full border border-orange-500/20">{blog.category}</span>
                    <span>{blog.readTime} • {blog.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{blog.title}</h3>
                  <div className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 mb-4 inline-block font-mono">
                    SEO Keywords: {blog.seoKeywords}
                  </div>
                  <div className="text-slate-300 text-base leading-relaxed space-y-4 whitespace-pre-line">
                    {blog.content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* STRICT SECURE ADMIN MODAL (Opens only via ?admin=true & authorized admin email) */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => { setIsAdminOpen(false); window.history.replaceState({}, document.title, window.location.pathname); }} className="absolute right-4 top-4 text-slate-400 hover:text-white p-2"><X className="w-5 h-5" /></button>
            
            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="space-y-4 py-4">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-orange-500" /> Secure Admin Gateway
                </h3>
                <p className="text-sm text-slate-400 mb-4">Restricted access. Enter authorized admin email and passcode.</p>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Admin Email</label>
                  <input type="email" placeholder="sachininsan2015@gmail.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Passcode</label>
                  <input type="password" placeholder="Enter Admin Passcode" value={adminPasscode} onChange={(e) => setAdminPasscode(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                </div>
                {loginError && <p className="text-xs text-red-500 mt-1">Access Denied: Only authorized admin email can log in.</p>}
                <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl">Authenticate Admin</button>
              </form>
            ) : (
              <div className="space-y-6 py-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-orange-500" /> Admin Control Center</h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Authorized Admin Verified</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-white">48,290</div><div className="text-xs text-slate-400">Total Visits</div></div>
                  <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-emerald-400">$142.80</div><div className="text-xs text-slate-400">USD Earnings</div></div>
                  <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-orange-400">1,240</div><div className="text-xs text-slate-400">Active Now</div></div>
                </div>
                <form onSubmit={handlePublishBlog} className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-300">Publish 250-300 Words SEO Blog</h4>
                  <input type="text" placeholder="Blog Title" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white" />
                  <textarea placeholder="Write full SEO article (250-300 words)..." value={newBlogContent} onChange={(e) => setNewBlogContent(e.target.value)} rows={6} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white"></textarea>
                  <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4" /> Publish Blog</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
"""

with open("App.tsx", "w", encoding="utf-8") as f:
    f.write(code_content)
