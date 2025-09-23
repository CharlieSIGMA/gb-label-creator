// src/lib/svg.ts
import opentype from 'opentype.js';
import type { TemplateDefinition, Field, TextField } from '../config/types';

const fontsPromise = Promise.all([
  opentype.load('fonts/OCR-B.otf'),
  opentype.load('fonts/LibreBarcode39-Regular.ttf')
]).then(([ocr, barcode]) => ({ ocr, barcode }));

const slashedZeroGlyphCache = new WeakMap<opentype.Font, opentype.Glyph | null>();

type FontInternals = {
  substitution?: {
    getSingle?: (feature: string, script?: string, language?: string) => Array<{ sub: number; by: number }> | undefined;
  };
  glyphs?: {
    get: (index: number) => opentype.Glyph | undefined;
  };
};

type ZeroSubstitution = { sub: number; by: number };

function resolveSlashedZeroGlyph(font: opentype.Font) {
  if (!slashedZeroGlyphCache.has(font)) {
    const zeroGlyph = font.charToGlyph('0');
    const zeroGlyphIndex = (zeroGlyph as unknown as { index?: number }).index;
    const internals = font as unknown as FontInternals;
    const substitutions = internals.substitution?.getSingle?.('zero', 'latn', 'dflt') ?? [];
    let glyph: opentype.Glyph | null = null;
    if (typeof zeroGlyphIndex === "number") {
      const match = substitutions.find((entry): entry is ZeroSubstitution => {
        return !!entry && typeof entry.sub === "number" && typeof entry.by === "number" && entry.sub === zeroGlyphIndex;
      });
      glyph = match ? internals.glyphs?.get(match.by) ?? null : null;
    }
    slashedZeroGlyphCache.set(font, glyph);
  }
  return slashedZeroGlyphCache.get(font) ?? null;
}

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
    return;
  }

  if (field.type === 'toggle') {
    const enabled = Boolean(value);
    const nodes = svgRoot.querySelectorAll<SVGElement>(field.target);
    nodes.forEach(node => {
      node.setAttribute(field.attribute, enabled ? field.onValue : field.offValue);
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

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.style.position = "absolute";
  clone.style.left = "-10000px";
  clone.style.top = "-10000px";
  clone.style.opacity = "0";
  svg.parentNode?.appendChild(clone);

  outlineText(clone, { serialFont: ocr, barcodeFont: barcode });

  const exportSvg = clone.cloneNode(true) as SVGSVGElement;
  exportSvg.removeAttribute('style');
  exportSvg.querySelectorAll('defs').forEach(def => {
    def.parentNode?.removeChild(def);
  });
  const serialized = new XMLSerializer().serializeToString(exportSvg);
  svg.parentNode?.removeChild(clone);

  const blob = new Blob([serialized], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = template.filename(values);
  anchor.click();
  URL.revokeObjectURL(url);
}


type OutlineFonts = { serialFont: opentype.Font; barcodeFont: opentype.Font };

function outlineText(svg: SVGSVGElement, fonts: OutlineFonts) {
  const resolveTextLength = (value: string, naturalWidth: number) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const numeric = parseFloat(trimmed);
    if (!Number.isFinite(numeric)) return null;
    if (trimmed.endsWith('%')) {
      return naturalWidth * (numeric / 100);
    }
    return numeric;
  };

  svg.querySelectorAll('text').forEach(textEl => {
    const isBarcode = textEl.classList.contains('barcode');
    const font = isBarcode ? fonts.barcodeFont : fonts.serialFont;
    if (!font) return;

    const raw = textEl.textContent ?? '';
    const sanitized = raw.replace(/[\r\n\t]/g, '');
    if (!sanitized) {
      textEl.remove();
      return;
    }

    const style = getComputedStyle(textEl as Element);
    const size = parseFloat(style.fontSize);
    const letterSpacingValue = parseFloat(style.letterSpacing);
    const tracking = Number.isFinite(letterSpacingValue) ? letterSpacingValue : 0;
    const variantNumeric = style.fontVariantNumeric || '';
    const applySlashedZero = variantNumeric.split(/\s+/).includes('slashed-zero');

    const x0 = parseFloat(textEl.getAttribute('x') ?? '0');
    const y = parseFloat(textEl.getAttribute('y') ?? '0');

    let cursor = x0;
    let pathData = '';
    const characters = Array.from(sanitized);
    const lastIndex = characters.length - 1;
    characters.forEach((ch, index) => {
      let glyph = font.charToGlyph(ch);
      if (applySlashedZero && ch === '0') {
        glyph = resolveSlashedZeroGlyph(font) ?? glyph;
      }
      const glyphPath = glyph.getPath(cursor, y, size);
      pathData += glyphPath.toPathData(2);
      cursor += (glyph.advanceWidth / font.unitsPerEm) * size;
      if (index < lastIndex) {
        cursor += tracking;
      }
    });

    const naturalWidth = cursor - x0;

    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', pathData);

    const transforms: string[] = [];
    const textTransform = textEl.getAttribute('transform')?.trim();
    if (textTransform) transforms.push(textTransform);

    const textLengthAttr = textEl.getAttribute('textLength');
    const lengthAdjust = textEl.getAttribute('lengthAdjust');
    if (textLengthAttr && naturalWidth > 0) {
      const target = resolveTextLength(textLengthAttr, naturalWidth);
      if (target && lengthAdjust === 'spacingAndGlyphs') {
        const scaleX = target / naturalWidth;
        if (Number.isFinite(scaleX) && Math.abs(scaleX - 1) > 1e-6) {
          transforms.push(`translate(${x0} 0) scale(${scaleX} 1) translate(${-x0} 0)`);
        }
      }
    }

    if (transforms.length) {
      path.setAttribute('transform', transforms.join(' '));
    }

    ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'data-primary'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        path.setAttribute(attr, textEl.getAttribute(attr)!);
      }
    });

    const parent = textEl.parentElement;
    parent?.replaceChild(path, textEl);
  });
}
