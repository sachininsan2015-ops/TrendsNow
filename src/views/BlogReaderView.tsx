import { useEffect, useState } from 'react';
import { Clock, ArrowLeft, Share2, Loader2, AlertCircle, Tag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ShareModal } from '@/components/Modal';
import { AdSlot, AffiliateWidget } from '@/components/AdSlot';
import { fetchBlogPost, trackVisitor } from '@/lib/api';
import { copyToClipboard } from '@/utils/export';
import type { BlogPost } from '@/types';

export function BlogReaderView() {
  const { t, addToast, selectedBlogId, setView } = useApp();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!selectedBlogId) {
      setView('blog');
      return;
    }
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPost(selectedBlogId);
        if (!mounted) return;
        if (data) {
          setPost(data);
          setError(null);
          void trackVisitor(`blog/${data.id}`);
          injectSeoSchema(data);
        } else {
          setError('Article not found.');
        }
      } catch {
        if (mounted) setError('Failed to load article.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
      removeSeoSchema();
    };
  }, [selectedBlogId]);

  function injectSeoSchema(p: BlogPost) {
    removeSeoSchema();
    const script = document.createElement('script');
    script.id = 'blog-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { '@type': 'Organization', name: 'Trends Now' },
      publisher: { '@type': 'Organization', name: 'Trends Now' },
      keywords: (p.tags || []).join(', '),
      articleSection: p.category,
    });
    document.head.appendChild(script);

    document.title = `${p.title} — Trends Now`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', p.excerpt);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', p.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', p.excerpt);
  }

  function removeSeoSchema() {
    const el = document.getElementById('blog-jsonld');
    if (el) el.remove();
  }

  const url = post ? `https://trendsnow.site/blog/${post.id}` : '';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <button
          onClick={() => setView('blog')}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to guides
        </button>
        <div className="bg-card border border-app rounded-xl p-8 text-center">
          <AlertCircle className="w-8 h-8 text-error mx-auto mb-3" />
          <p className="text-sm text-muted">{error || 'Article not found.'}</p>
        </div>
      </div>
    );
  }

  const bodyParts = post.body.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button
        onClick={() => setView('blog')}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to guides
      </button>

      <article className="bg-elev border border-app rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 text-xs text-muted mb-4">
          <span className="px-2 py-1 bg-base rounded font-medium">{post.category}</span>
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime} min read
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        <div className="space-y-4 text-sm md:text-base text-muted leading-relaxed">
          {bodyParts.slice(0, 2).map((part, i) => (
            <p key={i} className="whitespace-pre-wrap">{part}</p>
          ))}
        </div>

        <div className="my-6">
          <AdSlot placement="blog-inline" />
        </div>

        <div className="space-y-4 text-sm md:text-base text-muted leading-relaxed">
          {bodyParts.slice(2).map((part, i) => (
            <p key={i + 2} className="whitespace-pre-wrap">{part}</p>
          ))}
        </div>

        {(post.tags || []).length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-muted" />
            {(post.tags || []).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-base rounded text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-app flex items-center gap-3">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {t('share')}
          </button>
          <button
            onClick={async () => {
              const ok = await copyToClipboard(url);
              addToast(ok ? t('shareCopied') : 'Copy failed');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-elev border border-app rounded-lg text-sm font-medium hover:border-primary transition-colors"
          >
            {t('copyLink')}
          </button>
        </div>
      </article>

      <AffiliateWidget />

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} url={url} title={post.title} />
    </div>
  );
}
