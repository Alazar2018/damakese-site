import { frames } from "@/lib/photos";

export const KINDS = [
  "Conference",
  "State occasion",
  "Concert",
  "Exhibition",
  "Launch",
] as const;

export type Kind = (typeof KINDS)[number];

export const practices: {
  index: string;
  kind: Kind;
  title: string;
  line: string;
  detail: string;
  includes: string[];
  image: string;
  imageAlt: string;
}[] = [
  {
    index: "01",
    kind: "Conference",
    title: "Conferences",
    line: "Three halls, four days, one crew.",
    detail:
      "Company meetings, association congresses, and multi-hall programmes in Addis Ababa. The stage is built and tested the day before, so nothing is being finished while the guests arrive. Run sheet, rooms, and the name spelled right on the badge.",
    includes: ["Programme and room plan", "Stage, sound, and screens", "Registration and badges", "A crew that stays for the turnover"],
    image: frames.conference,
    imageAlt: "A speaker at a lectern, with the room listening.",
  },
  {
    index: "02",
    kind: "State occasion",
    title: "State occasions",
    line: "The room is right at six.",
    detail:
      "Protocol days for ministries, embassies, and institutions. Arrival, seating, speech order, and a room that is finished before the first car is at the gate. We know the loading doors, the traffic, and who actually delivers.",
    includes: ["Protocol and running order", "Seating and arrival", "Permits and venue liaison", "A quiet crew at the door"],
    image: frames.state,
    imageAlt: "A banquet room set with white linen and glassware.",
  },
  {
    index: "03",
    kind: "Concert",
    title: "Concerts",
    line: "Doors at six. We are ready at four.",
    detail:
      "Concerts, cultural programmes, and live shows, indoors or on a large stage. Sound, light, doors, and the hour the schedule breaks. Artist coordination sits with the same crew as the room.",
    includes: ["Stage, sound, and light", "Doors and crowd flow", "Artist and rider coordination", "The crew through the last truck"],
    image: frames.concert,
    imageAlt: "Stage lights over a concert audience.",
  },
  {
    index: "04",
    kind: "Exhibition",
    title: "Exhibitions and trade fairs",
    line: "A route through the hall, and a floor that holds.",
    detail:
      "Trade fairs and exhibitions with one route through the hall. Exhibitors, speakers, power, signage, and a floor that holds. Produced from the first concept to the last truck.",
    includes: ["Floor plan and build-up", "Exhibitor services", "Signage and power", "Public hours, then strike"],
    image: frames.exhibition,
    imageAlt: "A wide conference stage with a large screen.",
  },
  {
    index: "05",
    kind: "Launch",
    title: "Launches and activations",
    line: "One idea. The room is built around it.",
    detail:
      "Product launches, brand activations, and the night a campaign has to be seen. Every brief gets thinking of its own. We do not recycle a concept because it is easier to produce.",
    includes: ["Concept before suppliers", "The room built around one idea", "Guest list and promotion", "The photograph the brand needs"],
    image: frames.launch,
    imageAlt: "A presenter opening a launch in a seated room.",
  },
];

export const manifesto = [
  "rooted in experience.",
  "driven by creativity.",
  "before the doors open.",
  "the crowd takes over.",
] as const;

export const aboutCopy = {
  opening:
    "By the time the doors open, the experience has already begun. Someone saw the announcement, made plans to come and arrived with an idea of what to expect. We think about that whole journey, from the first thing people see to what they remember afterwards.",
  who: "We are Damakese Marketing & Events, a full-service marketing, events and entertainment company based in Addis Ababa. We plan and produce concerts, exhibitions, trade fairs, and corporate and institutional events. We also develop campaigns, build visual identities and create brand activations that help businesses reach the people they want to speak to.",
  years:
    "Damakese is a new company built on more than nine years of team experience. Before coming together under this name, we contributed to some of Ethiopia’s biggest concerts, exhibitions and trade fairs. We bring that experience into each new brief, from shaping an idea people will remember to working through the details that make it possible.",
  close: "We now bring that experience together under the Damakese name.",
};

export const mission =
  "To help brands and organisations communicate clearly and bring people together through creative marketing, events and entertainment. We make the process straightforward for our clients by understanding what they want to achieve, keeping decisions clear and taking responsibility for the quality of the work we deliver.";

export const vision =
  "To become one of Ethiopia’s leading marketing, events and entertainment companies, known for original thinking and dependable work. Over the next three years, we aim to take on more large-scale projects in Ethiopia, build partnerships across East Africa and beyond, and work with international brands looking to connect with audiences in Ethiopia and across the region.";

