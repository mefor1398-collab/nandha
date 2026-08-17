import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

export default function MusicToggle({ music }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!music.enabled || !music.src) return undefined;
    audio.current = new Audio(music.src);
    audio.current.loop = true;
    const saved = localStorage.getItem('wedding-music-preference');
    if (saved === 'on') {
      audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    return () => audio.current?.pause();
  }, [music.enabled, music.src]);

  if (!music.enabled || !music.src) return null;

  function toggle() {
    if (playing) {
      audio.current.pause();
      localStorage.setItem('wedding-music-preference', 'off');
      setPlaying(false);
    } else {
      audio.current.play().then(() => {
        localStorage.setItem('wedding-music-preference', 'on');
        setPlaying(true);
      });
    }
  }

  return <button className="music-toggle" type="button" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={15} /> : <Play size={15} />}<Volume2 size={14} /> {playing ? 'Pause sound' : 'Play sound'}</button>;
}
