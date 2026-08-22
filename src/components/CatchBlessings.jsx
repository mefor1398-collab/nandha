import { useEffect, useMemo, useState } from 'react';
import { Heart, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';

const GAME_SECONDS = 12;

function createTargets(count = 24) {
  const kinds = ['flower', 'flower', 'flower', 'flower', 'gold', 'leaf'];

  return Array.from({ length: count }, (_, index) => {
    const kind = kinds[index % kinds.length];
    return {
      id: index + 1,
      kind,
      x: 8 + Math.round(Math.random() * 84),
      delay: index * 390 + Math.round(Math.random() * 240),
      duration: 3100 + Math.round(Math.random() * 1250),
      drift: -24 + Math.round(Math.random() * 48),
      rotation: 130 + Math.round(Math.random() * 260),
    };
  });
}

function resultFor(score, results) {
  if (score >= 16) return results[2];
  if (score >= 8) return results[1];
  return results[0];
}

export default function CatchBlessings({ copy, creatorUrl, onSendWish, reducedMotion }) {
  const [phase, setPhase] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [caughtIds, setCaughtIds] = useState(() => new Set());
  const [announcement, setAnnouncement] = useState('');
  const result = useMemo(() => resultFor(score, copy.results), [copy.results, score]);

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    const ticker = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(ticker);
  }, [phase]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) setPhase('complete');
  }, [phase, timeLeft]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setPhase((current) => current === 'playing' ? 'paused' : current);
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  function startGame() {
    setTargets(createTargets(reducedMotion ? 18 : 24));
    setCaughtIds(new Set());
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setAnnouncement(copy.started);
    setPhase('playing');
  }

  function catchTarget(target) {
    if (phase !== 'playing' || caughtIds.has(target.id)) return;

    setCaughtIds((current) => {
      const next = new Set(current);
      next.add(target.id);
      return next;
    });

    const points = target.kind === 'leaf' ? -1 : target.kind === 'gold' ? 3 : 1;
    setScore((current) => Math.max(0, current + points));
    setAnnouncement(target.kind === 'leaf' ? copy.leafCaught : target.kind === 'gold' ? copy.goldCaught : copy.flowerCaught);
  }

  const gameActive = phase === 'playing' || phase === 'paused';

  return (
    <section className="blessing-game section" id="blessing-game" aria-labelledby="blessing-game-title">
      <div className="container blessing-game__layout">
        <div className="blessing-game__intro">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="blessing-game-title">{copy.title}</h2>
          <p>{copy.copy}</p>
          <div className="blessing-game__legend" aria-label={copy.legendLabel}>
            <span><i className="blessing-game__symbol blessing-game__symbol--flower" aria-hidden="true">✿</i>{copy.flowerLegend}</span>
            <span><i className="blessing-game__symbol blessing-game__symbol--gold" aria-hidden="true">✦</i>{copy.goldLegend}</span>
            <span><i className="blessing-game__symbol blessing-game__symbol--leaf" aria-hidden="true">❧</i>{copy.leafLegend}</span>
          </div>
        </div>

        <div className={'blessing-game__card blessing-game__card--' + phase}>
          <div className="blessing-game__status" aria-live="polite">
            <span>{copy.score}<strong>{score}</strong></span>
            <span>{copy.time}<strong>{timeLeft}</strong></span>
            {gameActive && (
              <button className="blessing-game__pause" type="button" onClick={() => setPhase(phase === 'playing' ? 'paused' : 'playing')}>
                {phase === 'playing' ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                {phase === 'playing' ? copy.pause : copy.resume}
              </button>
            )}
          </div>

          <div className={'blessing-game__arena' + (reducedMotion ? ' blessing-game__arena--still' : '')}>
            {phase === 'idle' && (
              <div className="blessing-game__welcome">
                <span className="blessing-game__welcome-mark" aria-hidden="true"><Heart size={23} /><Sparkles size={18} /></span>
                <h3>{copy.readyTitle}</h3>
                <p>{copy.instructions}</p>
                <button className="button button--dark" type="button" onClick={startGame}><Play size={15} aria-hidden="true" />{copy.start}</button>
              </div>
            )}

            {gameActive && targets.map((target) => {
              const caught = caughtIds.has(target.id);
              const symbol = target.kind === 'leaf' ? '❧' : target.kind === 'gold' ? '✦' : '✿';
              const label = target.kind === 'leaf' ? copy.leafTarget : target.kind === 'gold' ? copy.goldTarget : copy.flowerTarget;
              return (
                <button
                  className={'blessing-game__target blessing-game__target--' + target.kind + (caught ? ' is-caught' : '')}
                  disabled={caught || phase === 'paused'}
                  key={target.id}
                  onClick={() => catchTarget(target)}
                  style={{ '--target-x': target.x + '%', '--target-delay': target.delay + 'ms', '--target-duration': target.duration + 'ms', '--target-drift': target.drift + 'px', '--target-rotation': target.rotation + 'deg' }}
                  type="button"
                  aria-label={label}
                >
                  <span aria-hidden="true">{symbol}</span>
                </button>
              );
            })}

            {phase === 'paused' && <div className="blessing-game__paused"><Pause size={20} aria-hidden="true" /><strong>{copy.paused}</strong><span>{copy.pausedCopy}</span></div>}

            {phase === 'complete' && (
              <div className="blessing-game__result">
                <span className="blessing-game__result-mark" aria-hidden="true">✿</span>
                <p className="eyebrow">{copy.complete}</p>
                <h3>{result.title}</h3>
                <p>{result.message}</p>
                <strong>{score} {score === 1 ? copy.point : copy.points}</strong>
                <div className="blessing-game__result-actions">
                  <button className="button button--dark" type="button" onClick={startGame}><RotateCcw size={15} aria-hidden="true" />{copy.replay}</button>
                  <button className="button button--outline" type="button" onClick={onSendWish}><Heart size={15} aria-hidden="true" />{copy.sendWish}</button>
                </div>
                <small>{copy.promo} <a href={creatorUrl} target="_blank" rel="noreferrer">{copy.promoAction}</a></small>
              </div>
            )}
          </div>

          <p className="sr-only" aria-live="assertive">{announcement}</p>
        </div>
      </div>
    </section>
  );
}