export const values: { index: string; title: string; body: string }[] = [
  {
    index: "01",
    title: "Keep our word.",
    body: "We honour the commitments we make and speak up early when something affects the plan.",
  },
  {
    index: "02",
    title: "Give every brief its own thinking.",
    body: "We take time to understand the audience, the setting and what makes the project worth doing.",
  },
  {
    index: "03",
    title: "Care about the details.",
    body: "A clear message, a correctly spelled name and a cue that lands on time all shape how people experience the work.",
  },
  {
    index: "04",
    title: "Prepare for change.",
    body: "We think ahead about what could shift and agree on who makes the call when it does.",
  },
  {
    index: "05",
    title: "Stay accountable.",
    body: "We stay close to the work through delivery and handover. Our clients should know who’s responsible and where things stand.",
  },
];

export const disciplines: {
    index: string;
    id: string;
    title: string;
  line: string;
  body: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    index: "01",
    id: "marketing",
    title: "Marketing and brand activations",
    line: "Give people a reason to stop.",
    body: "We develop campaigns, product launches and promotional experiences that give people a reason to pay attention, take part or try something new. We start with what the audience needs to understand or do, then shape the message and how people encounter it, whether through a digital campaign or an experience they can take part in.",
    image: frames.launch,
    imageAlt: "A presenter opening a launch in a seated room.",
  },
  {
    index: "02",
    id: "branding",
    title: "Branding and creative communication",
    line: "An identity that holds together.",
    body: "We develop visual identities, campaign concepts and event branding, from new identities to refreshing how an existing brand looks and communicates. The direction carries through packaging, signage, digital content, printed materials, campaign launches and live experiences. Each piece has a job to do within the wider identity.",
    image: frames.about,
    imageAlt: "People gathered in a room before an evening event.",
  },
  {
    index: "03",
    id: "events",
    title: "Event management and production",
    line: "Before the doors open.",
    body: "We plan and manage events from concept to completion. Depending on the brief, that can include venue planning, schedules, supplier coordination, stage and technical setup, rehearsals and on-site management. The client, crew and suppliers work from the same plan, so everyone knows what needs to happen and when.",
    image: frames.conference,
    imageAlt: "A speaker at a lectern, with the room listening.",
  },
  {
    index: "04",
    id: "concerts",
    title: "Concerts and live entertainment",
    line: "The moment the crowd takes over.",
    body: "We work with promoters, artists and production teams to bring live shows to the stage. The work can cover technical coordination, rehearsals, backstage activity, show cues and audience movement, from the moment people enter the venue to the final performance.",
    image: frames.concert,
    imageAlt: "Stage lights over a concert audience.",
  },
];

export const howWeWork = [
  "The question: what do we want people to take away?",
  "The audience, the setting, and what makes the brief worth doing.",
  "One plan for the client, the crew and the suppliers.",
  "What could shift, and who makes the call when it does.",
  "Delivery and handover. We stay until the work is done.",
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What events does Damakese produce?",
    answer:
      "Damakese Marketing & Events is a full-service marketing, events and entertainment company in Addis Ababa. We develop campaigns and brand activations, build visual identities, and produce concerts, exhibitions, trade fairs, and corporate and institutional events. Travel is part of the quote when the programme leaves the city.",
  },
  {
    question: "What is included?",
    answer:
      "Concept, the production plan, the suppliers, and a crew on the day. When the brief asks for it, we also handle invitation, promotion, and how the room is branded. You can hire the full day, or ask us in earlier, while the idea is still being written.",
  },
  {
    question: "How far ahead should we book?",
    answer:
      "A large conference or concert wants two to six months, so the hall, the artists, and the permits are real. A smaller room can move faster when the date is free. Write anyway. A date we confirm is a date we keep.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The quote follows the brief: the city, the size of the room, the technical rider, and whether we are producing the day or shaping the idea. Two days are never the same price. Send the date and what it has to achieve, and we answer with a number you can hold us to.",
  },
  {
    question: "Do you work only in Addis Ababa?",
    answer:
      "Addis Ababa is home. We produce days in other Ethiopian cities, and further, when the programme travels. The crew, the freight, and the local room are planned before the quote is sent.",
  },
];

export const workLanes = ["All", "Film", "Campaigns", "Events"] as const;
export type WorkLane = (typeof workLanes)[number];

export type WorkPiece = {
  id: string;
  lane: Exclude<WorkLane, "All">;
  badge: string;
  title: string;
  line: string;
  image: string;
  video?: string;
};

