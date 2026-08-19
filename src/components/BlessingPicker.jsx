import { useState } from 'react';
import { motion } from 'framer-motion';

const blessings = {
  Love: 'May your home always be the softest place to land.',
  Joy: 'May ordinary days give you reasons to celebrate.',
  Prosperity: 'May every shared dream find its season to bloom.',
  Togetherness: 'May every road ahead feel lighter, side by side.',
};

export default function BlessingPicker() {
  const [selected, setSelected] = useState('');
  return (
    <motion.div className="blessing-picker" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
      <p className="eyebrow">Leave a quiet blessing</p>
      <div className="blessing-picker__options">
        {Object.keys(blessings).map((blessing) => (
          <button type="button" key={blessing} className={selected === blessing ? 'is-selected' : ''} onClick={() => setSelected(blessing)}>{blessing}</button>
        ))}
      </div>
      <p className="blessing-picker__message" aria-live="polite">{selected ? blessings[selected] : 'Choose a word for the journey ahead.'}</p>
    </motion.div>
  );
}
