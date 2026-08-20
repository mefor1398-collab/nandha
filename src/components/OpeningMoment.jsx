import { useEffect, useState } from 'react';

export default function OpeningMoment({ config, copy, reducedMotion }) {
  const forcePreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('opening') === 'show';
  const [phase, setPhase] = useState(() => {
    if (forcePreview) return 'visible';
    if (reducedMotion || typeof window === 'undefined') return 'hidden';
    try {
      return window.localStorage.getItem(config.premium.openingStorageKey) ? 'hidden' : 'visible';
    } catch {
      return 'visible';
    }
  });

  useEffect(() => {
    if (phase !== 'visible' || forcePreview) return undefined;
    const timer = window.setTimeout(() => dismiss(), config.premium.openingDuration);
    return () => window.clearTimeout(timer);
  }, [phase, config.premium.openingDuration, forcePreview]);

  function dismiss() {
    if (phase !== 'visible') return;
    try {
      window.localStorage.setItem(config.premium.openingStorageKey, 'seen');
    } catch {
      // Privacy settings can block storage. The invitation remains fully usable.
    }
    setPhase('leaving');
    window.setTimeout(() => setPhase('hidden'), 420);
  }

  if (phase === 'hidden') return null;

  return (
    <button className={'opening-moment opening-moment--' + phase} type="button" onClick={dismiss} aria-label={copy.enter}>
      <span className="opening-moment__photo" style={{ backgroundImage: 'url(' + config.assets.hero + ')' }} aria-hidden="true" />
      <span className="opening-moment__veil" aria-hidden="true" />
      <span className="opening-moment__content">
        <span className="opening-moment__ring" aria-hidden="true"><i /><i /><i /></span>
        <strong>NV</strong>
        <span className="opening-moment__names">Nandha Kishore <em>&amp;</em> Vani</span>
        <small>{copy.celebration}</small>
        <span className="opening-moment__enter">{copy.enter}</span>
      </span>
    </button>
  );
}