export const workPieces: WorkPiece[] = [
  {
    id: "film-crowd",
    lane: "Film",
    badge: "Film",
    title: "The crowd",
    line: "A live show, from the door to the last cue. Reference film of the kind of night we produce.",
    image: frames.concert,
    video: "https://videos.pexels.com/video-files/2022395/2022395-sd_640_360_30fps.mp4",
  },
  {
    id: "film-stage",
    lane: "Film",
    badge: "Film",
    title: "The stage",
    line: "Lights, sound, and a stage that is finished before the first guest is in the room.",
    image: frames.stage,
    video: "https://videos.pexels.com/video-files/854216/854216-sd_640_360_25fps.mp4",
  },
  {
    id: "film-room",
    lane: "Film",
    badge: "Film",
    title: "The room",
    line: "The hour before doors. The plan is already in the room.",
    image: frames.hall,
    video: "https://videos.pexels.com/video-files/853889/853889-sd_640_360_25fps.mp4",
  },
  {
    id: "film-brief",
    lane: "Film",
    badge: "Film",
    title: "The brief",
    line: "A working room, where the day is still being written.",
    image: frames.conference,
    video: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  },
  {
    id: "campaign-stop",
    lane: "Campaigns",
    badge: "Campaign",
    title: "A reason to stop",
    line: "Campaigns and brand activations that give people a reason to pay attention.",
    image: frames.launch,
  },
  {
    id: "campaign-identity",
    lane: "Campaigns",
    badge: "Campaign",
    title: "An identity that holds",
    line: "Visual identities and event branding that carry from the sign to the stage.",
    image: frames.about,
  },
  {
    id: "campaign-fair",
    lane: "Campaigns",
    badge: "Campaign",
    title: "The fair floor",
    line: "A route through the hall, with signage that holds for the public hours.",
    image: frames.exhibition,
  },
  {
    id: "campaign-launch",
    lane: "Campaigns",
    badge: "Campaign",
    title: "The launch",
    line: "One idea, and a room built around it.",
    image: frames.fair,
  },
  {
    id: "event-doors",
    lane: "Events",
    badge: "Event",
    title: "Before the doors",
    line: "Corporate and institutional days, finished before the first car is at the gate.",
    image: frames.hall,
  },
  {
    id: "event-congress",
    lane: "Events",
    badge: "Event",
    title: "The congress",
    line: "Three halls, one plan, a crew that stays for the turnover.",
    image: frames.conference,
  },
  {
    id: "event-protocol",
    lane: "Events",
    badge: "Event",
    title: "The protocol room",
    line: "Arrival, seating, and a room that is right before six.",
    image: frames.state,
  },
  {
    id: "event-show",
    lane: "Events",
    badge: "Event",
    title: "The show",
    line: "Concerts and live programmes, from rehearsal to the last truck.",
    image: frames.concert,
  },
];

export const partnerSectors = ["All", "Brands", "Live", "Institutions", "Exhibitions"] as const;
export type PartnerSector = (typeof partnerSectors)[number];

export const partners: { name: string; sector: Exclude<PartnerSector, "All">; line: string }[] = [
  { name: "Brand activations", sector: "Brands", line: "A campaign people can walk into." },
  { name: "Product launches", sector: "Brands", line: "One idea, and the room built around it." },
  { name: "Visual identities", sector: "Brands", line: "A direction that holds from the sign to the stage." },
  { name: "Consumer campaigns", sector: "Brands", line: "A reason to stop, take part, or try something new." },
  { name: "Concert promoters", sector: "Live", line: "The show, from the door to the last cue." },
  { name: "Artists", sector: "Live", line: "Rehearsal, backstage, and the rider in the same plan." },
  { name: "Production teams", sector: "Live", line: "Sound, light, and a crew that stays through strike." },
  { name: "Cultural programmes", sector: "Live", line: "A live moment people remember after they leave." },
  { name: "Ministries", sector: "Institutions", line: "Protocol, arrival, and a room that is finished early." },
  { name: "Embassies", sector: "Institutions", line: "A quiet crew, and the name spelled right." },
  { name: "Associations", sector: "Institutions", line: "Congresses and the rooms between the sessions." },
  { name: "Corporate houses", sector: "Institutions", line: "Meetings and institutional days with one plan." },
  { name: "Trade fairs", sector: "Exhibitions", line: "A route through the hall, and a floor that holds." },
  { name: "Exhibitors", sector: "Exhibitions", line: "Power, signage, and public hours that start on time." },
  { name: "Multi-hall programmes", sector: "Exhibitions", line: "Several rooms, one crew, one running order." },
  { name: "International brands", sector: "Exhibitions", line: "A first room in Ethiopia, planned before the quote." },
];

