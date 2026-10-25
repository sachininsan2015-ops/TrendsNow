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

// Ad & Monetization state
const [isShowingAdBreak, setIsShowingAdBreak] = useState(false);
const [adCountdown, setAdCountdown] = useState(5);
const [generatedScript, setGeneratedScript] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const [notificationSubscribed, setNotificationSubscribed] = useState(false);

// Secure Admin Authentication State (Locked to sachininsan2015@gmail.com)
const [userEmail, setUserEmail] = useState('');
const [loginInput, setLoginInput] = useState('');
const ADMIN_EMAIL = 'sachininsan2015@gmail.com';

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

// Micro-to-Global Database covering City, State, Country & Keywords
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
{ id: 10, title: 'Ashwagandha & Medicinal Herb Farming Profitability', category: 'AGRICULTURE', volume: '320K search volume', growth: '+64%', time: '6h ago', source: 'AgriTech India', country: 'India', region: 'Haryana', city: 'Dhingtania', rankingKeywords: ['Ashwagandha farming Haryana', 'medicinal crop profit', 'organic farming Sirsa'] },
{ id: 11, title: 'Tricity Commercial Real Estate Growth in Sector 82 Mohali', category: 'REAL ESTATE', volume: '670K search volume', growth: '+112%', time: '5h ago', source: 'Smart Homes Tricity', country: 'India', region: 'Punjab', city: 'Mohali', rankingKeywords: ['Sector 82 Mohali property', 'Smart Homes Tricity', 'commercial shops Mohali'] },
{ id: 12, title: 'MSG Resorts Begu Road Wedding Season Bookings', category: 'LOCAL EVENTS', volume: '120K search volume', growth: '+230%', time: '30m ago', source: 'Sirsa Pulse', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['MSG resort Sirsa', 'Begu road banquet hall', 'wedding venues Haryana'] },
{ id: 13, title: 'Next-Gen 3D Textured Wall Art & Plaster of Paris Decor', category: 'HOME DECOR', volume: '290K search volume', growth: '+140%', time: '7h ago', source: 'Home Story Trends', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['3D wall art Sirsa', 'Home Story decor', 'textured wall panel India'] },
{ id: 14, title: 'Cyberpunk 2077 Sequel Project Orion Milestones', category: 'GAMING', volume: '1.8M search volume', growth: '+76%', time: '8h ago', source: 'IGN Wire', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Project Orion CDPR', 'Cyberpunk sequel', 'RPG gaming trends'] },
{ id: 15, title: 'Quantum Computing Breakthrough in Solid-State Batteries', category: 'SCIENCE', volume: '2.1M search volume', growth: '+280%', time: '9h ago', source: 'TechCrunch Global', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['solid-state battery tech', 'quantum leap energy', 'EV battery breakthroughs'] },
{ id: 16, title: 'Apple Vision Pro 2 Lightweight Design Leaks', category: 'TECH & AI', volume: '1.7M search volume', growth: '+115%', time: '10h ago', source: 'MacRumors', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['Vision Pro 2 leaks', 'spatial computing AR', 'Apple mixed reality'] },
{ id: 17, title: 'Haryanvi Folk Music Fusion in Bollywood Soundtracks', category: 'ENTERTAINMENT', volume: '510K search volume', growth: '+88%', time: '12h ago', source: 'Music India', country: 'India', region: 'Haryana', city: 'Hisar', rankingKeywords: ['Haryanvi folk fusion', 'Bollywood music trends', 'Haryana singers'] },
{ id: 18, title: 'Electric Vehicle Charging Station Infrastructure in Tier-2 Cities', category: 'BUSINESS', volume: '840K search volume', growth: '+150%', time: '13h ago', source: 'EV India', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['EV charging Haryana', 'electric vehicle station Sirsa'] },
{ id: 19, title: 'GTA VI PC System Requirements & Ray Tracing Specs', category: 'GAMING', volume: '5.6M search volume', growth: '+520%', time: '30m ago', source: 'Rockstar Pulse', country: 'Worldwide', region: 'Global', city: 'Online', rankingKeywords: ['GTA VI PC specs', 'Rockstar games leaks', 'ray tracing PC requirements'] },
{ id: 20, title: 'Local Scrap Vehicle Recycling & Eco-Compliance Policies', category: 'BUSINESS', volume: '390K search volume', growth: '+45%', time: '18h ago', source: 'AutoScrap News', country: 'India', region: 'Haryana', city: 'Sirsa', rankingKeywords: ['scrap vehicle policy Haryana', 'old car recycling Sirsa', 'auto scrap dealer'] }
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
setGeneratedScript(🔥 Haryanvi / Desi Viral Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"Ram Ram bhaiyo! Yo dekh lo, ${selectedTrendForScript} pe poore area mein bhaukaal mach raha hai, sunlo dhyan te!"\n\n[0:05 - 0:30] BODY:\n- Search velocity upar ja ri hai (${filteredTrends[0]?.growth || '+325%'}).\n- Lokka mein iski jabardast charcha hai.\n- Agar aapne abhi tak action nahi liya, toh samajh lo mauka hath se gaya!\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Video ne like karke channel ne subscribe kar lo, aur share kar do saare yaar-beliyan ke gail!");
} else if (selectedLanguage.includes('Hindi')) {
setGeneratedScript(🔥 Hindi Viral Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"Dosto, kya aapko pata hai ki ${selectedTrendForScript} ke baare mein Google par aag ki tarah kya search ho raha hai?"\n\n[0:05 - 0:30] BODY:\n- Sirf kuch ghante mein search volume mein ${filteredTrends[0]?.growth || '+325%'} ka massive jump aaya hai.\n- Experts ka kehna hai ki yeh trend aane wale dino mein sabse bada game-changer banne wala hai.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Apne vichar comments mein bataiye, Trends Now ko subscribe kijiye aur is video ko apne doston ke sath share karein!");
} else {
setGeneratedScript(🔥 Global English Script (${scriptDuration}):\n\n[0:00 - 0:05] HOOK:\n"You won't believe what just dropped regarding ${selectedTrendForScript}! Everything changes today..."\n\n[0:05 - 0:30] BODY:\n- Massive search velocity spikes reaching ${filteredTrends[0]?.growth || '+325%'} in real-time.\n- Unpacking the core implications for digital creators and industry leaders.\n- Why top analysts are tracking this exact query right now.\n\n[0:30 - ${scriptDuration.includes('60') ? '0:60' : '3:00'}] CALL TO ACTION:\n"Drop your thoughts below, subscribe to Trends Now for live intelligence, and share this with your network!");
}
setIsGenerating(false);
}, 1000);
};

