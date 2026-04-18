import { Campaign } from '../types';

export const campaigns: Campaign[] = [
  {
    id: 'camp_001',
    brandName: 'Apex Athletics',
    brandLogo: 'https://picsum.photos/seed/apexathletics/200',
    payoutPerVideo: 220,
    deadline: '2026-05-10',
    brief:
      'Show your real morning workout routine — no filters, no perfection. We want sweat, effort, and the moment you push past the wall. Feature our Apex Pro resistance bands naturally in your warmup or cooldown. Caption must include what you were training for. Authentic struggle beats polished performance every time.',
    tags: ['#fitness', '#morningroutine', '#ApexPro', '#resistancetraining'],
    exampleVideos: [
      {
        id: 'ev_001a',
        thumbnail: 'https://picsum.photos/seed/apexex1/400/250',
        caption: 'Day 47 of training — bands are holding up better than I am',
      },
      {
        id: 'ev_001b',
        thumbnail: 'https://picsum.photos/seed/apexex2/400/250',
        caption: 'Pre-run activation with the Apex loop bands',
      },
    ],
  },
  {
    id: 'camp_002',
    brandName: 'Folio Foods',
    brandLogo: 'https://picsum.photos/seed/foliofoods/200',
    payoutPerVideo: 150,
    deadline: '2026-05-03',
    brief:
      'Cook one real meal using our Folio grain pouches — lentils, farro, or quinoa. Show the full process from pouch to plate in under 60 seconds. We want to see your kitchen, your plating style, and your honest first bite reaction. No scripted lines. The video should feel like you\'re texting a friend a recipe, not running an ad.',
    tags: ['#mealprep', '#FolioFoods', '#whatsfordinner', '#cleaneating'],
    exampleVideos: [
      {
        id: 'ev_002a',
        thumbnail: 'https://picsum.photos/seed/foliofoodex1/400/250',
        caption: 'Lemon farro with roasted veg — took 12 minutes total',
      },
      {
        id: 'ev_002b',
        thumbnail: 'https://picsum.photos/seed/foliofoodex2/400/250',
        caption: 'Spicy lentil bowl and I am not okay (in a good way)',
      },
    ],
  },
  {
    id: 'camp_003',
    brandName: 'Kova Tech',
    brandLogo: 'https://picsum.photos/seed/kovatech/200',
    payoutPerVideo: 300,
    deadline: '2026-05-18',
    brief:
      'We need creators who actually use their desk setup. Show us your real workflow — the messy tabs, the second monitor, the deep focus session — and where the Kova MagHub fits in. Highlight wireless charging and cable management but do it by just living in your space, not demoing a product. We want people to feel desk envy, not watch a tech review.',
    tags: ['#desksetup', '#KovaMagHub', '#workfromhome', '#productivitytech'],
    exampleVideos: [
      {
        id: 'ev_003a',
        thumbnail: 'https://picsum.photos/seed/kovatechex1/400/250',
        caption: '6-hour build session and not a single cable in sight',
      },
      {
        id: 'ev_003b',
        thumbnail: 'https://picsum.photos/seed/kovatechex2/400/250',
        caption: 'The MagHub replaced literally four things on my desk',
      },
    ],
  },
  {
    id: 'camp_004',
    brandName: 'Dew Ritual',
    brandLogo: 'https://picsum.photos/seed/dewritual/200',
    payoutPerVideo: 180,
    deadline: '2026-05-07',
    brief:
      'Film your nighttime skincare routine — the full wind-down, not just the product moment. Candles, dim lighting, whatever signals the end of your day. Incorporate our Dew Ritual barrier serum as a natural step, not the centrepiece. We care about the mood. Speak to why skin repair at night hits different. Soft, intimate, real.',
    tags: ['#skincare', '#nightroutine', '#DewRitual', '#barrierrepair'],
    exampleVideos: [
      {
        id: 'ev_004a',
        thumbnail: 'https://picsum.photos/seed/dewritual1/400/250',
        caption: 'This is the part of the day that belongs to me',
      },
      {
        id: 'ev_004b',
        thumbnail: 'https://picsum.photos/seed/dewritual2/400/250',
        caption: 'Week 3 using the barrier serum — my skin stopped freaking out',
      },
    ],
  },
];
