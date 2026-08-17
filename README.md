# Nandha Kishore & Vani — wedding invitation

A mobile-first React invitation for a premium wedding experience. The supplied couple photography is included; sample names, venues, contacts, dates, and copy remain deliberately editable placeholders.

## Run locally

    npm install
    npm run dev

Create a static production build with:

    npm run build

The deployable output is created in the dist folder. It can be deployed as a static site to Vercel or Netlify with the standard Vite settings (build command: npm run build, publish directory: dist).

## Update the wedding details

Open src/data/wedding.config.js. This is the only file needed for normal content changes:

- couple: names, ISO wedding date/time, city, hero line, and story introduction
- celebrations: add events, change details, or set enabled to false to hide an event
- venue: address, phone, WhatsApp number, maps link, and travel notes
- family: both family panels and the bilingual blessing
- theme: seven colour tokens used throughout the site
- mode: set to postWedding after the ceremony to switch to the gratitude hero

Use an ISO date with its India time-zone offset, for example 2026-12-06T07:30:00+05:30. The countdown, calendar links, and today/after-wedding states use this date.

## Replace photos

The site includes the supplied couple photography in public/media. Replace or add photographs in this folder whenever the final album is ready.

1. Put optimised images in public/media. WebP or AVIF is recommended; keep the hero under roughly 450 KB where practical.
2. Change assets.hero to the main image path.
3. Replace every image and position in assets.gallery.
4. Replace each story item image and position.

Image position accepts normal CSS values such as center, 70% center, or center 25%. Gallery images are lazy-loaded. The hero is loaded eagerly because it is the opening frame.

## Wishes form storage

The wishes form currently writes private mock data only to the visitor's local browser storage through src/services/rsvpService.js. It never renders wishes publicly.

To connect a service, replace the submit method in guestbookService while keeping the same async method signature:

    submit: async (entry) => {
      // send entry to Supabase, Formspree, Google Sheets, or your API
      return response;
    }

For production, use a server-side endpoint or Supabase row-level security. Do not ship database credentials or a publicly readable wishes table in this frontend.

## Optional extras

- To turn on music, add an audio file in public/media, set music.src to its path, and set music.enabled to true. It never autoplays; a guest selects play, and their preference is remembered locally.
- Add guestbook.photoUploadUrl when an after-event upload destination is ready. A QR/photo-upload callout can be wired to that URL without changing any layout.
- Change craftedBy.href to the desired Viquantra contact or portfolio URL.

## Project structure

    src/data/wedding.config.js  Content, settings, palette, visibility
    src/components/             Independent invitation interactions
    src/services/               Wishes persistence adapter
    src/App.jsx                 Page composition
    src/styles.css              Mobile-first visual system and breakpoints
    public/media/               Replaceable photography and optional music

## Quality checks

The layout is mobile-first and includes responsive breakpoints for 360px, 390px, tablet (768px), and desktop. Motion uses Framer Motion sparingly and turns off transforms/animations for prefers-reduced-motion. Keyboard navigation works for forms, FAQ controls, gallery lightbox navigation, and all links/buttons.
