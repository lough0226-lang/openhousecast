export type ContentLine = 'market' | 'buyer' | 'seller';

export interface GeneratorInput {
  contentLine: ContentLine;
  city?: string;
  marketAudience?: 'buyers' | 'sellers';
  marketData?: string;
  topic?: string;
  audience?: string;
  questions?: string;
  videoLength?: string;
  tone?: string;
}

export interface ScriptSegment {
  timestamp: string;
  heading: string;
  text: string;
}

export interface GeneratedScript {
  id: string;
  contentLine: ContentLine;
  contentLineLabel: string;
  title: string;
  hook: string;
  script: ScriptSegment[];
  shotList: string[];
  onScreenText: string[];
  retentionNotes: string[];
  cta: string;
  description: string;
  tags: string[];
  generatedAt: string;
}

const CONTENT_LINES: Record<ContentLine, string> = {
  market: 'Market Update',
  buyer: 'Buyer Education',
  seller: 'Seller Education',
};

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/* ------------------------------------------------------------------ */
/* MARKET UPDATE mock                                                   */
/* ------------------------------------------------------------------ */
function buildMarketScript(input: GeneratorInput): GeneratedScript {
  const city = input.city?.trim() || 'the greater metro area';
  const audience = input.marketAudience ?? 'buyers';
  const len = input.videoLength ?? '8–10 minutes';

  const title = `Is Now a Good Time to Buy? ${titleCase(city)} Market Update for ` +
    `${new Date().getFullYear()} (${audience === 'buyers' ? 'Buyers' : 'Sellers'})`;

  const hook =
    audience === 'buyers'
      ? `If you've been waiting for the ${city} market to cool down, the numbers I'm about to show you are the reason thousands of buyers are finally ready to act. I'll explain in the next 60 seconds what changed — and whether you should move now or hold.`
      : `If you've been waiting to list your home in ${city}, what I'm about to show you could be worth tens of thousands of dollars. The inventory picture has shifted, and I'll break down exactly what that means for sellers — today.`;

  const script: ScriptSegment[] = [
    {
      timestamp: '0:00 – 0:15',
      heading: 'Cold open & hook',
      text: hook,
    },
    {
      timestamp: '0:15 – 1:20',
      heading: 'Why this market is changing',
      text: `Here's the short version: the ${city} market is shifting balance. Sellers are adjusting expectations, and buyers are getting more negotiating room than they had a year ago. I want to show you the actual numbers that drive this — no hype, no pressure, just data and what it means for your situation.`,
    },
    {
      timestamp: '1:20 – 3:30',
      heading: 'Median price & year-over-year change',
      text: `Let's start with median price. Across the area we track, prices have been holding steady relative to this time last year. What that means practically: if you entered the market expecting a dramatic drop, that hasn't materialized — but you're no longer seeing the aggressive bidding wars of the past cycle. Price is stabilizing, which rewards thoughtful buyers and realistic sellers.`,
    },
    {
      timestamp: '3:30 – 5:10',
      heading: 'Inventory & days on market',
      text: `This is the number to watch. Inventory has ticked up, and homes are sitting on the market longer than the frenzied years. More days on market means two things: buyers can tour and compare without the 24-hour deadline, and sellers need to price closer to real-world comps from the first listing. If you see a home that's been listed 20+ days, it is genuinely negotiable.`,
    },
    {
      timestamp: '5:10 – 6:30',
      heading: 'What this means for interest rates',
      text: `Rates remain a headline driver in every transaction. The practical takeaway is that a slightly lower rate can shift your budget more than a small price difference — which is why financing strategy matters as much as sticker price. Talk to your lender about what today's rate means for your monthly payment, not just the list price.`,
    },
    {
      timestamp: '6:30 – 8:00',
      heading: `${audience === 'buyers' ? 'Should buyers act now?' : 'What sellers should do'}`,
      text:
        audience === 'buyers'
          ? `If you're a buyer, here's my honest read: the window for negotiating is the most favorable it's been in a few years. Homes staying longer means you can ask for inspection items to be addressed and approach pricing with confidence. The buyers I work with are moving now — carefully, with pre-approval and a clear list — because waiting for a "better" market often costs more in rates and rent.`
          : `If you're a seller, the winning play is pricing right from day one. The data is clear: homes priced at market get attention immediately; overpriced homes collect days on market and end up discounting anyway. Lean on your agent's comp analysis, stage for the camera, and you'll capture the strongest offers in this steadier market.`,
    },
    {
      timestamp: '8:00 – 9:00',
      heading: 'Wrap-up & fair housing note',
      text: `Here's the bottom line: this market rewards preparation over impulse. Whether you're buying or selling, decisions grounded in these numbers — and a clear plan — outperform decisions made on fear or frenzy. In the interest of full transparency: all communities and all buyers and sellers are welcome in our work, and we're committed to fair and equal professional service for everyone.`,
    },
    {
      timestamp: '9:00 – 10:00',
      heading: 'Call to action',
      text: `If you want a personalized breakdown of what these numbers mean for you — a neighborhood-level read, a search strategy, or a pricing plan — drop a comment below or reach out. I'll send over a one-page summary of this month's data for your area at no charge. And if this helped, subscribe so you catch next month's update before everyone else.`,
    },
  ];

  const description = `In this ${len} ${city} housing market update, I break down this month's numbers — median price, inventory, days on market, and what it means for ${audience === 'buyers' ? 'buyers ready to act' : 'sellers ready to list'}. If you're wondering whether it's a good time to buy or sell, this data-driven walkthrough gives you the answer without the hype.\n\nTimestamps:\n` +
    script
      .map((s) => `${s.timestamp} — ${s.heading}`)
      .join('\n') +
    `\n\nThis content is provided for informational purposes and is not financial or legal advice. OpenHouseCast scripts are written with Fair Housing compliance in mind.`;

  return {
    id: uid(),
    contentLine: 'market',
    contentLineLabel: CONTENT_LINES.market,
    title,
    hook,
    script,
    shotList: [
      'Establishing drone shot of the city skyline at golden hour',
      'Agent walking-and-talking through a friendly neighborhood street',
      'Close-up of a market chart / median-price graph overlay',
      'B-roll of homes at various price points (no protected-class commentary)',
      'On-location clip at a sold/for-sale property exterior',
      'Agent at a laptop reviewing local data side-by-side shot',
      'Restaurant/marketplace lifestyle clip illustrating the area',
      'Closing shot of agent at their desk, warm smile, CTA on screen',
    ],
    onScreenText: [
      `${titleCase(city)} Market Update — ${new Date().getFullYear()}`,
      'Median price: holding steady vs. last year',
      'Inventory: ticking up',
      'Days on market: increasing → more negotiating room',
      'Bottom line: preparation beats impulse',
      'Subscribe for monthly updates',
    ],
    retentionNotes: [
      'Opens with a specific promise ("the reason thousands of buyers are ready to act") to hook retention within 15s.',
      'Each segment answers one question before moving on — reduces drop-off.',
      'Numbers are repeated verbally and visually to aid memory.',
      'Regular pattern interrupts: charts, cutaways, and neighborhood b-roll every 60–90s.',
      'Closes with a low-friction CTA ("comment, DM, or reach out") to invite engagement.',
    ],
    cta: `Drop a comment or reach out — I'll send you a one-page summary of this month's ${city} market data for your area, free. And subscribe so you don't miss next month's update.`,
    description,
    tags: [
      '#marketupdate',
      '#realestatemarket',
      `#${slugify(city)}`,
      audience === 'buyers' ? '#buyersmarket' : '#sellersmarket',
      '#housingmarket',
      '#realestate',
      '#housingprices',
      '#realestatetips',
    ],
    generatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* BUYER EDUCATION mock                                                */
/* ------------------------------------------------------------------ */
function buildBuyerScript(input: GeneratorInput): GeneratedScript {
  const city = input.city?.trim() || 'your city';
  const topic = input.topic?.trim() || 'what first-time buyers should know';
  const audience = input.audience?.trim() || 'first-time buyers';

  const title = `${titleCase(city)} Home Buying Guide: ${titleCase(topic)} (Step-by-Step for ${titleCase(audience)})`;

  const hook = `Buying a home in ${city} is the single biggest purchase most people will ever make — and the process is full of steps nobody explains until you're in the middle of them. In the next few minutes I'm going to walk you through the exact path, so you walk into your first showings calm, prepared, and in control.`;

  const script: ScriptSegment[] = [
    {
      timestamp: '0:00 – 0:20',
      heading: 'Hook',
      text: hook,
    },
    {
      timestamp: '0:20 – 1:30',
      heading: 'Why most buyers start wrong',
      text: `Here's what I see all the time: buyers start scrolling listings before they know their budget, and by the time they fall in love with a home, they haven't talked to a lender — so they lose it to someone who did. Let's flip that order and give you the unfair advantage from the start.`,
    },
    {
      timestamp: '1:30 – 3:00',
      heading: 'Step 1 — Get pre-approved first',
      text: `Before any showings, get pre-approved by a lender. This tells you your true budget, including closing costs and monthly payment, not just the mortgage amount. In a competitive ${city} market, a pre-approval letter is what separates a serious buyer from a tire-kicker — and it's the first thing a seller's agent asks for.`,
    },
    {
      timestamp: '3:00 – 4:30',
      heading: 'Step 2 — Define your must-haves',
      text: `Make a short list of the things that genuinely matter — neighborhood, commute, lifestyle, size — and separate them from nice-to-haves. When you walk into a home, that list keeps decisions grounded. Trust me, every home is a compromise; the winning buyers are the ones who know in advance which trade-offs they're willing to make.`,
    },
    {
      timestamp: '4:30 – 6:00',
      heading: 'Step 3 — Tour with an agent, not alone',
      text: `Working with an agent familiar with ${city} means you get local comp value analysis, honest guidance on condition, and someone who can flag issues before you spend money on inspections. A good agent is on your side — not in a hurry — and will tell you when a home is overpriced even if it's beautiful.`,
    },
    {
      timestamp: '6:00 – 7:30',
      heading: 'Step 4 — Budget for beyond the down payment',
      text: `Your down payment is not the whole story. Set aside room for closing costs, inspection, appraisal, moving, and a small reserve for those first-year surprises. A home is an investment that takes work — planning for it ahead of time keeps it a joy, not a stress.`,
    },
    {
      timestamp: '7:30 – 8:30',
      heading: 'Fair & equal access note',
      text: `One thing I want every buyer to know: fair housing law protects you. Sellers and agents must serve all buyers equally, regardless of any protected characteristic. If you ever feel you were treated differently, you have protection under the law. My job is to advocate for you fairly, in every community, for every buyer.`,
    },
    {
      timestamp: '8:30 – 10:00',
      heading: 'Wrap-up & CTA',
      text: `The takeaway: buy in the right order — pre-approval, priorities, showings, and a buffer. If you're starting your ${city} search and want a straightforward, pressure-free walkthrough of what's realistic for your budget, reach out. I'll help you put together your plan and your must-have list — no obligation.`,
    },
  ];

  const description = `New to buying in ${city}? This guide walks ${audience} through the home-buying process step by step: getting pre-approved, defining your must-haves, touring the right way, and budgeting for the costs beyond your down payment.\n\nThis is practical, jargon-free advice — with the full process, timestamps, and a fair housing note for your peace of mind.\n\nTimestamps:\n` +
    script.map((s) => `${s.timestamp} — ${s.heading}`).join('\n');

  return {
    id: uid(),
    contentLine: 'buyer',
    contentLineLabel: CONTENT_LINES.buyer,
    title,
    hook,
    script,
    shotList: [
      'Agent greeting buyers at a front door, welcome handshake',
      'Neighborhood walk-through b-roll with practical commentary',
      'Whiteboard / on-screen list of the buying steps',
      'Laptop shot of a mortgage pre-approval example (numbers blurred)',
      'Interior wide shots of an example home — no people as props',
      'Checklist overlay being marked off step by step',
      'Closing/handshake shot at the end',
    ],
    onScreenText: [
      'Step 1: Get pre-approved',
      'Step 2: Define must-haves',
      'Step 3: Tour with an agent',
      'Step 4: Budget beyond down payment',
      'Fair Housing — every buyer welcome',
      'Subscribe for the full series',
    ],
    retentionNotes: [
      'Structured as numbered steps — viewers stay for the countdown payoff.',
      'Each step ends with "why this matters," giving a reason to keep watching.',
      'Uses the "most buyers start wrong" tension to hook early.',
      'Visual progress (checklist) reinforces forward momentum.',
      'Fair housing reassurance placed naturally to build trust.',
    ],
    cta: `Ready to start without the guesswork? Reach out and I'll walk you through your budget and must-have list in a pressure-free conversation. Subscribe for the next video in this buyer series.`,
    description,
    tags: [
      '#homebuying',
      '#firsttimehomebuyer',
      '#realestatetips',
      `#${slugify(city)}`,
      '#homebuyertips',
      '#buyingahome',
      '#realestate',
    ],
    generatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* SELLER EDUCATION mock                                               */
/* ------------------------------------------------------------------ */
function buildSellerScript(input: GeneratorInput): GeneratedScript {
  const city = input.city?.trim() || 'your city';
  const topic = input.topic?.trim() || 'how to price your home right';
  const audience = input.audience?.trim() || 'home sellers';

  const title = `${titleCase(city)} Seller\u2019s Guide: ${titleCase(topic)} (Maximize Your Net Proceeds)`;

  const hook = `If you're about to list your home in ${city}, the single decision that will decide how much money ends up in your pocket happens before the "for sale" sign even goes up. I'm going to show you that decision — and the 3 things top sellers do differently — right now.`;

  const script: ScriptSegment[] = [
    {
      timestamp: '0:00 – 0:20',
      heading: 'Hook',
      text: hook,
    },
    {
      timestamp: '0:20 – 1:30',
      heading: 'The one decision that changes everything',
      text: `It's not how you stage it, how many photos you take, or even your closing date. It's price — specifically, pricing to the market instead of to a memory of what your neighbor's house "should" be worth. Sellers who price right out of the gate attract more tours, more offers, and often a higher final sale price.`,
    },
    {
      timestamp: '1:30 – 3:00',
      heading: 'Pricing to the data, not to hope',
      text: `A strong list price comes from a neutral view of recent comparable sales in ${city} — not from a number you're attached to. That's why a good agent pulls active and sold comps, then prices slightly to the market to generate competition. Overpricing looks tempting, but its real cost is days on market, expired listings, and buyers assuming something's wrong.`,
    },
    {
      timestamp: '3:00 – 4:40',
      heading: 'First impressions earn real dollars',
      text: `Buyers decide quickly, and the first impression happens online before they ever park out front. High-quality photos, decluttered staging, and a clean, bright feel genuinely increase the offer a home receives. You don't need a full remodel — you need the home to look loved and move-in ready for the camera.`,
    },
    {
      timestamp: '4:40 – 6:10',
      heading: 'When & how to negotiate',
      text: `When offers come in, the best outcome isn't always the highest number. Look at contingencies, timeline, and financing strength before you pick. A buyer who's pre-approved and flexible on dates can be worth more than one who bids high then delays. Your agent's job is to keep the deal on track from offer to close.`,
    },
    {
      timestamp: '6:10 – 7:30',
      heading: 'Seller costs & net proceeds',
      text: `Know your numbers before you negotiate: agent commission, transfer and title fees, and any concessions you might make. Calculating net proceeds — what actually lands in your account — keeps you from fixating on the gross number. Preparation here means no surprises at closing.`,
    },
    {
      timestamp: '7:30 – 8:30',
      heading: 'Fair & equal access note',
      text: `And one important note: as a seller you're required to serve all potential buyers fairly and equally under fair housing law. Your listing is open to every qualified buyer — and that equal access is good for you, because a wider pool of buyers means stronger competition for your home.`,
    },
    {
      timestamp: '8:30 – 10:00',
      heading: 'Wrap-up & CTA',
      text: `To sum it up: price to the data, invest in first impressions, negotiate on the whole picture, and know your net. If you'd like an honest, no-pressure evaluation of what your home could sell for in the current ${city} market, reach out. I'll pull your comps and walk you through the numbers — that's it, no obligation.`,
    },
  ];

  const description = `Thinking about selling your ${city} home? This guide walks ${audience} through pricing to the market, creating strong first impressions, negotiating like a pro, and knowing your net proceeds — so you maximize what you keep.\n\nPractical, data-driven advice for listing with confidence.\n\nTimestamps:\n` +
    script.map((s) => `${s.timestamp} — ${s.heading}`).join('\n');

  return {
    id: uid(),
    contentLine: 'seller',
    contentLineLabel: CONTENT_LINES.seller,
    title,
    hook,
    script,
    shotList: [
      'Agent standing in front of a newly listed home exterior',
      'Wide interior shots — bright, decluttered, staged rooms',
      'On-screen comp chart comparing sold prices',
      'Agent highlighting staging before/after (visual, no commentary)',
      'Agent reviewing offer documents at a table',
      'Neighborhood b-roll for lifestyle context',
      'Closing shot — agent hands over keys with a handshake',
    ],
    onScreenText: [
      'Price to the market, not to hope',
      'First impressions = real dollars',
      'Negotiate on the whole picture',
      'Know your net proceeds',
      'Open to every qualified buyer',
      'Subscribe for selling tips',
    ],
    retentionNotes: [
      'Opens with "one decision changes everything" — high curiosity hook.',
      'Uses the common overpricing mistake as an emotional driver.',
      'Numbered strategies build a sense of list completion.',
      'Visual comps reinforce trust in the data.',
      'Fair housing note reframed as a benefit (wider buyer pool).',
    ],
    cta: `Want an honest evaluation of your home's value in today's ${city} market? Reach out and I'll pull your comparables and walk you through the numbers — no obligation. Subscribe for more selling strategies.`,
    description,
    tags: [
      '#homeselling',
      '#sellmyhome',
      '#realestatetips',
      `#${slugify(city)}`,
      '#homelisting',
      '#realestateagent',
      '#housingmarket',
    ],
    generatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Entry                                                               */
/* ------------------------------------------------------------------ */
export function generateScript(input: GeneratorInput): GeneratedScript {
  switch (input.contentLine) {
    case 'market':
      return buildMarketScript(input);
    case 'buyer':
      return buildBuyerScript(input);
    case 'seller':
      return buildSellerScript(input);
    default:
      return buildBuyerScript(input);
  }
}

/* helpers */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/[\s\-]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '');
}

export const CONTENT_LINE_OPTIONS: {
  value: ContentLine;
  label: string;
  blurb: string;
}[] = [
  {
    value: 'market',
    label: 'Market Update',
    blurb: 'Convert this month\u2019s data into a watchable market report.',
  },
  {
    value: 'buyer',
    label: 'Buyer Education',
    blurb: 'Teach first-time and repeat buyers something genuinely useful.',
  },
  {
    value: 'seller',
    label: 'Seller Education',
    blurb: 'Win listers by answering the questions sellers are actually asking.',
  },
];

export const VIDEO_LENGTH_OPTIONS = ['5–7 minutes', '8–10 minutes', '12–15 minutes'];

export const TONE_OPTIONS = [
  'Warm & confident',
  'Direct & no-nonsense',
  'Reassuring & calm',
  'Energetic & upbeat',
  'Data-driven & professional',
];