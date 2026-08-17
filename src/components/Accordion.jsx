import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = index === open;
        return (
          <div className="accordion__item" key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <ChevronDown aria-hidden="true" size={18} className={isOpen ? 'is-rotated' : ''} />
              </button>
            </h3>
            <div className={'accordion__panel' + (isOpen ? ' is-open' : '')}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
