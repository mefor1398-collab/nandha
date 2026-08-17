import { CalendarPlus, Clock3, MapPin, Navigation } from 'lucide-react';
import { calendarUrl } from '../utils';

export default function EventCard({ event, couple, index }) {
  return (
    <article className="event-card">
      <span className="event-card__index">0{index + 1}</span>
      <div className="event-card__topline">
        <p>{event.date}</p>
        <span>{event.attire}</span>
      </div>
      <h3>{event.label}</h3>
      <p className="event-card__description">{event.description}</p>
      <dl>
        <div><dt><Clock3 size={15} aria-hidden="true" /> Time</dt><dd>{event.start} – {event.end}</dd></div>
        <div><dt><MapPin size={15} aria-hidden="true" /> Venue</dt><dd>{event.venue}</dd></div>
      </dl>
      <div className="event-card__actions">
        <a href={calendarUrl(event, couple)} target="_blank" rel="noreferrer"><CalendarPlus size={15} aria-hidden="true" /> Add to calendar</a>
        <a href={event.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={15} aria-hidden="true" /> Directions</a>
      </div>
    </article>
  );
}
