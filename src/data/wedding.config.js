/**
 * The single source of truth for this invitation.
 * Replace values marked [PLACEHOLDER] before sending the site to guests.
 * Add or remove celebrations by toggling enabled; no component edits required.
 * Image paths point to public/media. Remote URLs also work.
 */
export const weddingConfig = {
  mode: 'upcoming',
  couple: {
    firstName: 'Nandha Kishore',
    secondName: 'Vani',
    date: '2026-08-31T04:00:00+05:30',
    invitationLine: 'With the blessings of their families, invite you to celebrate the sacred beginning of their life together.',
    location: 'Kumpinipet, Arakkonam',
    cultureLine: 'Two families, one blessing, and a beautiful beginning for Nandha Kishore and Vani.',
  },
  theme: {
    ink: '#153c2f', inkSoft: '#215541', rose: '#8a2040', rosePale: '#e8b8c2',
    ivory: '#f8f5ed', sand: '#eae7db', brass: '#a77c3e',
  },
  assets: {
    hero: '/media/couple-promise.jpg',
    vinayagar: '/media/vinayagar.png',
    heroPosition: 'center 22%',
    gallery: [
      { src: '/media/couple-promise.jpg', alt: 'The couple sharing a quiet promise beneath a flower arch.', position: 'center 22%' },
      { src: '/media/couple-gaze.jpeg', alt: 'The couple sharing a joyful look during their celebration.', position: 'center 25%' },
      { src: '/media/couple-portrait.jpeg', alt: 'A formal portrait of the bride and groom beneath the floral arch.', position: 'center 22%' },
      { src: '/media/groom-portrait.jpeg', alt: 'A black-and-white portrait of the groom.', position: 'center 21%' },
      { src: '/media/couple-rings.jpg', alt: 'The couple admiring their rings together.', position: 'center 21%' },
      { src: '/media/couple-gaze.jpeg', alt: 'A graceful portrait of the bride and groom in traditional attire.', position: 'center 59%' },
    ],
  },
  navigation: [
    { label: 'Our story', target: 'story' },
    { label: 'Celebrations', target: 'celebrations' },
    { label: 'Venue', target: 'venue' },
    { label: 'Send wishes', target: 'wishes' },
  ],
  story: [
    { year: 'The beginning', title: 'Two families, one blessing', copy: 'A thoughtful introduction between two families became the beginning of a meaningful new chapter.', image: '/media/couple-portrait.jpeg', position: 'center 23%' },
    { year: 'The first pages', title: 'A bond gently discovered', copy: 'With every conversation and shared smile, warmth and understanding grew into a connection to cherish.', image: '/media/couple-gaze.jpeg', position: 'center 28%' },
    { year: 'The promise', title: 'A yes, with every blessing', copy: 'Surrounded by the love of their families, they chose a future rooted in respect, joy, and togetherness.', image: '/media/couple-rings.jpg', position: 'center 24%' },
    { year: 'Forever', title: 'The next chapter', copy: 'Now Nandha Kishore and Vani begin a lifetime of shared dreams, laughter, and love.', image: '/media/couple-promise.jpg', position: 'center 25%' },
  ],
  celebrations: [
    { id: 'reception', enabled: true, label: 'Reception', date: 'Sunday, 30 August 2026', start: '6:30 PM', end: '10:30 PM', calendarStart: '2026-08-30T18:30:00+05:30', calendarEnd: '2026-08-30T22:30:00+05:30', venue: 'Sri Gopikrishna Mahal, Kumpinipet', mapsUrl: 'https://maps.app.goo.gl/rnK2z2X5DEWqLCDU9', attire: 'Traditional elegance', description: 'Please join the families for an evening of celebration, blessings, and joy.' },
    { id: 'muhurtam', enabled: true, label: 'Muhurtam', date: 'Monday, 31 August 2026', start: '4:00 AM', end: '5:30 AM', calendarStart: '2026-08-31T04:00:00+05:30', calendarEnd: '2026-08-31T05:30:00+05:30', venue: 'Sri Gopikrishna Mahal, Kumpinipet', mapsUrl: 'https://maps.app.goo.gl/rnK2z2X5DEWqLCDU9', attire: 'Traditional wedding attire', description: 'We seek your blessings as Nandha Kishore and Vani begin their sacred journey together.' },
  ],
  venue: {
    name: 'Sri Gopikrishna Mahal',
    address: 'Arakkonam, Sholingur Road, Kumpinipet',
    mapsUrl: 'https://maps.app.goo.gl/rnK2z2X5DEWqLCDU9',
    organiserPhone: '',
    whatsappPhone: '',
    arrivalNote: 'Please arrive 20 minutes before the Muhurtam to be seated comfortably.',
    parking: 'Parking is available at the mahal.',
    accommodation: 'Please make your own accommodation arrangements if travelling from out of town.',
    transport: 'Use the directions link below for the simplest route to Sri Gopikrishna Mahal.',
    landmark: 'Sri Gopikrishna Mahal, on Arakkonam–Sholingur Road.',
  },
  faq: [
    { question: 'What should we wear?', answer: 'Traditional Indian attire is warmly welcomed for both the reception and the Muhurtam.' },
    { question: 'When is the reception?', answer: 'The reception is on Sunday, 30 August 2026, from 6:30 PM onwards.' },
    { question: 'When is the Muhurtam?', answer: 'The Muhurtam is on Monday, 31 August 2026, between 4:00 AM and 5:30 AM.' },
    { question: 'Where is the venue?', answer: 'Both celebrations are at Sri Gopikrishna Mahal, Arakkonam, Sholingur Road, Kumpinipet. Tap Directions for the exact location.' },
    { question: 'Can I send a blessing?', answer: 'Yes. Use the Send wishes section below to share a private message for Nandha Kishore and Vani.' },
  ],
  family: {
    bride: { heading: 'With love from', relation: 'Vani’s family', names: ['Mrs. S. Dass Naidu & Mrs. D. Chitra'] },
    groom: { heading: 'And blessings from', relation: 'Nandha Kishore’s family', names: ['Mr. E. O. Subramanyam & Mrs. E. S. Dayavathi'] },
    quote: { english: '“May this union be blessed with love, harmony, and a lifetime of joy.”', native: 'இறையருளால் இணையும் இதயங்கள் என்றும் இன்பமாய் வாழ்க.', attribution: '— With the blessings of both families' },
  },
  guestbook: {
    enabled: true, hashtag: '#NandhaWedsVani', photoUploadUrl: '',
  },
  rsvp: {
    enabled: false, deadline: '', mealOptions: [],
  },
  music: {
    enabled: false, src: '', label: 'A little music for the journey',
  },
  craftedBy: {
    name: 'Muralee G', role: 'Founder, Viquantra Labs', links: [
      { label: 'muralee.co.in', href: 'https://muralee.co.in/' },
      { label: 'viquantra.com', href: 'https://viquantra.com/' },
    ],
  },
  postWedding: {
    eyebrow: 'With grateful hearts',
    title: 'Thank you for being part of our beginning.',
    copy: 'Your presence, blessings, and joy made every frame of this celebration more meaningful.',
  },
};
