import { useState } from 'react';

const blessings = {
  Love: 'May your home always be the softest place to land.',
  Joy: 'May ordinary days give you reasons to celebrate.',
  Prosperity: 'May every shared dream find its season to bloom.',
  Togetherness: 'May every road ahead feel lighter, side by side.',
};

export default function BlessingPicker() {
  const [selected, setSelected] = useState('');
  return (
    <div className="blessing-picker">
      <p className="eyebrow">Leave a quiet blessing</p>
      <div className="blessing-picker__options">
        {Object.keys(blessings).map((blessing) => (
          <button type="button" key={blessing} className={selected === blessing ? 'is-selected' : ''} onClick={() => setSelected(blessing)}>{blessing}</button>
        ))}
      </div>
      <p className="blessing-picker__message" aria-live="polite">{selected ? blessings[selected] : 'Choose a word for the journey ahead.'}</p>
    </div>
  );
}
