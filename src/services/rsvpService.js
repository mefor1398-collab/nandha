const RSVP_KEY = 'viquantra-wedding-rsvps';
const WISH_KEY = 'viquantra-wedding-wishes';

function getCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveCollection(key, entry) {
  const collection = getCollection(key);
  const record = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    ...entry,
  };
  localStorage.setItem(key, JSON.stringify([...collection, record]));
  return record;
}

/**
 * Replace these local adapters with Supabase, Formspree, Google Sheets, or an API.
 * Keep the method signatures so the UI never needs to change.
 */
export const rsvpService = {
  submit: async (entry) => {
    await new Promise((resolve) => setTimeout(resolve, 550));
    return saveCollection(RSVP_KEY, entry);
  },
};

export const guestbookService = {
  submit: async (entry) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return saveCollection(WISH_KEY, entry);
  },
};
