// ─────────────────────────────────────────────
//  EVENTS DATA — edit this file to add / update / remove events.
//
//  Each event has:
//    name        – event title
//    location    – city, state
//    description – short blurb shown below the title
//    dates       – array of day blocks, each with:
//        day         – e.g. "Friday"
//        date        – e.g. "May 22"
//        hours       – e.g. "4–8 PM"
//        highlights  – bullet points for that day (can be empty [])
//
//  To hide an event without deleting it, set:  active: false
// ─────────────────────────────────────────────

export const events = [
  {
    id: 1,
    active: true,
    name: 'Hill Country Art & Wine Festival',
    location: 'Boerne, TX',
    description:
      'Get ready for a weekend full of wine, art, music & good vibes in the Hill Country!',
    dates: [
      {
        day: 'Friday',
        date: 'May 22',
        hours: '4–8 PM',
        highlights: ['Sip & Stroll — wine tastings + amazing local art'],
      },
      {
        day: 'Saturday',
        date: 'May 23',
        hours: '10 AM–5 PM',
        highlights: [
          'Mimosas on Main',
          'Art Auction',
          'Poetry',
          'Live drums',
          'Craft projects + more!',
        ],
      },
    ],
  },
];
