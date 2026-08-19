import { useEffect, useMemo, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, CalendarDays, CarFront, ChevronRight, Heart, MapPin,
  MessageCircle, Phone, Share2, Sparkles, Utensils, Navigation,
} from 'lucide-react';
import { weddingConfig } from './data/wedding.config';
import { scrollToId, weddingMoment } from './utils';
import Countdown from './components/Countdown';
import SectionHeading from './components/SectionHeading';
import EventCard from './components/EventCard';
import Accordion from './components/Accordion';
import RSVPFlow from './components/RSVPFlow';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import BlessingPicker from './components/BlessingPicker';
import MusicToggle from './components/MusicToggle';

const petals = Array.from({ length: 13 }, (_, index) => index);

function formatHeroDate(date) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
}

export default function App() {
  const config = weddingConfig;
  const prefersReducedMotion = useReducedMotion();
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [groomFirstName, ...groomLastNameParts] = config.couple.firstName.split(' ');
  const groomLastName = groomLastNameParts.join(' ');
  const [progress, setProgress] = useState(0);
  const [shared, setShared] = useState(false);
  const events = useMemo(() => config.celebrations.filter((event) => event.enabled), [config.celebrations]);
  const isPostWedding = config.mode === 'postWedding' || currentTime >= new Date(config.couple.date).getTime();
  const dateStatus = weddingMoment(config.couple.date);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = config.couple.firstName + ' & ' + config.couple.secondName + ' — The Celebration';
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [config.couple.firstName, config.couple.secondName]);

  async function shareInvitation() {
    const data = {
      title: config.couple.firstName + ' & ' + config.couple.secondName,
      text: 'Join us to celebrate ' + config.couple.firstName + ' & ' + config.couple.secondName + '.',
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      // A guest choosing to cancel the native share sheet needs no message.
    }
  }

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
      <a className="skip-link" href="#main-content">Skip to invitation details</a>
      <div className="scroll-progress" style={{ transform: 'scaleX(' + progress / 100 + ')' }} aria-hidden="true" />

      <section className="hero" aria-label="Wedding invitation">
        <div className="hero__image-wrap">
          <img src={config.assets.hero} alt="" className="hero__image" style={{ objectPosition: config.assets.heroPosition }} fetchPriority="high" />
          <div className="hero__image-overlay" />
        </div>
        <div className="hero__petals" aria-hidden="true">
          {petals.map((petal) => (
            <i className={'petal petal--' + (petal % 5)} style={{ '--petal-index': petal }} key={petal} />
          ))}
        </div>
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
            {!isPostWedding && <motion.div className="hero__date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78, duration: 0.7 }}><span>{formatHeroDate(config.couple.date)}</span><i /> <span>{config.couple.location}</span></motion.div>}
            {!isPostWedding && <motion.div className="hero__countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.75 }}><Countdown date={config.couple.date} /></motion.div>}
            <motion.button className="begin-button" type="button" onClick={() => scrollToId(isPostWedding ? 'gallery' : 'story')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.75 }}>
              {isPostWedding ? 'Revisit the moments' : 'Begin the celebration'} <ArrowDown size={16} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
        <p className="hero__date-status">{dateStatus === 'today' && !isPostWedding ? 'Today is the day' : ''}</p>
      </section>

      <main id="main-content">
        {!isPostWedding && (
          <>
            <section className="story section section--ivory" id="story">
              <div className="container">
                <SectionHeading eyebrow="A little story" title="Some things simply feel like home." copy={config.couple.cultureLine} />
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
                <SectionHeading light eyebrow="Mark the moments" title="Come for a moment. Stay for the story." copy="Every gathering has its own mood, but all are made brighter by the people we love." />
                <div className="event-grid">
                  {events.map((event, index) => <EventCard key={event.id} event={event} couple={config.couple} index={index} />)}
                </div>
              </div>
            </section>

            <section className="venue section section--sand" id="venue">
              <div className="container">
                <SectionHeading eyebrow="A place to gather" title="By the sea, with everyone we love." copy={config.venue.arrivalNote} />
                <div className="venue-grid">
                  <div className="venue-map">
                    <iframe title={'Map to ' + config.venue.name} loading="lazy" src={'https://www.google.com/maps?q=' + encodeURIComponent(config.venue.address) + '&output=embed'} />
                    <a href={config.venue.mapsUrl} target="_blank" rel="noreferrer" className="map-cta"><Navigation size={16} /> Open directions</a>
                  </div>
                  <div className="venue-details">
                    <p className="eyebrow">The venue</p>
                    <h3>{config.venue.name}</h3>
                    <address>{config.venue.address}</address>
                    <div className="venue-actions">
                      <a className="button button--dark" href={config.venue.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Get directions</a>
                      {config.venue.whatsappPhone && <a className="button button--outline" href={'https://wa.me/' + config.venue.whatsappPhone} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp help</a>}
                    </div>
                    <ul className="travel-list">
                      <li><CarFront size={17} aria-hidden="true" /><span><strong>Parking</strong>{config.venue.parking}</span></li>
                      <li><Heart size={17} aria-hidden="true" /><span><strong>Stay nearby</strong>{config.venue.accommodation}</span></li>
                      <li><Navigation size={17} aria-hidden="true" /><span><strong>Getting there</strong>{config.venue.transport}</span></li>
                    </ul>
                  </div>
                </div>
                <div className="faq-wrap">
                  <div><p className="eyebrow">A few helpful notes</p><h3>Everything you may be wondering.</h3><p>For anything else, please contact the family directly.</p>{config.venue.organiserPhone && <a href={'tel:' + config.venue.organiserPhone} className="text-button"><Phone size={15} /> Call the organiser</a>}</div>
                  <Accordion items={config.faq} />
                </div>
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
            <SectionHeading eyebrow={isPostWedding ? 'The celebration, remembered' : 'Frames of us'} title={isPostWedding ? 'All the moments we will keep.' : 'A collection of moments, waiting to grow.'} copy={isPostWedding ? 'The music, the laughter, the people we love—thank you for making it unforgettable.' : 'A few temporary frames for now. Soon, this will be filled with all the little moments from our journey.'} />
            <Gallery images={config.assets.gallery} />
          </div>
        </section>

        <section className="family section section--ink">
          <div className="container">
            <SectionHeading light eyebrow="Family & blessings" title="Rooted in love, surrounded by grace." />
            <div className="family-grid">
              {[config.family.bride, config.family.groom].map((family) => <article className="family-card" key={family.relation}><p>{family.heading}</p><h3>{family.relation}</h3>{family.names.map((name) => <span key={name}>{name}</span>)}</article>)}
            </div>
            <blockquote className="blessing-quote"><p>{config.family.quote.english}</p><span>{config.family.quote.native}</span><cite>{config.family.quote.attribution}</cite></blockquote>
            <BlessingPicker />
          </div>
        </section>

        {config.guestbook.enabled && (
          <section className="guestbook section section--sand" id="wishes">
            <div className="container guestbook-layout">
              <div><p className="eyebrow">A place for your blessings</p><h2>Send a wish they will treasure.</h2><p>Share a blessing, a memory, or a few words for the beautiful journey Nandha Kishore and Vani are beginning together.</p><div className="hashtag"><Share2 size={15} /><span>{config.guestbook.hashtag}</span><button type="button" onClick={shareInvitation}>{shared ? 'Link copied' : 'Share invitation'}</button></div></div>
              <Guestbook hashtag={config.guestbook.hashtag} />
            </div>
          </section>
        )}
      </main>

      <div className="floating-actions" aria-label="Quick actions">
        {!isPostWedding && config.rsvp.enabled && <button type="button" onClick={() => scrollToId('rsvp')}><Heart size={17} /> <span>RSVP</span></button>}
        {!isPostWedding && <a href={config.venue.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> <span>Directions</span></a>}
      </div>

      <footer className="footer">
        <p>{config.couple.firstName} <span>&</span> {config.couple.secondName}</p>
        <small>Made with care for the people who matter most.</small>
        <small className="footer-credit">Crafted by <strong>{config.craftedBy.name}</strong> <span>— {config.craftedBy.role}</span></small>
        <nav className="footer-links" aria-label="Creator links">
          {config.craftedBy.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ChevronRight size={13} aria-hidden="true" /></a>)}
        </nav>
      </footer>
    </div>
    </MotionConfig>
  );
}
