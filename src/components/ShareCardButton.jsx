import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCover(context, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawnWidth = image.width * scale;
  const drawnHeight = image.height * scale;
  const x = (width - drawnWidth) / 2;
  const y = (height - drawnHeight) * 0.22;
  context.drawImage(image, x, y, drawnWidth, drawnHeight);
}

function drawWrappedText(context, value, x, y, maxWidth, lineHeight) {
  const words = value.split(' ');
  let line = '';
  let currentY = y;
  words.forEach((word) => {
    const candidate = line ? line + ' ' + word : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = candidate;
    }
  });
  if (line) context.fillText(line, x, currentY);
  return currentY;
}

async function createCard(card) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  const { width, height } = canvas;

  context.fillStyle = '#153c2f';
  context.fillRect(0, 0, width, height);
  try {
    const image = await loadImage(card.image);
    drawCover(context, image, width, height);
  } catch {
    // The luxury colour field is still a complete card if an image is unavailable.
  }

  const veil = context.createLinearGradient(0, 0, 0, height);
  veil.addColorStop(0, 'rgba(10, 40, 30, 0.74)');
  veil.addColorStop(0.47, 'rgba(10, 40, 30, 0.08)');
  veil.addColorStop(1, 'rgba(10, 40, 30, 0.94)');
  context.fillStyle = veil;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(247, 229, 203, 0.68)';
  context.lineWidth = 2;
  context.strokeRect(54, 54, width - 108, height - 108);
  context.fillStyle = '#f4d7b2';
  context.font = '600 26px Manrope, Arial, sans-serif';
  context.letterSpacing = '5px';
  context.fillText('N  V', 86, 112);
  context.letterSpacing = '0px';

  context.fillStyle = '#fffaf2';
  context.font = '500 88px Georgia, serif';
  let y = drawWrappedText(context, card.englishNames, 84, 850, 825, 102);
  context.fillStyle = '#f2c7cd';
  context.font = '500 47px "Noto Serif Tamil", Georgia, serif';
  y = drawWrappedText(context, card.tamilNames, 86, y + 58, 820, 66);

  context.strokeStyle = 'rgba(244, 215, 178, 0.76)';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(86, y + 58);
  context.lineTo(490, y + 58);
  context.stroke();
  context.fillStyle = '#fffaf2';
  context.font = '700 25px Manrope, Arial, sans-serif';
  context.fillText(card.date, 86, y + 108);
  context.fillStyle = '#f5ded3';
  context.font = '500 23px Manrope, Arial, sans-serif';
  context.fillText(card.englishVenue, 86, y + 151);
  context.font = '500 27px "Noto Sans Tamil", Arial, sans-serif';
  context.fillText(card.tamilVenue, 86, y + 192);
  context.fillStyle = 'rgba(255,250,242,0.76)';
  context.font = '500 21px Manrope, Arial, sans-serif';
  context.fillText(card.link, 86, height - 70);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export default function ShareCardButton({ card, copy }) {
  const [state, setState] = useState('idle');

  async function shareCard() {
    setState('creating');
    try {
      const blob = await createCard(card);
      if (!blob) throw new Error('Card could not be created');
      const file = new File([blob], 'nandha-vani-invitation.png', { type: 'image/png' });
      const shareData = { title: card.englishNames, text: card.shareText, files: [file] };
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share(shareData);
        setState('ready');
      } else {
        const href = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.download = 'nandha-vani-invitation.png';
        anchor.click();
        URL.revokeObjectURL(href);
        setState('download');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setState('download');
    }
    window.setTimeout(() => setState('idle'), 2800);
  }

  const label = state === 'creating' ? copy.creating : state === 'ready' ? copy.ready : state === 'download' ? copy.fallback : copy.create;
  return <button className="share-card-button" type="button" onClick={shareCard} disabled={state === 'creating'}>{state === 'download' ? <Download size={15} aria-hidden="true" /> : <Share2 size={15} aria-hidden="true" />}{label}</button>;
}
