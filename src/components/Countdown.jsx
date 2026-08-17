import { useEffect, useState } from 'react';
import { dateParts, weddingMoment } from '../utils';

export default function Countdown({ date }) {
  const [parts, setParts] = useState(() => dateParts(date));
  const moment = weddingMoment(date);

  useEffect(() => {
    const update = () => setParts(dateParts(date));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [date]);

  if (moment === 'after') {
    return <p className="countdown-message">The celebration lives on in every memory.</p>;
  }

  if (moment === 'today') {
    return <p className="countdown-message">The celebration is today. We cannot wait to welcome you.</p>;
  }

  const units = [
    ['Days', parts?.days ?? 0],
    ['Hours', parts?.hours ?? 0],
    ['Minutes', parts?.minutes ?? 0],
    ['Seconds', parts?.seconds ?? 0],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {units.map(([label, value]) => (
        <div className="countdown__unit" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
