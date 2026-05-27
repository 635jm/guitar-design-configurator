# Guitar Design Configurator

A local-first MVP for creating guitar design projects, selecting build options,
and generating a copy-ready specification plus AI image prompt.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- localStorage persistence

## Local Development

```bash
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment Notes

- Run `npm.cmd run lint` and `npm.cmd run build` before deployment.
- The app is a client-heavy Next.js app and can run on Vercel without a backend.
- No environment variables are required for the current MVP.
- Project data is stored in each user's browser only; deployment does not sync
  projects across browsers or devices.

## Current MVP Features

- Local-first project dashboard saved in browser localStorage.
- Starter guitar presets: Classic Strat, Vintage Tele, Modern Metal, and Jazz Custom.
- New project flow with project name, guitar type, notes, and preset selection.
- Configurator with grouped body, neck, electronics, hardware, finish, and pickguard options.
- Live 2D visual preview that responds to shape, finish, pickguard, hardware, and pickups.
- Dashboard search and sort for saved projects.
- Project quick actions: Configure, Summary, Duplicate, and Delete.
- Summary page with build specs, notes, copy-ready text export, TXT download, JSON export, and AI image prompt.
- Dashboard export for all saved projects as JSON.
- localStorage recovery fallback for corrupt saved data.

## localStorage Limitations

Projects are saved locally in the current browser. Clearing browser storage,
using private browsing, or switching devices/browsers may hide or remove saved
projects. Use JSON export before clearing browser data or sharing a device.

## Quality Checks

```bash
npm.cmd run lint
npm.cmd run build
```

## Manual QA Checklist

- Dashboard shows saved projects and the empty state when no projects exist.
- Search filters projects by name, type, notes, body shape, finish, or pickups.
- Sort controls reorder projects by recently updated, recently created, or name.
- New project creation validates that project name is present.
- Each starter preset can create a project with the expected default specs.
- Configurator edits project name, guitar type, notes, and all guitar options.
- Configurator preset buttons update the draft and require Save to persist.
- Save persists changes after refresh and returns clear saved/error feedback.
- Duplicate and delete actions update the dashboard correctly.
- Summary shows the full spec and generated AI image prompt.
- Copy Summary writes the full spec to the clipboard.
- Download TXT exports the summary as a text file.
- Copy AI Prompt writes the image prompt to the clipboard.
- Export All JSON downloads all saved projects from the dashboard.
- Export Project JSON downloads one project from the summary page.
- Corrupt localStorage data is cleared and backed up under
  `guitar-design-projects-corrupt-backup`.

## User Testing

Use [USER_TESTING.md](USER_TESTING.md) for a simple test script covering project
creation, presets, customization, save/refresh behavior, summary export, and
feedback prompts.

## MVP Boundaries

- No backend.
- No authentication.
- No database.
- No payment flow.
- No real 3D rendering.
- No real AI image generation API.

## Future Ideas

- Richer visual preview or image export.
- Import/export project JSON.
- Side-by-side project comparison.
- Optional backend sync across browsers/devices.
- More detailed pickup, bridge, scale length, and tuning options.
