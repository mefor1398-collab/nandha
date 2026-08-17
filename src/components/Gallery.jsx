import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Gallery({ images }) {
  const [active, setActive] = useState(null);
  const startX = useRef(0);

  const previous = () => setActive((current) => (current + images.length - 1) % images.length);
  const next = () => setActive((current) => (current + 1) % images.length);

  useEffect(() => {
    function onKey(event) {
      if (active === null) return;
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, images.length]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <motion.button
            type="button"
            className={'gallery-tile gallery-tile--' + ((index % 5) + 1)}
            key={image.alt}
            onClick={() => setActive(index)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
          >
            <img src={image.src} alt={image.alt} loading="lazy" style={{ objectPosition: image.position }} />
            <span className="gallery-tile__veil" aria-hidden="true" />
            <span className="gallery-tile__expand">View frame</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Wedding gallery image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button className="lightbox__close" type="button" onClick={() => setActive(null)} aria-label="Close image"><X size={22} /></button>
            <button className="lightbox__nav lightbox__nav--previous" type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous photo"><ChevronLeft /></button>
            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => { startX.current = event.touches[0].clientX; }}
              onTouchEnd={(event) => {
                const difference = event.changedTouches[0].clientX - startX.current;
                if (difference > 48) previous();
                if (difference < -48) next();
              }}
            >
              <img src={images[active].src} alt={images[active].alt} style={{ objectPosition: images[active].position }} />
              <figcaption>{active + 1} / {images.length}</figcaption>
            </motion.figure>
            <button className="lightbox__nav lightbox__nav--next" type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next photo"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
