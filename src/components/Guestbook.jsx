import { useEffect, useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { guestbookService } from '../services/rsvpService';

export default function Guestbook({ hashtag, copy }) {
  const [form, setForm] = useState({ name: '', relation: '', blessing: copy.blessings[0], message: '' });
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, blessing: copy.blessings[0] }));
  }, [copy.blessings]);

  async function submit(event) {
    event.preventDefault();
    setPending(true);
    await guestbookService.submit(form);
    setSent(true);
    setPending(false);
  }

  if (sent) {
    return <motion.div className="wish-success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}><Heart size={22} fill="currentColor" aria-hidden="true" /><p>{copy.thanks}</p></motion.div>;
  }

  return (
    <motion.form className="guestbook-form" onSubmit={submit} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.72, ease: [0.2, 0.7, 0.2, 1] }}>
      <div className="wish-form__heading"><Heart size={17} fill="currentColor" aria-hidden="true" /><span>{copy.heading}</span></div>
      <label htmlFor="wish-name">{copy.name}</label>
      <input id="wish-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={copy.namePlaceholder} />
      <label htmlFor="wish-relation">{copy.relation} <em>{copy.optional}</em></label>
      <input id="wish-relation" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder={copy.relationPlaceholder} />
      <fieldset className="wish-choices">
        <legend>{copy.choices}</legend>
        <div>
          {copy.blessings.map((blessing) => (
            <label className={form.blessing === blessing ? 'is-selected' : ''} key={blessing}>
              <input type="radio" name="blessing" value={blessing} checked={form.blessing === blessing} onChange={(e) => setForm({ ...form, blessing: e.target.value })} />
              {blessing}
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="wish-message">{copy.message}</label>
      <textarea id="wish-message" required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={copy.messagePlaceholder} />
      <button className="button button--light" disabled={pending} type="submit">{pending ? copy.sending : copy.submit} <Send size={15} /></button>
      <p className="form-privacy">{copy.privacy}</p>
    </motion.form>
  );
}
