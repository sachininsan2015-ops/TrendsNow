import { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ShareModal } from '@/components/Modal';
import { BLOG_POSTS } from '@/data/content';
import { copyToClipboard } from '@/utils/export';
import type { BlogPost } from '@/types';

export function BlogView() {
  const { t, addToast } = useApp();
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  if (selected) {
    const url = `https://trendsnow.site/guides/${selected.id}`;
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to guides
        </button>

        <article className="bg-elev border border-app rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs text-muted mb-4">
            <span className="px-2 py-1 bg-base rounded font-medium">{selected.category}</span>
            <span>{selected.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {selected.readTime} min read
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
            {selected.title}
          </h1>
          <div className="prose prose-sm max-w-none text-muted leading-relaxed whitespace-pre-wrap">
            {selected.body}
          </div>
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

        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          url={url}
          title={selected.title}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          {t('blogTitle')}
        </h1>
        <p className="text-sm text-muted mt-1">{t('blogDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-card border border-app rounded-xl p-5 hover:border-primary/40 transition-all cursor-pointer"
            onClick={() => setSelected(post)}
          >
            <div className="flex items-center gap-3 text-xs text-muted mb-3">
              <span className="px-2 py-1 bg-base rounded font-medium">{post.category}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime} min
              </span>
            </div>
            <h2 className="font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-3">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">{post.date}</span>
              <span className="text-xs font-medium text-primary group-hover:underline">
                {t('readMore')} →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
