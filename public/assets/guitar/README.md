# Guitar Asset Library

Static guitar configurator assets live under this folder so Next.js can serve
them directly from `/assets/guitar/...`.

Current status:

- `placeholders/` contains tracked fallback assets used before final art exists.
- `thumbnails/` is reserved for small UI option thumbnails.
- `preview-layers/` is reserved for future transparent realistic guitar layers.

Naming rules:

- Use lowercase kebab-case file and folder names.
- Keep paths stable once referenced from `src/lib/guitar-assets.ts`.
- Prefer SVG for UI thumbnails and transparent PNG for future realistic preview layers.

This folder is intentionally an asset foundation only. It does not implement the
future layered preview renderer or any AI image generation flow.
