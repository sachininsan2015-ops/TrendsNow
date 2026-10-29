import React, { useState } from 'react';
import { Search, TrendingUp, Flame, Unlock, LayoutDashboard, Sparkles, X, PlusCircle, RefreshCw, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'trends' | 'creator' | 'blogs'>('trends');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Past 24 hours');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedRegion, setSelectedRegion] = useState('Haryana');
  const [selectedCity, setSelectedCity] = useState('Sirsa');
  const [searchType, setSearchType] = useState('Web Search');
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [creatorTopic, setCreatorTopic] = useState('');
  const [creatorDuration, setCreatorDuration] = useState('60 seconds');
  const [creatorLang, setCreatorLang] = useState('Hinglish');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Rise of Autonomous AI Agents in 2026",
      category: "Technology",
      readTime: "4 min read",
      date: "October 29, 2026",
      content: "Discover how autonomous AI agents are transforming global search intelligence and automated web workflows across India and global markets..."
    }
  ]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Technology');
  const [newBlogContent, setNewBlogContent] = useState('');

  const [trends, setTrends] = useState([
    { id: 1, title: "moon", category: "Technology", volume: "500K+ searches", growth: "+1,000%", time: "3 hours ago", location: "Sirsa, Haryana, India" },
    { id: 2, title: "kal ka mausam", category: "Global News", volume: "500K+ searches", growth: "+100%", time: "1 hour ago", location: "Sirsa, Haryana, India" },
    { id: 3, title: "afg vs zim", category: "Gaming", volume: "50K+ searches", growth: "+1,000%", time: "2 hours ago", location: "Sirsa, Haryana, India" },
    { id: 4, title: "Autonomous AI Agents 2026", category: "Technology", volume: "1.2M searches", growth: "+340%", time: "Just now", location: "India" }
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'sachin1980') {
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
      content: newBlogContent
    };
    setBlogs([newEntry, ...blogs]);
    setNewBlogTitle('');
    setNewBlogContent('');
    alert('Blog published successfully!');
  };

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedScript(`[HOOK - 0-10s]: "Kya aapko pata hai ${creatorTopic} ke baare mein yeh sachai?"\n\n[BODY - 10-50s]: Detailed breakdown of ${creatorTopic} optimized for ${creatorDuration} in ${creatorLang}.\n\n[OUTRO - 50-60s]: Like, share, and subscribe to TrendsNow.site for more live intelligence!`);
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
            <button onClick={() => setActiveTab('trends')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'trends' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Trending Live</button>
            <button onClick={() => setActiveTab('creator')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'creator' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Creator Studio</button>
            <button onClick={() => setActiveTab('blogs')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === 'blogs' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>Blogs ({blogs.length})</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Google Trends Synced
          </span>
          <button onClick={() => setIsAdminOpen(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition flex items-center gap-2 border border-slate-700">
            <Unlock className="w-4 h-4 text-orange-400" /> Admin Panel
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'trends' && (
          <>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Search viral trends, topics, queries (#tags)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Timeframe</label>
                  <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Past 1 hour</option><option>Past 4 hours</option><option>Past 24 hours</option><option>Past 7 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>All Categories</option><option>Technology</option><option>Finance</option><option>Entertainment</option><option>Global News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Search Type</label>
                  <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Web Search</option><option>Image Search</option><option>News Search</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                  <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>India</option><option>Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Region / State</label>
                  <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Haryana</option><option>Punjab</option><option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">District / City</label>
                  <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
                    <option>Sirsa</option><option>Hisar</option><option>Rohtak</option><option>Gurugram</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" /> Live Search Intelligence ({selectedCity}, {selectedRegion})
                </h2>
                <button onClick={() => alert('Live feed refreshed!')} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <RefreshCw className="w-3.5 h-3.5" /> Sync Live Feed
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trends.map((trend) => (
                  <div key={trend.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition shadow-lg group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/20">{trend.category}</span>
                      <span className="text-emerald-400 text-xs font-bold">{trend.growth}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition">{trend.title}</h3>
                    <div className="text-sm text-slate-400 flex items-center justify-between mt-4 pt-4 border-t border-slate-800/80">
                      <span>Volume: <strong className="text-white">{trend.volume}</strong></span>
                      <span className="text-xs text-slate-500">{trend.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'creator' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" /> Autonomous Creator Studio
            </h2>
            <p className="text-sm text-slate-400 mb-6">Generate duration-based, multi-language viral scripts instantly from live trending topics.</p>
            
            <form onSubmit={handleGenerateScript} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Trending Topic or Keyword</label>
                <input type="text" placeholder="e.g. moon, kal ka mausam, AI agents..." value={creatorTopic} onChange={(e) => setCreatorTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Duration</label>
                  <select value={creatorDuration} onChange={(e) => setCreatorDuration(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white">
                    <option>30 seconds (Shorts)</option><option>60 seconds (Reels)</option><option>3 minutes (YouTube)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Language</label>
                  <select value={creatorLang} onChange={(e) => setCreatorLang(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white">
                    <option>Hinglish</option><option>Hindi</option><option>English</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isGenerating} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
                {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? 'Generating Viral Script...' : 'Generate Script'}
              </button>
            </form>

            {generatedScript && (
              <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-orange-400 mb-3">Generated Script Output:</h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{generatedScript}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> Autonomous Editorial & SEO Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                    <span className="text-orange-400 font-medium">{blog.category}</span>
                    <span>{blog.readTime} • {blog.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{blog.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsAdminOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white p-2">
              <X className="w-5 h-5" />
            </button>

            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="space-y-4 py-4">
                <h3 className="text-xl font-bold text-white mb-2">Secure Admin Gateway</h3>
                <p className="text-sm text-slate-400 mb-4">Enter your secure passcode to manage monetization, analytics, and manual publishing.</p>
                <div>
                  <input type="password" placeholder="Enter Admin Passcode (e.g. admin123)" value={adminPasscode} onChange={(e) => setAdminPasscode(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                  {loginError && <p className="text-xs text-red-500 mt-1">Invalid passcode. Try 'admin123'.</p>}
                </div>
                <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition">Authenticate & Enter Panel</button>
              </form>
            ) : (
              <div className="space-y-6 py-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-orange-500" /> Admin Control Center
                  </h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Authorized</span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Live Traffic Analytics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-white">48,290</div><div className="text-xs text-slate-400">Total Visits</div></div>
                    <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-emerald-400">$142.80</div><div className="text-xs text-slate-400">USD Earnings</div></div>
                    <div className="bg-slate-900 p-3 rounded-lg"><div className="text-lg font-bold text-orange-400">1,240</div><div className="text-xs text-slate-400">Active Now</div></div>
                  </div>
                </div>

                <form onSubmit={handlePublishBlog} className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-300">Create & Publish New Blog Post</h4>
                  <input type="text" placeholder="Blog Title" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" />
                  <select value={newBlogCategory} onChange={(e) => setNewBlogCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500">
                    <option>Technology</option><option>Finance</option><option>Entertainment</option><option>Global News</option>
                  </select>
                  <textarea placeholder="Write article content..." value={newBlogContent} onChange={(e) => setNewBlogContent(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"></textarea>
                  <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <PlusCircle className="w-4 h-4" /> Publish Blog Instantly
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
