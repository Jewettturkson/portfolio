# Jewett Turkson — Developer Portfolio

Personal portfolio site. Next.js 14 (static export) + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy (Vercel, recommended)

1. Push this folder to a new GitHub repo (e.g. `portfolio`)
2. vercel.com → New Project → import the repo (zero config needed)
3. Project Settings → Domains → add your purchased domain
4. Update `metadataBase` in `app/layout.tsx` to the final domain

## Content updates

All content lives in `app/page.tsx` in the data arrays at the top:
`PROJECTS`, `EXPERIENCE`, `SKILLS`, `CERTS`, `LINKS`.

TODO before going live:
- [ ] Add certification issuers (who issued "Certified AI Engineer" and "SQL Associate"?)
- [ ] Add PrepPal `code` link once the repo is pushed to GitHub
- [ ] Add a resume PDF and link it in the nav
- [ ] Update `metadataBase` to the purchased domain
