// src/lib/svg.ts
import opentype from 'opentype.js';
import type { TemplateDefinition, Field, TextField } from '../templates/config';

const fontsPromise = Promise.all([
  opentype.load('/fonts/OCRBS.otf'),
  opentype.load('/fonts/LibreBarcode39-Regular.ttf')
]).then(([ocr, barcode]) => ({ ocr, barcode }));

function applyTextField(svgRoot: SVGElement, field: TextField, value: unknown) {
  const raw = String(value ?? '');
  const base = field.uppercase ? raw.toUpperCase() : raw;

  field.targets.forEach(({ selector, decorate }) => {
    const textValue = decorate ? decorate(base) : base;
    const nodes = svgRoot.querySelectorAll<SVGElement>(selector);
    nodes.forEach(node => {
      node.textContent = textValue;
    });
  });
}

export function applyFieldValue(svgRoot: SVGElement, field: Field, value: unknown) {
  if (field.type === 'text') {
    applyTextField(svgRoot, field, value);
    return;
  }

  if (field.type === 'color') {
    const fillValue = String(value ?? '');
    const nodes = svgRoot.querySelectorAll<SVGElement>(field.target);
    nodes.forEach(node => {
      node.setAttribute('fill', fillValue);
    });
  }
}

export function applyTemplateValues(svgHost: HTMLElement, template: TemplateDefinition, values: Record<string, unknown>) {
  const svg = svgHost.querySelector('svg');
  if (!svg) return;
  for (const field of template.fields) {
    const actual = values[field.id] ?? template.defaults[field.id];
    applyFieldValue(svg, field, actual);
  }
}

export async function downloadOutlinedSvg(svg: SVGSVGElement, template: TemplateDefinition, values: Record<string, unknown>) {
  const { ocr, barcode } = await fontsPromise;
  outlineText(svg, { serialFont: ocr, barcodeFont: barcode });
  const serialized = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([serialized], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = template.filename(values);
  anchor.click();
  URL.revokeObjectURL(url);
}

type OutlineFonts = { serialFont: opentype.Font; barcodeFont: opentype.Font };

function outlineText(svg: SVGSVGElement, fonts: OutlineFonts) {
  const toPx = (el: Element) => parseFloat(getComputedStyle(el as Element).fontSize);
  const letterSpacing = (el: Element) => parseFloat(getComputedStyle(el as Element).letterSpacing);

  svg.querySelectorAll('text').forEach(textEl => {
    const id = textEl.id;
    const font = id === 'barcode' ? fonts.barcodeFont : fonts.serialFont;
    if (!font) return;

    const raw = textEl.textContent ?? '';
    const x0 = parseFloat(textEl.getAttribute('x') ?? '0');
    const y = parseFloat(textEl.getAttribute('y') ?? '0');
    const size = toPx(textEl);
    const tracking = id === 'serial' ? letterSpacing(textEl) : 0;

    let cursor = x0;
    let pathData = '';
    for (const ch of raw) {
      const glyph = font.charToGlyph(ch);
      const glyphPath = glyph.getPath(cursor, y, size);
      pathData += glyphPath.toPathData(2);
      cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking;
    }

    const textTransform = textEl.getAttribute('transform')?.trim();

    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', pathData);
    if (textTransform) path.setAttribute('transform', textTransform);

    ['fill', 'fill-opacity', 'stroke', 'stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        path.setAttribute(attr, textEl.getAttribute(attr)!);
      }
    });

    const parent = textEl.parentElement;
    parent?.replaceChild(path, textEl);
  });
}

