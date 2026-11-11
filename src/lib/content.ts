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
  image: string;
  imageAlt: string;
}[] = [
  {
    index: "01",
    kind: "Conference",
    title: "Conferences",
    line: "Three halls, four days, one crew.",
    detail:
      "The stage is built and tested the day before, so nothing is being finished while the guests arrive. Run sheet, rooms, and the name spelled right on the badge.",
    image: frames.conference,
    imageAlt: "A speaker at a lectern, with the room listening.",
  },
  {
    index: "02",
    kind: "State occasion",
    title: "State occasions",
    line: "The room is right at six.",
    detail:
      "Protocol, permits, and a day a ministry or an embassy can hand over. We know the loading doors, the traffic, and who actually delivers.",
    image: frames.state,
    imageAlt: "A banquet room set with white linen and glassware.",
  },
  {
    index: "03",
    kind: "Concert",
    title: "Concerts",
    line: "Doors at six. We are ready at four.",
    detail:
      "Sound, light, and the hour the schedule breaks. That hour is when a client finds out what they bought.",
    image: frames.concert,
    imageAlt: "Stage lights over a concert audience.",
  },
  {
    index: "04",
    kind: "Exhibition",
    title: "Exhibitions and trade fairs",
    line: "A route through the hall, and a floor that holds.",
    detail:
      "Exhibitors, speakers, and one way through the room. The fair is produced end to end, from first concept to the last truck.",
    image: frames.exhibition,
    imageAlt: "A wide conference stage with a large screen.",
  },
  {
    index: "05",
    kind: "Launch",
    title: "Launches and activations",
    line: "One idea. The room is built around it.",
    detail:
      "Every brief gets thinking of its own. We do not recycle a concept because it is easier to produce.",
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
