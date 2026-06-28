import React, { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { buildLookShareUrl } from '@/utils/share';

export default function ShareLookButton({ look, className = '' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  const handleClick = async () => {
    const shareUrl = buildLookShareUrl(look);
    setUrl(shareUrl);

    // Prefer native share on mobile / Safari
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${look.title} — Caramel Popcorn`,
          text: `Outfit decoded: ${look.aesthetic} · ${look.occasion}`,
          url: shareUrl,
        });
        return;
      } catch (_) {
        // fall through to modal
      }
    }
    setOpen(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (_) {
      // Fallback: select the input
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`cp-chip ${className}`}
        style={{ background: '#2B1E16', color: '#FCFAF8' }}
        data-testid={`look-share-btn-${look.id}`}
        aria-label="Share this look"
      >
        <Share2 size={14} /> Share this look
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setOpen(false)}
          data-testid="share-modal"
        >
          <div className="cp-card w-full max-w-md overflow-hidden cp-pop" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: '#E8DFD8' }}>
              <div>
                <div className="font-heading text-xl" style={{ color: '#2B1E16' }}>Share this look</div>
                <p className="text-xs mt-0.5" style={{ color: '#99857A' }}>Anyone with this link can view a read-only page.</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full grid place-items-center hover:bg-gray-100"
                data-testid="share-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#5C4033' }}>Share link</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={url}
                  onFocus={(e) => e.target.select()}
                  className="flex-1 px-3 py-2.5 rounded-xl border outline-none text-xs"
                  style={{ borderColor: '#E8DFD8', color: '#2B1E16', background: '#FCFAF8' }}
                  data-testid="share-url-input"
                />
                <button
                  onClick={copy}
                  className={copied ? 'cp-btn-secondary text-sm inline-flex items-center gap-1' : 'cp-btn-primary text-sm inline-flex items-center gap-1'}
                  data-testid="share-copy-btn"
                >
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Outfit decoded — ${look.title} · ${url}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="cp-chip justify-center"
                  style={{ background: '#F4E3D7', color: '#5C4033' }}
                  data-testid="share-whatsapp"
                >WhatsApp</a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${look.title} — outfit decoded by Caramel Popcorn 🍿`)}&url=${encodeURIComponent(url)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="cp-chip justify-center"
                  style={{ background: '#F4E3D7', color: '#5C4033' }}
                  data-testid="share-twitter"
                >Twitter / X</a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(`${look.title} — Caramel Popcorn`)}&body=${encodeURIComponent(url)}`}
                  className="cp-chip justify-center"
                  style={{ background: '#F4E3D7', color: '#5C4033' }}
                  data-testid="share-email"
                >Email</a>
              </div>

              <p className="text-[11px] mt-4 leading-relaxed" style={{ color: '#99857A' }}>
                Privacy note: this link encodes the look directly. Nothing is stored on a server — your data lives in the URL.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
