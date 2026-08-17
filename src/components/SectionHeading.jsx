import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <motion.header
      className={'section-heading' + (light ? ' section-heading--light' : '')}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </motion.header>
  );
}
