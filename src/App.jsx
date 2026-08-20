import { useEffect, useMemo, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, CalendarDays, CarFront, ChevronRight, Heart, MapPin,
  MessageCircle, Phone, Share2, Sparkles, Utensils, Navigation,
} from 'lucide-react';
import { weddingConfig } from './data/wedding.config';
import { scrollToId, weddingStage } from './utils';
import Countdown from './components/Countdown';
import SectionHeading from './components/SectionHeading';
import EventCard from './components/EventCard';
import Accordion from './components/Accordion';
import RSVPFlow from './components/RSVPFlow';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import BlessingPicker from './components/BlessingPicker';
import MusicToggle from './components/MusicToggle';
import OpeningMoment from './components/OpeningMoment';
import WeddingDayPanel from './components/WeddingDayPanel';
import ShareCardButton from './components/ShareCardButton';
import { premiumCopy } from './data/premium.copy';

const petals = Array.from({ length: 13 }, (_, index) => index);
const fireworkBursts = [
  { x: '18%', y: '24%', delay: '0s', color: '#f2d39a' },
  { x: '79%', y: '20%', delay: '.65s', color: '#e8b8c2' },
  { x: '48%', y: '38%', delay: '1.3s', color: '#fff4e5' },
  { x: '87%', y: '48%', delay: '1.95s', color: '#a5d6c5' },
  { x: '12%', y: '53%', delay: '2.6s', color: '#efa98e' },
];

function formatHeroDate(date, locale) {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
}

