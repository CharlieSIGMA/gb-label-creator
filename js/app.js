// js/app.js

// 0) Load opentype.js beforehand in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js"></script>

// grab DOM elements
const preview   = document.getElementById('preview');
const select    = document.getElementById('templateSelect');
const serialI   = document.getElementById('serialInput');
const charCount = document.getElementById('charCount');
const dlBtn     = document.getElementById('downloadBtn');

// 1) Fetch & inject SVG
async function loadSVG(name) {
  const res     = await fetch(`templates/${name}`);
  const svgText = await res.text();
  preview.innerHTML = svgText;
}

// 2) Wire up the serial + barcode fields + counter
function bindInputs() {
  const serialTxt  = preview.querySelector('#serial');
  const barcodeTxt = preview.querySelector('#barcode');

  // initialize counter
  charCount.textContent = serialI.value.length;

  // replace any previous handler
  serialI.oninput = () => {
    // enforce max length
    if (serialI.value.length > 11) {
      serialI.value = serialI.value.slice(0, 11);
    }
    // update human text
    if (serialTxt)  serialTxt.textContent  = serialI.value;
    // update barcode (with asterisks)
    if (barcodeTxt) barcodeTxt.textContent = `*${serialI.value}*`;
    // update counter
    charCount.textContent = serialI.value.length;
  };
}

// 3) Reload on template switch
select.addEventListener('change', () => {
  loadSVG(select.value).then(bindInputs);
});

// 4) Load your fonts once (relative paths!)
const fontsLoaded = Promise.all([
  opentype.load('fonts/OCRBS.otf').then(f => window.ocrFont = f),
  opentype.load('fonts/LibreBarcode39-Regular.ttf').then(f => window.barcodeFont = f)
]).catch(console.error);

// 5) Helper to convert text → paths, preserving letter-spacing for #serial
function outlineText(svgEl) {
  const px = el => parseFloat(getComputedStyle(el).fontSize);
  const ls = el => parseFloat(getComputedStyle(el).letterSpacing);

  Array.from(svgEl.querySelectorAll('text')).forEach(textEl => {
    const str    = textEl.textContent || '';
    const id     = textEl.id;                 // “serial” or “barcode”
    const font   = id === 'barcode' ? barcodeFont : ocrFont;
    if (!font) return;                        // still loading?

    // 1) Glyph metrics
    const x0      = parseFloat(textEl.getAttribute('x') || 0);
    const y       = parseFloat(textEl.getAttribute('y') || 0);
    const sizePx  = px(textEl);
    const spacing = id === 'serial' ? ls(textEl) : 0;

    // 2) Build combined path data with tracking baked into the geometry
    let cursorX   = x0;
    let combinedD = '';
    for (let ch of str) {
      const glyph = font.charToGlyph(ch);
      const pth   = glyph.getPath(cursorX, y, sizePx);
      combinedD  += pth.toPathData(2);
      cursorX   += (glyph.advanceWidth / font.unitsPerEm) * sizePx + spacing;
    }

    // 3) Pull transforms off both the <text> and its parent <g>
    const ownXf     = textEl.getAttribute('transform') || '';
    const parent    = textEl.parentNode;
    const parentXf  = parent.tagName === 'g'
                    ? parent.getAttribute('transform') || ''
                    : '';
    const xf        = [parentXf, ownXf].filter(Boolean).join(' ');

    // 4) Create the <path>, bake in that single combined transform
    const p = document.createElementNS(svgEl.namespaceURI, 'path');
    p.setAttribute('d', combinedD);
    if (xf) p.setAttribute('transform', xf);

    // 5) Copy fill/stroke from the original <text>
    ['fill','fill-opacity','stroke','stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        p.setAttribute(attr, textEl.getAttribute(attr));
      }
    });

    // 6) Swap it out, then scrub the group’s transform so it won’t apply twice
    parent.replaceChild(p, textEl);
    if (parent.tagName === 'g' && parentXf) {
      parent.removeAttribute('transform');
    }
  });
}

// 6) Download → await fonts → outline → serialize → download
dlBtn.addEventListener('click', async e => {
  e.preventDefault();
  await fontsLoaded;

  const svgEl  = preview.querySelector('svg');
  outlineText(svgEl);

  const svgStr = new XMLSerializer().serializeToString(svgEl);
  const blob   = new Blob([svgStr], { type: 'image/svg+xml' });
  const url    = URL.createObjectURL(blob);

  // append, click, remove
  const a = document.createElement('a');
  a.href        = url;
  a.download    = 'barcode-us-custom.svg';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // revoke after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});


// 7) Kick things off
loadSVG(select.value).then(bindInputs);
