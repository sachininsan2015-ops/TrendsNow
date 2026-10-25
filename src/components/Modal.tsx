import { useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-elev border border-app rounded-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-auto scrollbar-thin`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-app sticky top-0 bg-elev z-10">
          <h3 className="font-semibold text-base">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-base transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function ShareModal({
  open,
  onClose,
  url,
  title,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const platforms = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'telegram', label: 'Telegram' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Share this trend">
      <p className="text-sm text-muted mb-4">Share "{title}" across your networks.</p>
      <div className="grid grid-cols-2 gap-3">
        {platforms.map((p) => (
          <a
            key={p.id}
            href={getShareUrl(p.id, url, title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 bg-base border border-app rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            {p.label}
          </a>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 px-3 py-2 bg-base border border-app rounded-lg text-sm text-muted"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </Modal>
  );
}

function getShareUrl(platform: string, url: string, title: string): string {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const map: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${t}%20${u}`,
    twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    telegram: `https://t.me/share/url?url=${u}&text=${t}`,
  };
  return map[platform] || url;
}
