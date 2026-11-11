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

export const values: { index: string; title: string; body: string }[] = [
  {
    index: "01",
    title: "Keep our word",
    body: "A date we confirm is a date we keep. Scope is never quietly reduced in the hope that nobody notices.",
  },
  {
    index: "02",
    title: "Plan for the break",
    body: "Every plan carries a second plan for the part most likely to fail. “It should be fine” is not a contingency.",
  },
  {
    index: "03",
    title: "Sweat the detail",
    body: "The chair line, the cable run, the name spelled right on the badge. We do not sign off a room we would not photograph.",
  },
  {
    index: "04",
    title: "Bring an idea",
    body: "Every brief gets thinking of its own. We do not recycle a concept because it is easier to produce.",
  },
  {
    index: "05",
    title: "Stay in the room",
    body: "We work to be asked back, not to close one invoice. A small event is never a small client.",
  },
];

export const offers: { title: string; body: string }[] = [
  {
    title: "Production",
    body: "The room, the stage, the crew, and the hour the doors open. We produce the day, we do not hand you a list of suppliers and leave.",
  },
  {
    title: "Concept and direction",
    body: "The idea is written before a supplier is called. Branding of the room, the running order, and a concept that belongs to this brief.",
  },
  {
    title: "Conferences",
    body: "Corporate meetings and congresses in Addis Ababa, including programmes that move across more than one hall.",
  },
  {
    title: "Concerts and culture",
    body: "Live shows and cultural programmes. Sound, light, the artist’s rider, and a crowd that gets in and out without a scramble.",
  },
  {
    title: "Exhibitions",
    body: "Trade fairs with a floor plan, a build-up, and a public day that exhibitors can actually use.",
  },
  {
    title: "Launches and promotion",
    body: "A product, a campaign, or a brand night. Invitation, the guest list, and the moment worth photographing.",
  },
];

export const audiences: { title: string; body: string }[] = [
  {
    title: "Companies",
    body: "A conference, an annual meeting, or a launch that has to look like the company meant it.",
  },
  {
    title: "Ministries and embassies",
    body: "A protocol day with an arrival, a speech order, and no surprise at the gate.",
  },
  {
    title: "Promoters and artists",
    body: "A concert or a cultural programme, from the rider to the last truck.",
  },
  {
    title: "Brands",
    body: "An activation people remember. Not a floor plan borrowed from last season.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What events does Damakese produce?",
    answer:
      "Conferences, state and protocol occasions, concerts and cultural programmes, exhibitions and trade fairs, and product launches and brand activations. The work is based in Addis Ababa. A day outside the city is produced when the brief needs it, and travel is part of the quote.",
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
