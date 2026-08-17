import { useState } from 'react';
import { Check, ChevronRight, Heart, Send } from 'lucide-react';
import { rsvpService } from '../services/rsvpService';

const initialForm = {
  guestName: '', attendance: 'yes', guests: '1', events: [], meal: '', note: '',
};

export default function RSVPFlow({ config, celebrations }) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState('form');
  const [error, setError] = useState('');

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggleEvent = (event) => {
    setForm((current) => ({
      ...current,
      events: current.events.includes(event)
        ? current.events.filter((item) => item !== event)
        : [...current.events, event],
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (form.attendance === 'yes' && form.events.length === 0) {
      setError('Please choose the celebrations you will be joining.');
      return;
    }
    setError('');
    setState('sending');
    try {
      await rsvpService.submit(form);
      setState('success');
    } catch {
      setState('form');
      setError('We could not save your RSVP just now. Please try again.');
    }
  }

  if (state === 'success') {
    return (
      <div className="rsvp-success" aria-live="polite">
        <span className="rsvp-success__halo"><Check size={30} aria-hidden="true" /></span>
        <p className="eyebrow">Received with joy</p>
        <h3>Thank you, {form.guestName.split(' ')[0]}.</h3>
        <p>{form.attendance === 'yes' ? 'Your place in the celebration is saved. We cannot wait to see you.' : 'Thank you for letting us know. You will be dearly missed.'}</p>
        <button type="button" className="text-button" onClick={() => { setState('form'); setForm(initialForm); }}>Send another RSVP <ChevronRight size={15} /></button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="form-step">
        <span className="form-step__number">01</span>
        <div>
          <label htmlFor="guestName">Your name or family name</label>
          <input id="guestName" required value={form.guestName} onChange={(e) => update('guestName', e.target.value)} placeholder="e.g. The Krishnan family" autoComplete="name" />
        </div>
      </div>
      <fieldset className="form-step">
        <legend><span className="form-step__number">02</span> Will you be joining us?</legend>
        <div className="choice-row">
          <label className={'choice-card' + (form.attendance === 'yes' ? ' is-selected' : '')}>
            <input type="radio" name="attendance" value="yes" checked={form.attendance === 'yes'} onChange={(e) => update('attendance', e.target.value)} />
            <Heart size={16} aria-hidden="true" /> Joyfully accepting
          </label>
          <label className={'choice-card' + (form.attendance === 'no' ? ' is-selected' : '')}>
            <input type="radio" name="attendance" value="no" checked={form.attendance === 'no'} onChange={(e) => update('attendance', e.target.value)} />
            With love, declining
          </label>
        </div>
      </fieldset>
      {form.attendance === 'yes' && (
        <>
          <div className="form-step">
            <span className="form-step__number">03</span>
            <div>
              <label htmlFor="guestCount">How many will be attending?</label>
              <select id="guestCount" value={form.guests} onChange={(e) => update('guests', e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map((count) => <option value={count} key={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}
              </select>
            </div>
          </div>
          <fieldset className="form-step">
            <legend><span className="form-step__number">04</span> Which moments will you join?</legend>
            <div className="event-checks">
              {celebrations.map((event) => (
                <label key={event.id} className={form.events.includes(event.id) ? 'is-selected' : ''}>
                  <input type="checkbox" checked={form.events.includes(event.id)} onChange={() => toggleEvent(event.id)} />
                  <span>{event.label}</span><small>{event.date.replace('December', 'Dec')}</small>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-step">
            <span className="form-step__number">05</span>
            <div>
              <label htmlFor="meal">Meal preference <em>(optional)</em></label>
              <select id="meal" value={form.meal} onChange={(e) => update('meal', e.target.value)}>
                <option value="">Select a preference</option>
                {config.mealOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </div>
          </div>
        </>
      )}
      <div className="form-step">
        <span className="form-step__number">{form.attendance === 'yes' ? '06' : '03'}</span>
        <div>
          <label htmlFor="note">A note for the couple <em>(optional)</em></label>
          <textarea id="note" rows="3" value={form.note} onChange={(e) => update('note', e.target.value)} placeholder="A little wish, dietary request, or message…" />
        </div>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button--dark button--full" disabled={state === 'sending'} type="submit">
        {state === 'sending' ? 'Sending your response…' : 'Send RSVP'} <Send size={16} aria-hidden="true" />
      </button>
      <p className="form-privacy">Your response is private and visible only to the hosts.</p>
    </form>
  );
}