function invitationUrl() {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  return url.toString();
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const config = weddingConfig;
  const copy = premiumCopy;
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [groomFirstName, ...groomLastNameParts] = config.couple.firstName.split(' ');
  const groomLastName = groomLastNameParts.join(' ');
  const [progress, setProgress] = useState(0);
  const [heroFade, setHeroFade] = useState(0);
  const events = useMemo(() => config.celebrations.filter((event) => event.enabled), [config.celebrations]);
  const previewStage = new URLSearchParams(window.location.search).get('premium-preview');
  const stage = ['weddingDay', 'ceremonyLive', 'postWedding'].includes(previewStage) ? previewStage : weddingStage(weddingConfig, currentTime);
  const isPostWedding = stage === 'postWedding';
  const isWeddingDay = stage === 'weddingDay' || stage === 'ceremonyLive';
  const muhurtham = events.find((event) => event.id === config.premium.muhurthamEventId);
  const creatorWhatsAppUrl = 'https://wa.me/' + config.craftedBy.whatsappPhone + '?text=' + encodeURIComponent('Hello Muralee, I discovered the Nandha & Vani invitation and would love to create a beautiful digital invitation for my celebration.');
  const shareCard = {
    image: config.assets.hero,
    ...config.premium.shareCard,
    link: invitationUrl().replace(/^https?:\/\//, ''),
    shareText: 'Join us to celebrate ' + config.couple.firstName + ' & ' + config.couple.secondName + '. ' + invitationUrl(),
  };

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = config.couple.firstName + ' & ' + config.couple.secondName + ' — The Celebration';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0);
      const fadeStart = window.innerHeight * 0.05;
      const fadeDistance = window.innerHeight * 0.72;
      setHeroFade(Math.min(1, Math.max(0, (window.scrollY - fadeStart) / fadeDistance)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [config.couple.firstName, config.couple.secondName]);

  const themeStyle = {
    '--ink': config.theme.ink,
    '--ink-soft': config.theme.inkSoft,
    '--rose': config.theme.rose,
    '--rose-pale': config.theme.rosePale,
    '--ivory': config.theme.ivory,
    '--sand': config.theme.sand,
    '--brass': config.theme.brass,
  };

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
    <div className="site-shell" style={themeStyle}>
      <OpeningMoment config={config} copy={copy.ui.opening} reducedMotion={prefersReducedMotion} />
      <a className="skip-link" href="#main-content">Skip to invitation details</a>
      <div className="scroll-progress" style={{ transform: 'scaleX(' + progress / 100 + ')' }} aria-hidden="true" />

      <section className="hero" aria-label="Wedding invitation" style={{ opacity: 1 - heroFade }}>
        <div className="hero__image-wrap">
          <img src={config.assets.hero} alt="" className="hero__image" style={{ objectPosition: config.assets.heroPosition }} fetchPriority="high" />
          <div className="hero__image-overlay" />
        </div>
        <div className="hero__petals" aria-hidden="true">
          {petals.map((petal) => (
            <i className={'petal petal--' + (petal % 5)} style={{ '--petal-index': petal }} key={petal} />
          ))}
        </div>
        {isPostWedding && (
          <div className="fireworks" aria-hidden="true">
            {fireworkBursts.map((burst, burstIndex) => (
              <span className="firework" key={burstIndex} style={{ '--x': burst.x, '--y': burst.y, '--delay': burst.delay, '--firework-color': burst.color }}>
                {Array.from({ length: 12 }, (_, sparkIndex) => (
                  <i key={sparkIndex} style={{ '--angle': sparkIndex * 30 + 'deg', '--distance': 66 + (sparkIndex % 3) * 12 + 'px', '--distance-far': 81 + (sparkIndex % 3) * 15 + 'px', '--spark-delay': (sparkIndex % 2) * 0.035 + 's' }} />
                ))}
              </span>
            ))}
          </div>
        )}
        <header className="hero__nav container">
          <button className="wordmark" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            <span>{config.couple.firstName.charAt(0) + config.couple.secondName.charAt(0)}</span>
          </button>
          <nav aria-label="Invitation navigation">
            {config.navigation.map((item) => <button type="button" key={item.target} onClick={() => scrollToId(item.target)}>{item.label}</button>)}
          </nav>
          <MusicToggle music={config.music} />
        </header>
        <div className="hero__content container">
          <div className="hero__identity">
            {isPostWedding ? (
              <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65 }}>
                {config.postWedding.eyebrow}
              </motion.p>
            ) : (
              <motion.img className="vinayagar" src={config.assets.vinayagar} alt="Vinayagar" initial={{ opacity: 0, scale: 0.84 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.6 }} />
            )}
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
              {isPostWedding ? config.postWedding.title : <><span className="hero__groom-name"><span className="hero__groom-first">{groomFirstName}</span><span className="hero__groom-last">{groomLastName}</span></span><em>&</em><span className="hero__bride-name">{config.couple.secondName}</span></>}
            </motion.h1>
          </div>
          <div className="hero__details">
            <motion.p className="hero__line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.8 }}>
              {isPostWedding ? config.postWedding.copy : config.couple.invitationLine}
            </motion.p>
            {!isPostWedding && <motion.div className="hero__date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78, duration: 0.7 }}><span>{formatHeroDate(config.couple.date, copy.locale)}</span><i /> <span>{config.couple.location}</span></motion.div>}
            {!isPostWedding && <motion.div className="hero__countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.75 }}><Countdown date={config.couple.date} stage={stage} copy={copy.ui.countdown} /></motion.div>}
            <motion.button className="begin-button" type="button" onClick={() => scrollToId(isPostWedding ? 'gallery' : 'story')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.75 }}>
              {isPostWedding ? copy.ui.hero.revisit : copy.ui.hero.begin} <ArrowDown size={16} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
        <p className="hero__date-status">{isWeddingDay ? copy.ui.hero.today : ''}</p>
      </section>

      <main id="main-content">
        {isWeddingDay && muhurtham && <WeddingDayPanel state={stage} event={muhurtham} ui={copy.ui.dayPanel} />}
        {!isPostWedding && (
          <>
            <section className="story section section--ivory" id="story">
              <div className="container">
                <SectionHeading eyebrow={copy.ui.story.eyebrow} title={copy.ui.story.title} copy={config.couple.cultureLine} />
                <div className="story-timeline">
                  {config.story.map((chapter, index) => (
                    <motion.article className={'story-card story-card--' + (index % 2 ? 'right' : 'left')} key={chapter.year} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
                      <div className="story-card__image">
                        <img src={chapter.image} alt="" loading="lazy" style={{ objectPosition: chapter.position }} />
                        <span>{chapter.year}</span>
                      </div>
                      <div className="story-card__copy"><p className="eyebrow">Chapter {String(index + 1).padStart(2, '0')}</p><h3>{chapter.title}</h3><p>{chapter.copy}</p></div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            <section className="celebrations section section--ink" id="celebrations">
              <div className="container">
                <SectionHeading light eyebrow={copy.ui.celebrations.eyebrow} title={copy.ui.celebrations.title} copy={copy.ui.celebrations.copy} />
                <div className="event-grid">
                  {events.map((event, index) => <EventCard key={event.id} event={event} couple={config.couple} index={index} copy={copy.ui.event} />)}
                </div>
              </div>
            </section>

            <section className="venue section section--sand" id="venue">
              <div className="container">
                <SectionHeading eyebrow={copy.ui.venue.eyebrow} title={copy.ui.venue.title} copy={config.venue.arrivalNote} />
                <div className="venue-grid">
                  <motion.div className="venue-map" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.78, ease: [0.2, 0.7, 0.2, 1] }}>
                    <iframe title={'Map to ' + config.venue.name} loading="lazy" src={'https://www.google.com/maps?q=' + encodeURIComponent(config.venue.address) + '&output=embed'} />
                    <a href={config.venue.mapsUrl} target="_blank" rel="noreferrer" className="map-cta"><Navigation size={16} /> {copy.ui.venue.map}</a>
                  </motion.div>
                  <motion.div className="venue-details" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.78, delay: 0.08, ease: [0.2, 0.7, 0.2, 1] }}>
                    <p className="eyebrow">{copy.ui.venue.label}</p>
                    <h3>{config.venue.name}</h3>
                    <address>{config.venue.address}</address>
                    <div className="venue-actions">
                      <a className="button button--dark" href={config.venue.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> {copy.ui.venue.getDirections}</a>
                      {config.venue.whatsappPhone && <a className="button button--outline" href={'https://wa.me/' + config.venue.whatsappPhone} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {copy.ui.venue.whatsapp}</a>}
                    </div>
                    <ul className="travel-list">
                      <li><CarFront size={17} aria-hidden="true" /><span><strong>{copy.ui.venue.parking}</strong>{config.venue.parking}</span></li>
                      <li><Heart size={17} aria-hidden="true" /><span><strong>{copy.ui.venue.stayNearby}</strong>{config.venue.accommodation}</span></li>
                      <li><Navigation size={17} aria-hidden="true" /><span><strong>{copy.ui.venue.gettingThere}</strong>{config.venue.transport}</span></li>
                    </ul>
                  </motion.div>
                </div>
                <motion.div className="faq-wrap" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}>
                  <div><p className="eyebrow">{copy.ui.venue.notesEyebrow}</p><h3>{copy.ui.venue.notesTitle}</h3><p>{copy.ui.venue.notesCopy}</p>{config.venue.organiserPhone && <a href={'tel:' + config.venue.organiserPhone} className="text-button"><Phone size={15} /> {copy.ui.venue.call}</a>}</div>
                  <Accordion items={config.faq} />
                </motion.div>
              </div>
            </section>

            {config.rsvp.enabled && (
              <section className="rsvp section section--rose" id="rsvp">
                <div className="container rsvp-layout">
                  <div className="rsvp-intro">
                    <p className="eyebrow">Kindly respond by {config.rsvp.deadline}</p>
                    <h2>Will you join our most beautiful day?</h2>
                    <p>Every yes feels like a little more light around us. This will take less than a minute.</p>
                    <div className="rsvp-intro__ornament" aria-hidden="true"><Sparkles size={35} /><span>with love</span></div>
                  </div>
                  <div className="rsvp-panel"><RSVPFlow config={config.rsvp} celebrations={events} /></div>
                </div>
              </section>
            )}
          </>
        )}

        <section className="gallery section section--ivory" id="gallery">
          <div className="container">
            <SectionHeading eyebrow={isPostWedding ? copy.ui.gallery.afterEyebrow : copy.ui.gallery.upcomingEyebrow} title={isPostWedding ? copy.ui.gallery.afterTitle : copy.ui.gallery.upcomingTitle} copy={isPostWedding ? copy.ui.gallery.afterCopy : copy.ui.gallery.upcomingCopy} />
            <Gallery images={config.assets.gallery} />
          </div>
        </section>

        <section className="family section section--ink">
          <div className="container">
            <SectionHeading light eyebrow={copy.ui.family.eyebrow} title={copy.ui.family.title} />
            <div className="family-grid">
              {[config.family.bride, config.family.groom].map((family, index) => <motion.article className="family-card" key={family.relation} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.68, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}><p>{family.heading}</p><h3>{family.relation}</h3>{family.names.map((name) => <span key={name}>{name}</span>)}</motion.article>)}
            </div>
            <motion.blockquote className="blessing-quote" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.78, ease: [0.2, 0.7, 0.2, 1] }}><p>{config.family.quote.english}</p>{config.family.quote.native && <span>{config.family.quote.native}</span>}<cite>{config.family.quote.attribution}</cite></motion.blockquote>
            <BlessingPicker copy={copy.ui.blessingPicker} />
          </div>
        </section>

        {config.guestbook.enabled && (
          <section className="guestbook section section--sand" id="wishes">
            <div className="container guestbook-layout">
              <motion.div initial={{ opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.72, ease: [0.2, 0.7, 0.2, 1] }}><p className="eyebrow">{copy.ui.wishes.eyebrow}</p><h2>{copy.ui.wishes.title}</h2><p>{copy.ui.wishes.copy}</p><div className="hashtag"><Share2 size={15} /><span>{config.guestbook.hashtag}</span><ShareCardButton card={shareCard} copy={copy.ui.share} /></div></motion.div>
              <Guestbook hashtag={config.guestbook.hashtag} copy={copy.ui.guestbook} />
            </div>
          </section>
        )}
      </main>

      <motion.div className="floating-actions" aria-label="Quick actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.6 }}>
        {!isPostWedding && config.rsvp.enabled && <button type="button" onClick={() => scrollToId('rsvp')}><Heart size={17} /> <span>RSVP</span></button>}
        {!isPostWedding && <a href={config.venue.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> <span>{copy.ui.event.directions}</span></a>}
      </motion.div>

      <motion.footer className="footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <p>{config.couple.firstName} <span>&</span> {config.couple.secondName}</p>
        <small>{copy.ui.footer.madeWithCare}</small>
        <div className="footer-promo">
          <span className="footer-promo__eyebrow">{copy.ui.footer.promoEyebrow}</span>
          <strong>{copy.ui.footer.promoTitle}</strong>
          <p>{copy.ui.footer.promoCopy}</p>
          <a href={creatorWhatsAppUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> {copy.ui.footer.promoAction}</a>
        </div>
        <small className="footer-credit">{copy.ui.footer.craftedBy} <strong>{config.craftedBy.name}</strong> <span>— {config.craftedBy.role}</span></small>
        <nav className="footer-links" aria-label="Creator links">
          {config.craftedBy.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ChevronRight size={13} aria-hidden="true" /></a>)}
        </nav>
      </motion.footer>
    </div>
    </MotionConfig>
  );
}
