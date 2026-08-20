import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlessingPicker({ copy }) {
  const [selected, setSelected] = useState('');
  const selectedBlessing = copy.options.find((option) => option.label === selected);
  useEffect(() => setSelected(''), [copy]);
  return (
    <motion.div className="blessing-picker" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <div className="blessing-picker__options">
        {copy.options.map((blessing) => (
          <button type="button" key={blessing.label} className={selected === blessing.label ? 'is-selected' : ''} onClick={() => setSelected(blessing.label)}>{blessing.label}</button>
        ))}
      </div>
      <p className="blessing-picker__message" aria-live="polite">{selectedBlessing ? selectedBlessing.message : copy.prompt}</p>
    </motion.div>
  );
}