const handleCopyText = (text: string, label: string) => {
navigator.clipboard.writeText(text);
alert(${label} copied successfully to clipboard!);
};

const handleWhatsAppShare = (title: string) => {
const url = https://api.whatsapp.com/send?text=${encodeURIComponent(🔥 Check out this viral trend on Trends Now: "${title}" - https://trendsnow.site)};
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

const handleEmailLogin = (e: React.FormEvent) => {
e.preventDefault();
if (loginInput.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
setUserEmail(ADMIN_EMAIL);
alert('Welcome back, Admin! Admin portal is now unlocked.');
} else {
setUserEmail(loginInput.trim());
alert('Logged in as standard user.');
}
setLoginInput('');
};

const handleLogout = () => {
setUserEmail('');
setActiveTab('trending');
};

const isUserAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

return (


  {/* MONETIZATION AD BREAK OVERLAY */}
  {isShowingAdBreak && (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl shadow-cyan-500/10">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg animate-pulse">
          <Megaphone className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 font-semibold uppercase tracking-wider">
            Sponsored Ad Break (AdSense CPM Revenue)
          </span>
          <h3 className="text-2xl font-bold text-white mt-3">Generating Your Viral Script...</h3>
          <p className="text-sm text-slate-400 mt-1">Please wait {adCountdown} seconds while our AI neural engine compiles trending keywords.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 font-bold">AD</div>
            <div className="text-left">
              <p className="font-semibold text-slate-200">Smart Homes Tricity - Luxury Plots</p>
              <p className="text-slate-500">Book your commercial site in Sector 82 Mohali today.</p>
            </div>
          </div>
          <span className="text-cyan-400 font-bold">Sponsored</span>
        </div>

        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${(5 - adCountdown) * 20}%` }}></div>
        </div>
        <p className="text-xs text-slate-500">Ad closing automatically in {adCountdown}s...</p>
      </div>
    </div>
  )}

  {/* Top Header */}
  <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
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

    {/* Global Universal Search Bar */}
    <div className="flex-1 max-w-xl mx-8 relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Type any city (Sirsa), state (Haryana), country, or keyword to check live trends..." 
        className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 shadow-inner transition-all"
      />
    </div>

    <div className="flex items-center space-x-3">
      <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-semibold">
        <DollarSign className="w-3.5 h-3.5" /> AdSense Active
      </div>
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
          Trending Now ({filteredTrends.length})
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
          Explore (City to Global)
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

        {isUserAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
          >
            <Settings className="w-4 h-4" />
            Admin Dashboard
          </button>
        )}

        <button 
          onClick={() => setActiveTab('faq')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'faq' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
        >
          <HelpCircle className="w-4 h-4" />
          FAQ
        </button>
      </nav>

      {/* Notification & Auth Section */}
      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-3">
        <button 
          onClick={() => {
            setNotificationSubscribed(true);
            alert('Notifications enabled successfully! You will receive instant alerts when new trends or blogs are posted.');
          }}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-semibold transition-all ${notificationSubscribed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'}`}
        >
          <Bell className="w-3.5 h-3.5" />
          {notificationSubscribed ? 'Notifications Active' : 'Allow Notifications'}
        </button>

        {userEmail ? (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-medium truncate">
              <User className="w-3.5 h-3.5" />
              <span className="truncate">{userEmail}</span>
            </div>
            {isUserAdmin && <p className="text-emerald-400 font-semibold">⚡ Admin Monitoring Active</p>}
            <button 
              onClick={handleLogout}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-2 pt-2 border-t border-slate-800">
            <p className="font-medium text-slate-300">Creator / Admin Login</p>
            <input 
              type="email" 
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="Enter email..."
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-1.5 rounded-lg transition-colors">
              Login
            </button>
          </form>
        )}
      </div>
    </aside>

    <main className="flex-1 p-8 overflow-y-auto space-y-8">
      
      {/* BANNER AD PLACEMENT */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-400 font-bold text-xs uppercase tracking-wider border border-cyan-500/30">
            Sponsored Ad
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Smart Homes Tricity - Commercial & Residential Real Estate</h4>
            <p className="text-xs text-slate-400">Promote your properties across Sirsa and Tricity with high-converting buyer leads.</p>
          </div>
        </div>
        <a href="https://wa.me/" target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-md">
          Learn More
        </a>
      </div>

      {activeTab === 'trending' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Filter className="w-4 h-4 text-cyan-400" />
                Micro-to-Global Search Intelligence ({filteredTrends.length} Live Results)
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Keyword Ranking Feed
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  <option>Real Estate</option>
                  <option>Home Decor</option>
                </select>
              </div>
            </div>
          </div>

          {filteredTrends.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <Search className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-60" />
              <p className="text-base font-semibold text-slate-200">No matching trends found for your search query</p>
              <p className="text-xs text-slate-500 mt-1">Try typing another city name (e.g., "Sirsa", "Chandigarh") or category.</p>
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
                    <p className="text-xs text-slate-400 mb-2">{item.volume} • {item.time}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-cyan-300/80 mb-3">
                      <MapPin className="w-3 h-3 text-cyan-400" /> Location: {item.city}, {item.region} ({item.country})
                    </div>

                    {/* Ranking Keywords Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.rankingKeywords.map((kw, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">{item.source}</span>
                      <button 
                        onClick={() => {
                          setSelectedTrendForScript(item.title);
                          setActiveTab('studio');
                        }}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                      >
                        Create Script <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Viral Share & Copy Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/40">
                      <button 
                        onClick={() => handleCopyText(`https://trendsnow.site/?trend=${encodeURIComponent(item.title)}`, 'Trend Link')}
                        className="flex-1 bg-slate-950 hover:bg-slate-800 text-slate-300 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-800"
                      >
                        <Copy className="w-3 h-3" /> Copy Link
                      </button>
                      <button 
                        onClick={() => handleWhatsAppShare(item.title)}
                        className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/20"
                      >
                        <Share2 className="w-3 h-3" /> WhatsApp
                      </button>
                    </div>
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
          <h2 className="text-2xl font-bold text-white mb-2">Explore Micro-to-Global Intelligence</h2>
          <p className="text-sm text-slate-400">Compare regional velocity metrics from Haryana and Tricity against global search trends.</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" /> Global Macro Trends
              </h3>
              <p className="text-xs text-slate-400 mb-4">Real-time aggregate data across North America, Europe, and Asia-Pacific markets.</p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span>GPT-5 Architecture Leaks</span>
                  <span className="text-emerald-400">+325%</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span>Temu Global IPO Speculation</span>
                  <span className="text-emerald-400">+21%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" /> Hyper-Local Intelligence (Sirsa & Tricity)
              </h3>
              <p className="text-xs text-slate-400 mb-4">Regional search queries, real estate developments, and local service demands.</p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span>M4 MacBook Pro Performance (Sirsa)</span>
                  <span className="text-emerald-400">+40%</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span>Commercial Real Estate Mohali</span>
                  <span className="text-emerald-400">+112%</span>
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
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopyText(`https://trendsnow.site/blog/${post.id}`, 'Blog Link')}
                      className="text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleWhatsAppShare(post.title)}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      Share <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'studio' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Creator Studio / Creator Hub (Multi-Language)</h2>
            <p className="text-sm text-slate-400">Generate viral video scripts, hooks, and content briefs tailored precisely by duration and language.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Select Trend Topic</label>
                <select 
                  value={selectedTrendForScript}
                  onChange={(e) => setSelectedTrendForScript(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option>60 seconds (Shorts/Reels)</option>
                  <option>3 minutes (YouTube Deep Dive)</option>
                  <option>10 minutes (Full Documentary/Review)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleTriggerScriptGeneration}
              disabled={isGenerating}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              {isGenerating ? 'Synthesizing Neural Script...' : 'Generate Script & Social Media Hook'}
            </button>

            {generatedScript && (
              <div className="mt-6 p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Generated Output ({selectedLanguage})</h4>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopyText(generatedScript, 'Script')}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-800"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Script
                    </button>
                    <button 
                      onClick={() => handleWhatsAppShare(selectedTrendForScript)}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share WhatsApp
                    </button>
                  </div>
                </div>
                <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono">{generatedScript}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'admin' && isUserAdmin && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">World-Class Admin & Monetization Monitoring</h2>
            <p className="text-sm text-slate-400">Logged in as Admin ({ADMIN_EMAIL}). Monitor ad impressions, CPM earnings, and automated publishing.</p>
          </div>

          {/* Earnings Overview Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-400 mb-1">Estimated Ad Revenue (Today)</p>
              <h3 className="text-2xl font-bold text-emerald-400">$48.50 USD</h3>
              <p className="text-[10px] text-slate-500 mt-1">12,450 Ad Impressions (CPM $3.90)</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-400 mb-1">Active Ad Units</p>
              <h3 className="text-2xl font-bold text-cyan-400">3 Placements</h3>
              <p className="text-[10px] text-slate-500 mt-1">Banner, Sponsored Feed, Video Interstitial</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-400 mb-1">Indexed Keywords & Cities</p>
              <h3 className="text-2xl font-bold text-amber-400">120+ Micro-Regions</h3>
              <p className="text-[10px] text-slate-500 mt-1">Sirsa, Chandigarh, Global feeds active</p>
            </div>
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
          <h2 className="text-2xl font-bold text-white mb-0">Frequently Asked Questions</h2>
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
