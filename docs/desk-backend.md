# Desk backend

The studio desk is a NestJS service in `api/`. The Next.js site in `site/` is the public pages and the desk screens. There is no Supabase project.

The book is one SQLite file, `api/data/desk.db`. Every browser that can reach the service sees the same days, briefs, clients, and run sheet. Photographs are files in `api/data/photos`. A new brief is written to `api/data/outbox`. If `SMTP_HOST` is set in `api/.env`, that same note is also emailed to `STUDIO_INBOX`.

## Seats

Five seats. No public sign-up. Two roles.

| Email | Password | Role |
|---|---|---|
| owner@damakese.local | owner-keeps-the-date | Owner. Can remove a day, a brief, a client, or a run-sheet line, and can bring an old browser book onto the desk |
| producer@damakese.local | producer-holds-the-date | Desk |
| book@damakese.local | book-holds-the-day | Desk |
| floor@damakese.local | floor-marks-the-line | Desk |
| spare@damakese.local | spare-for-the-job | Desk |

Replace these before the desk is on the public internet. Change `SESSION_SECRET` in `api/.env` at the same time. The login page does not print the passwords.

Visitors do not get accounts. The inquire form stays a form.

## Run it

From `api/`:

```bash
npm install
npx prisma db push
npm run seed
npm run start:dev
```

The service listens on http://localhost:4000. The site, on http://localhost:3456, calls it directly. `WEB_ORIGIN` in `api/.env` must match the site origin.

## What the service keeps

- `days` — the book. Public days are readable with no login. Internal days are not.
- `briefs` — inquire submissions, and the status the desk sets.
- `clients`
- `run_items` — deleted with their day.
- `seats` — the five logins. Passwords are hashed.

A signed-in desk seat can add and edit. Only the owner can delete. The rules are enforced by the service, not only by hiding the button.

## Left for later

Ticketing, payments, a client login, and more than two roles.