export const stories: {
  slug: string;
  date: string;
  title: string;
  lede: string;
  body: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    slug: "one-name",
    date: "9 November 2026",
    title: "A new company. Nine years in the work.",
    lede: "Damakese is a new name for a team that has already spent years inside Ethiopia’s biggest rooms.",
    body: "Before the company had this name, the people in it were already in the halls: concerts, exhibitions, and trade fairs. Damakese Marketing & Events brings that experience into one house in Addis Ababa. The work is the same kind of day. The difference is that the thinking, the plan, and the crew now answer to one name.",
    image: frames.hall,
    imageAlt: "A hall set for an audience, before the doors open.",
  },
  {
    slug: "four-ways",
    date: "20 October 2026",
    title: "Four ways the work shows up.",
    lede: "A campaign, an identity, a produced day, or a live show. The brief decides which one leads.",
    body: "Some briefs need people to stop and take part. Some need a visual identity that still holds when it moves from a poster to a stage. Some are the day itself: the venue, the suppliers, the rehearsal, the doors. And some are the moment the crowd takes over. We keep those four close, so a launch does not lose the brand, and a concert does not lose the plan.",
    image: frames.launch,
    imageAlt: "A presenter opening a seated launch.",
  },
  {
    slug: "before-doors",
    date: "8 September 2026",
    title: "Before the doors open.",
    lede: "By the time people arrive, the experience has already started.",
    body: "Someone saw the announcement, made a plan to come, and arrived with an idea of what to expect. We write the day from that first sight through to what they remember afterwards. The stage is tested the day before. The name on the badge is the name the guest uses. If something has to change, the person who makes the call is already agreed.",
    image: frames.conference,
    imageAlt: "A speaker and a listening room.",
  },
  {
    slug: "the-crowd",
    date: "12 August 2026",
    title: "The moment the crowd takes over.",
    lede: "Live shows are a plan, until the room decides they are a night.",
    body: "We work with promoters, artists, and production teams on the technical coordination, the rehearsals, the backstage, the cues, and how people move from the door to the last song. The crowd is the point. Our job is to have the room ready before that moment arrives, and to stay until the work is actually done.",
    image: frames.concert,
    imageAlt: "Stage lights over a concert audience.",
  },
];

export const roles: {
  slug: string;
  desk: string;
  title: string;
  type: string;
  line: string;
  summary: string;
  asks: string[];
}[] = [
  {
    slug: "open-application",
    desk: "Studio",
    title: "Open application",
    type: "Write in",
    line: "A role we have not listed, and the work you actually do.",
    summary:
      "If the seat you want is not on this board, write anyway. Tell us the work you have already done in rooms, campaigns, or on a stage, and the kind of day you want to be responsible for.",
    asks: [
      "A short note on the work you want to do here.",
      "Where you have done that work before.",
      "A way to reach you.",
    ],
  },
  {
    slug: "event-producer",
    desk: "Events",
    title: "Event producer",
    type: "A seat",
    line: "Own the day from the brief to the handover.",
    summary:
      "The producer keeps one plan for the client, the crew, and the suppliers. You hold the date, the room, and the question of what people should take away.",
    asks: [
      "You have produced conferences, launches, or institutional days.",
      "You speak early when something affects the plan.",
      "You stay through delivery, not only through the meeting where the idea was agreed.",
    ],
  },
  {
    slug: "production-coordinator",
    desk: "Production",
    title: "Production coordinator",
    type: "A seat",
    line: "The schedule, the suppliers, and the room on the day.",
    summary:
      "You turn the plan into a running order: who arrives, what is built, and what has to be finished before the doors. The details are the job.",
    asks: [
      "You can hold a schedule and a supplier list at the same time.",
      "You have been on site for build, show, and strike.",
      "You write things down so the next person can pick them up.",
    ],
  },
  {
    slug: "creative",
    desk: "Branding",
    title: "Creative",
    type: "A seat",
    line: "An identity that still holds when it reaches the room.",
    summary:
      "You give a brief its own thinking: the campaign, the identity, and the way that direction shows up on signage, print, and the stage.",
    asks: [
      "A portfolio of identities, campaigns, or event branding.",
      "You can explain what the audience is meant to do, not only how it looks.",
      "You care about the name being spelled right on the thing people hold.",
    ],
  },
  {
    slug: "stage-and-technical",
    desk: "Live",
    title: "Stage and technical",
    type: "A seat",
    line: "Sound, light, cues, and a stage that is ready early.",
    summary:
      "You look after the technical side of concerts and live programmes: rehearsals, show cues, and the crew that stays until the last truck.",
    asks: [
      "You have run sound, light, or stage on a live show.",
      "You can read a rider and say what the room can actually do.",
      "You rehearse the cue before the crowd is in the building.",
    ],
  },
];
