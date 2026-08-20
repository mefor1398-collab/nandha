export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function calendarUrl(event, couple) {
  const start = new Date(event.calendarStart).toISOString().replace(/[-:]/g, '').replace('.000', '');
  const end = new Date(event.calendarEnd).toISOString().replace(/[-:]/g, '').replace('.000', '');
  const text = encodeURIComponent(event.label + ' · ' + couple.firstName + ' & ' + couple.secondName);
  const details = encodeURIComponent(event.description + ' Dress: ' + event.attire + '.');
  const location = encodeURIComponent(event.venue);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + text + '&dates=' + start + '/' + end + '&details=' + details + '&location=' + location;
}

export function dateParts(targetDate) {
  const remaining = new Date(targetDate).getTime() - Date.now();
  if (remaining <= 0) return null;
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
}

export function weddingMoment(date) {
  const now = new Date();
  const target = new Date(date);
  const sameDay = now.toDateString() === target.toDateString();
  if (sameDay) return 'today';
  if (now > target) return 'after';
  return 'before';
}

export function weddingStage(config, now = Date.now()) {
  if (config.mode === 'postWedding') return 'postWedding';
  const muhurtham = config.celebrations.find((event) => event.id === config.premium.muhurthamEventId);
  if (!muhurtham) return now >= new Date(config.couple.date).getTime() ? 'postWedding' : 'upcoming';

  const ceremonyStart = new Date(muhurtham.calendarStart).getTime();
  const ceremonyEnd = new Date(muhurtham.calendarEnd).getTime();
  const datePart = muhurtham.calendarStart.slice(0, 10);
  const dayStart = new Date(datePart + 'T00:00:00+05:30').getTime();

  if (now >= ceremonyEnd) return 'postWedding';
  if (now >= ceremonyStart) return 'ceremonyLive';
  if (now >= dayStart) return 'weddingDay';
  return 'upcoming';
}
