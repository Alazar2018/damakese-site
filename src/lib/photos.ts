export function frame(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export function sharp(id: string) {
  const url = (width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=92&fm=jpg`;
  return {
    image: url(2560),
    srcSet: `${url(1920)} 1920w, ${url(2560)} 2560w, ${url(3840)} 3840w`,
  };
}

export const frames = {
  hero: frame("photo-1492684223066-81342ee5ff30", 2000),
  fair: frame("photo-1540575467063-178a50c2df87"),
  stage: frame("photo-1470229722913-7c0e2dbbafd3"),
  protocol: frame("photo-1464366400600-7168b8af9bc3"),
  launch: frame("photo-1505373877841-8d25f7d46678"),
  conference: frame("photo-1475721027785-f74eccf877e2"),
  state: frame("photo-1519167758481-83f550bb49b3"),
  concert: frame("photo-1514525253161-7a46d19cd819"),
  exhibition: frame("photo-1587825140708-dfaf72ae4b04"),
  about: frame("photo-1511578314322-379afb476865", 1800),
  hall: frame("photo-1531058020387-3be344556be6"),
} as const;

const byId: Record<string, string> = {
  "evt-fair": frames.fair,
  "evt-stage": frames.stage,
  "evt-protocol": frames.protocol,
  "evt-launch": frames.launch,
};

const byKind: Record<string, string> = {
  Conference: frames.conference,
  "State occasion": frames.state,
  Concert: frames.concert,
  Exhibition: frames.exhibition,
  Launch: frames.launch,
};

export function frameFor(id: string, kind: string) {
  return byId[id] ?? byKind[kind] ?? frames.conference;
}
