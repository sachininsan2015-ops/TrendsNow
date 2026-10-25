import { useEffect, useState, useCallback } from 'react';
import {
  Lock, BarChart3, Users, Eye, MousePointerClick, FileText,
  Trash2, Edit3, Plus, RefreshCw, Settings, ToggleLeft, ToggleRight,
  Loader2, LogOut, Globe2, Smartphone, Monitor, Clock, Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  verifyAdminPasscode, fetchAnalytics, updateBlogPost,
  deleteBlogPost, updateAdminSettings, triggerBlogGeneration,
} from '@/lib/api';
import type { VisitorAnalytics, AdminSettings } from '@/types';

export function AdminView() {
  const { addToast } = useApp();
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [data, setData] = useState<VisitorAnalytics | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [tab, setTab] = useState<'analytics' | 'posts' | 'settings'>('analytics');
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');

  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [generating, setGenerating] = useState(false);

  const loadAnalytics = useCallback(async () => {
    setLoadingData(true);
    try {
      const d = await fetchAnalytics(24);
      setData(d);
      setSettings({
        ads_enabled: d.settings.ads_enabled,
        adsense_client: d.settings.adsense_client,
        adsterra_key: d.settings.adsterra_key,
        affiliate_enabled: d.settings.affiliate_enabled,
      });
    } catch {
      addToast('Failed to load analytics', 'error');
    } finally {
      setLoadingData(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (authed) void loadAnalytics();
  }, [authed, loadAnalytics]);

  const handleLogin = async () => {
    setVerifying(true);
    setLoginError(null);
    try {
      const result = await verifyAdminPasscode(passcode);
      if (result.valid) {
        setAuthed(true);
        setPasscode('');
        if (result.settings) setSettings(result.settings);
      } else {
        setLoginError('Invalid passcode. Please try again.');
      }
    } catch {
      setLoginError('Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await deleteBlogPost(id);
      addToast('Post deleted');
      void loadAnalytics();
    } catch {
      addToast('Delete failed', 'error');
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateBlogPost(id, { title: editTitle, excerpt: editExcerpt });
      addToast('Post updated');
      setEditingPost(null);
      void loadAnalytics();
    } catch {
      addToast('Update failed', 'error');
    }
  };

  const handleToggleSetting = async (key: keyof AdminSettings, value: boolean) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
    try {
      await updateAdminSettings({ [key]: value });
      addToast('Settings updated');
    } catch {
      addToast('Update failed', 'error');
      setSettings({ ...settings, [key]: !value });
    }
  };

  const handleSaveAdIds = async () => {
    if (!settings) return;
    try {
      await updateAdminSettings({
        adsense_client: settings.adsense_client,
        adsterra_key: settings.adsterra_key,
      });
      addToast('Ad IDs saved');
    } catch {
      addToast('Save failed', 'error');
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await triggerBlogGeneration();
      addToast('2 new blog posts generated');
      void loadAnalytics();
    } catch {
      addToast('Generation failed', 'error');
    } finally {
      setGenerating(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-neon">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted">Enter your passcode to access the dashboard.</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Admin passcode"
              className="w-full px-4 py-3 bg-base border border-app rounded-xl text-sm outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {loginError && <p className="text-xs text-error">{loginError}</p>}
            <button
              onClick={handleLogin}
              disabled={verifying || !passcode}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {verifying ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
            <p className="text-center text-xs text-muted">
              Default passcode: <code className="text-primary">trends-admin-2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const topPages = data ? Object.entries(data.byPage).sort((a, b) => b[1] - a[1]).slice(0, 6) : [];
  const topCountries = data ? Object.entries(data.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 6) : [];
  const deviceEntries = data ? Object.entries(data.byDevice).sort((a, b) => b[1] - a[1]) : [];
  const hourEntries = data ? Object.entries(data.byHour).sort((a, b) => a[0].localeCompare(b[0])).slice(-12) : [];
  const maxHour = Math.max(...hourEntries.map(([, v]) => v), 1);

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">Real-time analytics, blog management, and monetization controls.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => void loadAnalytics()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-elev border border-app rounded-lg text-xs font-medium hover:border-primary transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-elev border border-app rounded-lg text-xs font-medium hover:border-error transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-app">
        {([
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'posts', label: 'Blog Posts', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ] as const).map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === item.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-base'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>

      {loadingData && !data && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {tab === 'analytics' && data && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={Eye} label="Total Visits" value={data.totalVisits} />
            <StatCard icon={Users} label="Unique Visitors" value={data.uniqueVisitors} />
            <StatCard icon={FileText} label="Blog Posts" value={data.blogs.length} />
            <StatCard icon={MousePointerClick} label="Last 24h" value={data.totalVisits} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Panel title="Visitors Over Time" icon={Clock}>
              <div className="flex items-end gap-1.5 h-32">
                {hourEntries.map(([hr, val]) => (
                  <div key={hr} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-neon rounded-t transition-all"
                      style={{ height: `${(val / maxHour) * 100}%`, minHeight: '4px' }}
                      title={`${hr}: ${val} visits`}
                    />
                    <span className="text-[9px] text-muted">{hr.slice(11)}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Top Pages" icon={Globe2}>
              <div className="space-y-2">
                {topPages.map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between text-sm">
                    <span className="truncate">{page}</span>
                    <span className="text-primary font-medium flex-shrink-0 ml-2">{count}</span>
                  </div>
                ))}
                {topPages.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
              </div>
            </Panel>

            <Panel title="Top Countries" icon={Globe2}>
              <div className="space-y-2">
                {topCountries.map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between text-sm">
                    <span>{country}</span>
                    <span className="text-primary font-medium">{count}</span>
                  </div>
                ))}
                {topCountries.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
              </div>
            </Panel>

            <Panel title="Devices" icon={Monitor}>
              <div className="space-y-2">
                {deviceEntries.map(([device, count]) => {
                  const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Smartphone : Monitor;
                  return (
                    <div key={device} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted" />
                        {device}
                      </span>
                      <span className="text-primary font-medium">{count}</span>
                    </div>
                  );
                })}
                {deviceEntries.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
              </div>
            </Panel>
          </div>
        </div>
      )}

      {tab === 'posts' && data && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Published Blog Posts ({data.blogs.length})</h2>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              Generate 2 Posts
            </button>
          </div>

          <div className="space-y-2">
            {data.blogs.map((blog) => (
              <div key={blog.id} className="bg-card border border-app rounded-xl p-4">
                {editingPost === blog.id ? (
                  <div className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary"
                      placeholder="Title"
                    />
                    <textarea
                      value={editExcerpt}
                      onChange={(e) => setEditExcerpt(e.target.value)}
                      className="w-full px-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary resize-none"
                      rows={2}
                      placeholder="Excerpt"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(blog.id)}
                        className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="px-3 py-1.5 bg-elev border border-app rounded-lg text-xs font-medium hover:border-primary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm truncate">{blog.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        {blog.auto_generated && <span className="text-primary">Auto</span>}
                        <span className={blog.published ? 'text-success' : 'text-muted'}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingPost(blog.id);
                          setEditTitle(blog.title);
                          setEditExcerpt('');
                        }}
                        className="p-2 rounded-lg hover:bg-base transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-muted" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 rounded-lg hover:bg-base transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-error" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {data.blogs.length === 0 && (
              <div className="bg-card border border-app rounded-xl p-8 text-center">
                <p className="text-sm text-muted">No blog posts yet. Click "Generate 2 Posts" to create some.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'settings' && settings && (
        <div className="space-y-4 max-w-2xl">
          <Panel title="Monetization Toggles" icon={Settings}>
            <div className="space-y-3">
              <ToggleRow
                label="Display Ads Enabled"
                desc="Show AdSense / Adsterra banner ads across the site"
                value={settings.ads_enabled}
                onToggle={() => handleToggleSetting('ads_enabled', !settings.ads_enabled)}
              />
              <ToggleRow
                label="Affiliate Widgets Enabled"
                desc="Show sponsored / affiliate recommendation widgets"
                value={settings.affiliate_enabled}
                onToggle={() => handleToggleSetting('affiliate_enabled', !settings.affiliate_enabled)}
              />
            </div>
          </Panel>

          <Panel title="Ad Network Configuration" icon={Settings}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted mb-1">Google AdSense Client ID</label>
                <input
                  value={settings.adsense_client || ''}
                  onChange={(e) => setSettings({ ...settings, adsense_client: e.target.value })}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  className="w-full px-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Adsterra Banner Key</label>
                <input
                  value={settings.adsterra_key || ''}
                  onChange={(e) => setSettings({ ...settings, adsterra_key: e.target.value })}
                  placeholder="Adsterra key"
                  className="w-full px-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={handleSaveAdIds}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Save Ad IDs
              </button>
            </div>
          </Panel>

          <Panel title="Admin Passcode" icon={Lock}>
            <div className="space-y-3">
              <p className="text-xs text-muted">Change the admin dashboard passcode. Keep it secure.</p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="New passcode"
                  id="new-passcode-input"
                  className="flex-1 px-3 py-2 bg-base border border-app rounded-lg text-sm outline-none focus:border-primary"
                />
                <button
                  onClick={async () => {
                    const input = document.getElementById('new-passcode-input') as HTMLInputElement;
                    const val = input.value;
                    if (!val) return;
                    try {
                      await updateAdminSettings({ admin_passcode: val });
                      addToast('Passcode updated');
                      input.value = '';
                    } catch {
                      addToast('Update failed', 'error');
                    }
                  }}
                  className="px-4 py-2 bg-elev border border-app rounded-lg text-sm font-medium hover:border-primary transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="bg-card border border-app rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-elev border border-app rounded-xl p-5">
      <h2 className="font-semibold text-sm flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function ToggleRow({ label, desc, value, onToggle }: { label: string; desc: string; value: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted">{desc}</div>
      </div>
      <button onClick={onToggle} className="flex-shrink-0">
        {value ? (
          <ToggleRight className="w-9 h-9 text-primary" />
        ) : (
          <ToggleLeft className="w-9 h-9 text-muted" />
        )}
      </button>
    </div>
  );
}
