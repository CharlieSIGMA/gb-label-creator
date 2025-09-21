# GameBoy Label Creator

A small React + Vite app for designing and exporting Game Boy Advance cartridge labels. Pick a template, tweak the serial, colors, and border options, then download a print-ready, correctly sized SVG with all text converted to outlines.

## Live site

- https://charliesigma.github.io/gba-labels/

## Highlights

- Pre-built templates covering multiple GBA shell variants and warning stickers.
- Real-time SVG preview with pinch-zoom support on touch devices.
- Editable serial, barcode, and color fields with one-click reset to defaults.
- Optional border toggle for templates that expose light backgrounds.
- Downloads outlined SVGs so no fonts are required when printing.

## Getting started

### Prerequisites

- Node.js 18 or newer

### Install and run the dev server

```
npm install
npm run dev
```

Vite will print a local URL and a LAN URL; open either in your browser to start editing.

### Build for production

```
npm run build
npm run preview
```

`npm run build` outputs static assets to `dist/`. Run `npm run preview` to serve that build locally.

## Project layout

- `src/App.tsx` – top-level UI, template selection, and value management.
- `src/templates/config.ts` – template definitions, default values, and field metadata.
- `src/lib/svg.ts` – applies field values to loaded SVGs and handles outline export.
- `public/templates/` – raw SVG template files referenced by the config.
- `src/assets/global.css` – layout and responsive styling.

## Adding or updating templates

1. Drop the source SVG into `public/templates/` and ensure elements you plan to edit have `data-*` attributes (e.g., `data-foreground`, `data-stroke`).
2. Add a matching entry to `src/templates/config.ts`, specifying defaults and `fields` for any editable serial, color, or toggle controls.
3. Restart `npm run dev` if it was already running so Vite picks up the new asset.

Once saved, the template appears in the dropdown and responds to the configured fields.

## License

- Application code is released under the [MIT License](./LICENSE).
- SVG templates in `public/templates/` and any exported artwork are available under [CC BY 4.0](./LICENSE). Please credit **Charlie SIGMA** and link back to this repo or the live site when you use them.
