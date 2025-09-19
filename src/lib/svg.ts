// src/lib/svg.ts
import opentype from 'opentype.js';
import type { TemplateDefinition, Field } from '../templates/config';

const fontsPromise = Promise.all([
  opentype.load('/fonts/OCRBS.otf'),
  opentype.load('/fonts/LibreBarcode39-Regular.ttf')
]).then(([ocr, barcode]) => ({ ocr, barcode }));

export function applyFieldValue(svgRoot: SVGElement, field: Field, value: unknown) {
  const nodes = Array.from(svgRoot.querySelectorAll<SVGElement>(field.target));
  if (!nodes.length) return;

  if (field.type === 'text') {
    const node = nodes[0];
    const raw = String(value ?? '');
    const upper = field.uppercase ? raw.toUpperCase() : raw;
    const next = field.decorate ? field.decorate(upper) : upper;
    node.textContent = next;
  } else if (field.type === 'color') {
    const fillValue = String(value ?? '');
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

    const combinedTransform = [textEl.getAttribute('transform'), textEl.parentElement?.getAttribute('transform')]
      .filter(Boolean)
      .join(' ')
      .trim();

    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', pathData);
    if (combinedTransform) path.setAttribute('transform', combinedTransform);

    ['fill', 'fill-opacity', 'stroke', 'stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        path.setAttribute(attr, textEl.getAttribute(attr)!);
      }
    });

    const parent = textEl.parentElement;
    parent?.replaceChild(path, textEl);
    if (parent?.tagName === 'g' && parent.hasAttribute('transform')) {
      parent.removeAttribute('transform');
    }
  });
}

