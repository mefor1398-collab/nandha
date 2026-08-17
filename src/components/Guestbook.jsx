import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { guestbookService } from '../services/rsvpService';

export default function Guestbook({ hashtag }) {
  const [form, setForm] = useState({ name: '', relation: '', blessing: 'Love & togetherness', message: '' });
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setPending(true);
    await guestbookService.submit(form);
    setSent(true);
    setPending(false);
  }

  if (sent) {
    return <div className="wish-success"><Heart size={22} fill="currentColor" aria-hidden="true" /><p>Thank you. Your blessing is now part of a keepsake for Nandha Kishore and Vani.</p></div>;
  }

  return (
    <form className="guestbook-form" onSubmit={submit}>
      <div className="wish-form__heading"><Heart size={17} fill="currentColor" aria-hidden="true" /><span>For the happy couple</span></div>
      <label htmlFor="wish-name">Your name</label>
      <input id="wish-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="How should we sign your blessing?" />
      <label htmlFor="wish-relation">Your family or relationship <em>(optional)</em></label>
      <input id="wish-relation" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="e.g. Family friend, colleague, cousin" />
      <fieldset className="wish-choices">
        <legend>Choose a blessing to send</legend>
        <div>
          {['Love & togetherness', 'Joy & laughter', 'Prosperity & grace'].map((blessing) => (
            <label className={form.blessing === blessing ? 'is-selected' : ''} key={blessing}>
              <input type="radio" name="blessing" value={blessing} checked={form.blessing === blessing} onChange={(e) => setForm({ ...form, blessing: e.target.value })} />
              {blessing}
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="wish-message">Your message</label>
      <textarea id="wish-message" required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write a blessing from the heart…" />
      <button className="button button--light" disabled={pending} type="submit">{pending ? 'Sending…' : 'Send your blessing'} <Send size={15} /></button>
      <p className="form-privacy">Your wish is private and will be shared only with the couple.</p>
    </form>
  );
}
