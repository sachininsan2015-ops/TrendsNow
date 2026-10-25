import type { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'guide-creators',
    title: 'How Creators Use TrendNow to Go Viral Before the Crowd',
    excerpt: 'A practical playbook for YouTubers, Reel makers, and Shorts creators to catch emerging trends in the first 6 hours.',
    body: `TrendNow's predictive engine surfaces signals 12 to 24 hours before they hit peak mass volume. For creators, this head start is the difference between a video that rides the wave and one that arrives after the market saturates.

**Step 1: Monitor Coming Trends daily.** Open the "Before It Blows Up" module each morning. Sort by confidence and time-to-peak. Trends with high confidence and 6+ hours to peak are your prime targets.

**Step 2: Generate a script in Creator Studio.** Pick the trend, choose your duration (30s Reel, 60s Short, or 3-minute deep dive), select your tone, and ensure your language is set correctly in the header. The script generates in your selected language automatically.

**Step 3: Publish within the window.** Algorithmic platforms reward early engagement on rising topics. Publishing 2-4 hours before predicted peak maximizes discovery.

**Step 4: Track and iterate.** Re-check the trend's sparkline after publishing. If velocity accelerates, consider a follow-up piece.`,
    category: 'Creators',
    readTime: 4,
    date: '2026-10-22',
  },
  {
    id: 'guide-marketers',
    title: 'The Marketer\'s Guide to Hyper-Local Trend Targeting',
    excerpt: 'Use country, state, city, and pincode filters to find trends your competitors miss in specific geographies.',
    body: `National-level trend data hides regional gold. TrendNow's location hierarchy lets you drill from Worldwide down to a specific pincode area.

**Why hyper-local matters.** A trend exploding in Mumbai but flat in Delhi demands different creative, different ad spend, and different timing than a nationwide play.

**How to use it.** Set the Country filter to your market, then narrow to Region and City. Use the pincode search for neighborhood-level campaigns. Export the filtered table as CSV to share with your media buying team.

**Pair with comparison.** Use Explore to compare the same term across two regions. Divergence between geographies reveals where momentum is building vs. fading.`,
    category: 'Marketing',
    readTime: 5,
    date: '2026-10-20',
  },
  {
    id: 'guide-researchers',
    title: 'Building Research Pipelines with TrendNow Exports & Embeds',
    excerpt: 'Automate your trend monitoring with CSV/JSON exports and embeddable widgets for internal dashboards.',
    body: `TrendNow is built for analysts who need structured data, not just a feed.

**Exports.** Every trend table supports CSV and JSON export with the current filter set applied. Schedule exports daily to build a longitudinal dataset.

**Embed widgets.** Click Embed on any trend to get an iframe snippet. Drop it into Notion, internal wikis, or client dashboards for a live trend panel.

**Comparison data.** The Explore module's interest-over-time series is available as JSON, ready for ingestion into your analytics stack.`,
    category: 'Research',
    readTime: 3,
    date: '2026-10-18',
  },
  {
    id: 'guide-predictive',
    title: 'Understanding Predictive AI: How We Forecast Trends',
    excerpt: 'A look under the hood of the "Before It Blows Up" module and what confidence scores really mean.',
    body: `TrendNow's predictive engine combines velocity acceleration, related-query clustering, and cross-category signal correlation to estimate whether a rising trend will sustain its trajectory.

**Confidence scores.** A confidence of 80%+ means multiple independent signals agree on upward continuation. Below 60%, the trend is more volatile and may plateau.

**Time to peak.** This is an estimate of hours remaining before search interest plateaus. Treat it as a window, not a deadline.

**No forecast is perfect.** Use predictions as a prioritization signal alongside your own judgment and domain expertise.`,
    category: 'AI',
    readTime: 4,
    date: '2026-10-15',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does TrendNow track trends in real time?',
    a: 'TrendNow aggregates signals from public RSS feeds, news APIs, and search interest indices, then normalizes them into a unified trend feed. Data refreshes continuously so you always see the latest momentum shifts.',
  },
  {
    q: 'Can I search trends for my specific city or pincode?',
    a: 'Yes. Use the Country, Region, and City filters to drill down, then use the pincode search box for neighborhood-level targeting. Suggestions appear instantly as you type.',
  },
  {
    q: 'What does the predictive AI "Before It Blows Up" module do?',
    a: 'It analyzes velocity acceleration and related-query clustering to forecast which emerging trends are likely to spike next, with a confidence score and estimated time to peak so you can act early.',
  },
  {
    q: 'Does Creator Studio generate scripts in my language?',
    a: 'Yes. Set your language in the header dropdown (30+ languages supported) and the generated script will appear in that language. Duration and tone are fully customizable.',
  },
  {
    q: 'Can I export or embed trend data?',
    a: 'Every trend table supports CSV and JSON export. Each trend also has an Embed Widget option that generates an iframe snippet with a live preview for your dashboards.',
  },
  {
    q: 'Is TrendNow free to use?',
    a: 'TrendNow\'s core trending feed, filters, and Explore comparison are available to all users. Creator Studio and predictive analytics are part of the platform\'s full feature set.',
  },
  {
    q: 'How often is the data refreshed?',
    a: 'The live feed updates continuously. You can also hit Refresh manually to pull the latest snapshot immediately.',
  },
];
