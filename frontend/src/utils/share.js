// URL-safe base64 helpers for "Share this Look" — no backend required.
// Data lives in the URL hash so nothing leaves the user's device unless they share the link.

export function encodeShare(obj) {
  const json = JSON.stringify(obj);
  // utf-8 safe base64
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeShare(s) {
  if (!s) return null;
  try {
    let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function buildLookShareUrl(look, origin = window.location.origin) {
  // Trim to only what's needed for the share page
  const slim = {
    v: 1,
    title: look.title,
    image: look.image,
    creator: look.creator || look.source,
    aesthetic: look.aesthetic,
    occasion: look.occasion,
    dominantColors: look.dominantColors || [],
    items: (look.items || []).map(({ kind, label, color }) => ({ kind, label, color })),
    notes: look.notes || '',
    saveType: look.saveType,
  };
  return `${origin}/share/look#data=${encodeShare(slim)}`;
}
