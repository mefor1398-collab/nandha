import { CalendarClock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeddingDayPanel({ state, event, ui }) {
  const isLive = state === 'ceremonyLive';

  return (
    <section className="wedding-day-panel" aria-label={ui.dayEyebrow}>
      <motion.div className="container wedding-day-panel__inner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}>
        <div>
          <p className="eyebrow">{isLive ? ui.liveEyebrow : ui.dayEyebrow}</p>
          <h2>{isLive ? ui.liveTitle : ui.dayTitle}</h2>
          <p>{isLive ? ui.liveCopy : ui.dayCopy}</p>
        </div>
        <div className="wedding-day-panel__details">
          <p><CalendarClock size={17} aria-hidden="true" /><span><strong>{ui.nextMoment}</strong>{event.start} – {event.end}</span></p>
          <p><MapPin size={17} aria-hidden="true" /><span><strong>{ui.venue}</strong>{event.venue}</span></p>
          <a href={event.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={16} aria-hidden="true" /> {ui.directions}</a>
        </div>
      </motion.div>
    </section>
  );
}
