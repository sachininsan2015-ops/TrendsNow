import React, { useState, useEffect } from 'react';
import { Search, Flame, LayoutDashboard, Sparkles, X, PlusCircle, Globe, BookOpen, TrendingUp, Compass, ShieldCheck, Mail, LogOut } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLang, setSelectedLang] = useState('English');
  
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

  const [creatorTopic, setCreatorTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const initialBlogs = [
    {
      id: 1,
      title: "The Future of Autonomous AI Agents in 2026",
      category: "Technology",
      readTime: "4 min read",
      date: "October 30, 2026",
      seoKeywords: "AI agents 2026, automation, workflows",
      content: "The technological landscape in 2026 is being aggressively redefined by autonomous artificial intelligence agents. Unlike traditional software that requires constant human prompting, modern AI agents operate proactively, analyzing live search intelligence, predicting consumer behavior, and automating complex web workflows across global markets."
    },
    {
      id: 2,
      title: "Algorithmic Stock Trading and Market Rallies",
      category: "Finance",
      readTime: "5 min read",
      date: "October 29, 2026",
      seoKeywords: "fintech, stocks, algorithmic trading",
      content: "Financial markets across the globe are experiencing unprecedented volatility driven by algorithmic trading and real-time sentiment analysis. In 2026, retail and institutional investors alike rely heavily on automated financial tracking tools to gauge market momentum."
    }
  ];

  const [blogs, setBlogs] = useState(initialBlogs);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Technology');
  const [newBlogContent, setNewBlogContent] = useState('');

  const masterTrends = [
    { id: 1, title: "AI Code Assistants & Copilots", category: "Technology", volume: "3.4M searches", growth: "+912%" },
    { id: 2, title: "Global Stock Market Bull Run", category: "Finance", volume: "2.8M searches", growth: "+645%" },
    { id: 3, title: "Blockbuster Sci-Fi Movie Premiere", category: "Entertainment", volume: "4.1M searches", growth: "+880%" }
  ];

  const nextExplorePredictions = [
    { id: 1, topic: "Quantum Computing Hardware Scalability", expectedPeak: "Next 48 Hours", category: "Technology", confidence: "95%" },
    { id: 2, topic: "Decentralized Energy Grid Networks", expectedPeak: "Next 3 Days", category: "Global News", confidence: "91%" }
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
    alert('SEO Article published successfully!');
  };

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`[HOOK]: "${creatorTopic} ke baare mein yeh sachai aap nahi jante!"\n\n[BODY]: Detailed breakdown of ${creatorTopic}.\n\n[OUTRO]: Like & Subscribe to TrendsNow.site!`);
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
            <p className="text-xs text-slate-400">Autonomous SEO Publication</p>
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
            </select>
          </div>

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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-500" /> Daily SEO Articles & Insights
                </h2>
                <p className="text-xs text-slate-400 mt-1">Autonomous publishing engine delivering fresh articles daily.</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500">
                  <option>All Categories</option><option>Technology</option><option>Finance</option><option>Entertainment</option><option>Global News</option>
                </select>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search published articles, SEO keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 shadow-inner" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="bg-slate-900/60 border border-slate-800 hover:border-orange-500/40 transition rounded-2xl p-8 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-400 font-medium rounded-full border border-orange-500/20">{blog.category}</span>
                      <span>{blog.readTime} • {blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{blog.title}</h3>
                    <div className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 mb-4 inline-block font-mono">
                      SEO: {blog.seoKeywords}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
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
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">{trend.category}</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">{trend.title}</h3>
                  <p className="text-sm text-slate-400">Search Volume: <strong className="text-white">{trend.volume}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-orange-500" /> Next Explore & Emerging Predictions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nextExplorePredictions.map(item => (
                <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-full border border-amber-500/20">{item.category}</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">{item.topic}</h3>
                  <p className="text-sm text-slate-400">Peak Window: <strong className="text-white">{item.expectedPeak}</strong> ({item.confidence} Accuracy)</p>
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
            <form onSubmit={handleGenerateScript} className="space-y-4 mt-6">
              <input type="text" placeholder="Enter topic..." value={creatorTopic} onChange={(e) => setCreatorTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              <button type="submit" disabled={isGenerating} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl">
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
      </main>

      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsAdminOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white p-2"><X className="w-5 h-5" /></button>
            
            {!loggedAdminEmail ? (
              <form onSubmit={handleEmailLogin} className="space-y-4 py-4">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-orange-500" /> Secure Admin Gateway
                </h3>
                <p className="text-sm text-slate-400 mb-4">Enter your administrator email.</p>
                <input type="email" placeholder="sachininsan2015@gmail.com" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                {loginError && <p className="text-xs text-red-500 mt-1">Access Denied: Only registered admin email allowed.</p>}
                <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl">Verify & Enter</button>
              </form>
            ) : (
              <div className="space-y-6 py-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-orange-500" /> Admin Dashboard</h3>
                  <button onClick={handleAdminLogout} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-lg">Logout</button>
                </div>
                <form onSubmit={handlePublishBlog} className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-300">Publish New Article</h4>
                  <input type="text" placeholder="Title" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white" />
                  <textarea placeholder="Content..." value={newBlogContent} onChange={(e) => setNewBlogContent(e.target.value)} rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white"></textarea>
                  <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg">Publish Now</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
