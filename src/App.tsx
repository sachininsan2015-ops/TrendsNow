import React, { useState, useEffect } from 'react';
import { Search, Flame, LayoutDashboard, Sparkles, X, PlusCircle, FileText, Code, Compass, ShieldCheck, Mail, LogOut, Globe, BookOpen, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'trends' | 'explore' | 'creator'>('blogs');
  
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
  const [creatorDuration] = useState('60 seconds');
  const [creatorLang] = useState('Hinglish');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
      setGeneratedScript(`[HOOK - 0-10s]: "Kya aapko pata hai ${creatorTopic} ke baare mein yeh viral sachai?"\n\n[BODY - 10-50s]:
