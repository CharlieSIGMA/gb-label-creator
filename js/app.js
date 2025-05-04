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

// 5) Helper to convert text → paths
function outlineText(svgEl) {
  const cs = el => window.getComputedStyle(el).fontSize;

  // Find every TEXT node
  Array.from(svgEl.querySelectorAll('text')).forEach(textEl => {
    const str    = textEl.textContent || '';
    const id     = textEl.id;                 // serial or barcode
    const font   = id === 'barcode' ? barcodeFont : ocrFont;
    if (!font) return;                        // font still loading?

    // 1) Figure out the font-size in px
    const sizePx = parseFloat(cs(textEl));

    // 2) Grab any SVG-level transforms
    //    This includes inline transform on <text> AND on its parent <g>
    const ownXf  = textEl.getAttribute('transform') || '';
    const parentXf = textEl.parentNode.tagName === 'g'
                   ? (textEl.parentNode.getAttribute('transform') || '')
                   : '';
    const combinedTransform = [parentXf, ownXf].filter(Boolean).join(' ');

    // 3) Calculate the text’s “logical” x,y position
    //    (we ignore letter-spacing here, since barcode has none)
    const x      = parseFloat(textEl.getAttribute('x') || 0);
    const y      = parseFloat(textEl.getAttribute('y') || 0);

    // 4) Generate the outline path
    const path   = font.getPath(str, x, y, sizePx);
    const d      = path.toPathData(2);

    // 5) Create a <path> element and carry over style + transform
    const p      = document.createElementNS(svgEl.namespaceURI, 'path');
    p.setAttribute('d', d);

    // carry fill/stroke
    ['fill','fill-opacity','stroke','stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        p.setAttribute(attr, textEl.getAttribute(attr));
      }
    });

    // **bake in the SVG transforms** rather than relying on CSS
    if (combinedTransform) {
      p.setAttribute('transform', combinedTransform);
    }

    // 6) Replace the TEXT with our PATH
    svgEl.replaceChild(p, textEl);
  });
}

// 6) Download → await fonts → outline → serialize
dlBtn.addEventListener('click', async () => {
  // wait for fonts before you outline
  await fontsLoaded;

  const svgEl = preview.querySelector('svg');
  outlineText(svgEl);

  const svgStr = new XMLSerializer().serializeToString(svgEl);
  const blob   = new Blob([svgStr], { type: 'image/svg+xml' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href       = url;
  a.download   = 'custom-label.svg';
  a.click();
  URL.revokeObjectURL(url);
});

// 7) Kick things off
loadSVG(select.value).then(bindInputs);
