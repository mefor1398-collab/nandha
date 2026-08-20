import { CalendarPlus, Clock3, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { calendarUrl } from '../utils';

export default function EventCard({ event, couple, index, copy }) {
  return (
    <motion.article
      className="event-card"
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="event-card__topline">
        <p>{event.date}</p>
        <span>{event.attire}</span>
      </div>
      <h3>{event.label}</h3>
      <p className="event-card__description">{event.description}</p>
      <dl>
        <div><dt><Clock3 size={15} aria-hidden="true" /> {copy.time}</dt><dd>{event.start} – {event.end}</dd></div>
        <div><dt><MapPin size={15} aria-hidden="true" /> {copy.venue}</dt><dd>{event.venue}</dd></div>
      </dl>
      <div className="event-card__actions">
        <a href={calendarUrl(event, couple)} target="_blank" rel="noreferrer"><CalendarPlus size={15} aria-hidden="true" /> {copy.addToCalendar}</a>
        <a href={event.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={15} aria-hidden="true" /> {copy.directions}</a>
      </div>
    </motion.article>
  );
}
