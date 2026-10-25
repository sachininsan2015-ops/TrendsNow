import { useEffect, useState, Fragment } from 'react';
import { BookOpen, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AdSlot } from '@/components/AdSlot';
import { fetchBlogPosts } from '@/lib/api';
import type { BlogPost } from '@/types';

export function BlogView() {
  const { t, setView, setSelectedBlogId } = useApp();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchBlogPosts();
        if (mounted) {
          setPosts(data);
          setError(null);
        }
      } catch {
        if (mounted) setError('Failed to load articles. Please try again.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const openPost = (post: BlogPost) => {
    setSelectedBlogId(post.id);
    setView('blog-reader');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          {t('blogTitle')}
        </h1>
        <p className="text-sm text-muted mt-1">{t('blogDesc')}</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="bg-card border border-app rounded-xl p-8 text-center">
          <AlertCircle className="w-8 h-8 text-error mx-auto mb-3" />
          <p className="text-sm text-muted">{error}</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="bg-card border border-app rounded-xl p-8 text-center">
          <p className="text-sm text-muted">No articles published yet. Check back soon.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <Fragment key={post.id}>
              <article
                className="group bg-card border border-app rounded-xl p-5 hover:border-primary/40 transition-all cursor-pointer"
                onClick={() => openPost(post)}
              >
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <span className="px-2 py-1 bg-base rounded font-medium">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime} min
                  </span>
                  {post.auto_generated && (
                    <span className="text-[10px] text-primary uppercase tracking-wide">Auto</span>
                  )}
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
              {i === 3 && (
                <div className="md:col-span-2 flex justify-center py-2">
                  <AdSlot placement="in-feed" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
