import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Flame, LayoutDashboard, Sparkles, X, PlusCircle, RefreshCw, FileText, Download, Code, Compass, ShieldCheck } from 'lucide-react';

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
  
  const [isSyncing] = useState(false);
  const [syncStatus] = useState('Google Trends Synced Live');

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
  const [creatorDuration] = useState('60 seconds');
  const [creatorLang] = useState('Hinglish');
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
      content: "The technological landscape in 2026 is being aggressively redefined by autonomous artificial intelligence agents. Unlike traditional software that requires constant human prompting, modern AI agents operate proactively, analyzing live search intelligence, predicting consumer behavior, and automating complex web workflows across global markets.\n\nIn regions like India, especially across tech hubs and developing digital sectors, these autonomous systems are streamlining business operations, marketing analytics, and real-time data processing. By leveraging advanced machine learning models, search platforms can now deliver hyper-localized insights down to specific district pincodes within seconds.\n\nAs we look forward, the integration of autonomous agents will only deepen, making real-time search platforms indispensable for modern creators, businesses, and digital entrepreneurs who wish to stay ahead of the curve."
    },
    {
      id: 2,
      title: "Next-Gen Fintech & Algorithmic Stock Rallies: What Investors Need to Know",
      category: "Finance",
      readTime: "5 min read",
      date: "October 28, 2026",
      seoKeywords: "fintech trends 2026, algorithmic trading, stock market rallies, automated financial tracking",
      content: "Financial markets across the globe are experiencing unprecedented volatility driven by algorithmic trading and real-time sentiment analysis. In 2026, retail and institutional investors alike are relying heavily on automated financial tracking tools that parse live search data to gauge market momentum before major price shifts occur.\n\nFrom tier-1 metropolitan stock exchanges to growing financial interest in tier-2 and tier-3 cities, accessibility to instant financial intelligence has democratized trading. Automated platforms now allow users to track regional search spikes related to specific stocks, crypto assets, and commodities.\n\nUltimately, combining real-time search volume with financial analytics provides a distinct advantage in navigating today's fast-paced economic environment, ensuring informed decision-making for every investor."
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
