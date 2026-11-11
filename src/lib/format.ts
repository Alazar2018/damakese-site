export function formatDay(iso: string) {
  if (!iso) return "Date open";
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa",
  }).format(date);
}

export function addisTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Africa/Addis_Ababa",
  }).format(date);
}

export const statusLabel: Record<string, string> = {
  planning: "Planning",
  confirmed: "Confirmed",
  "on-site": "On site",
  delivered: "Delivered",
  hold: "On hold",
  new: "New",
  review: "In review",
  briefed: "Briefed",
  closed: "Closed",
  open: "Open",
  done: "Done",
  blocked: "Blocked",
};
