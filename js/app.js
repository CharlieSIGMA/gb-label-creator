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
  Array.from(svgEl.querySelectorAll('text')).forEach(textEl => {
    const str    = textEl.textContent || '';
    const id     = textEl.id;
    const x      = parseFloat(textEl.getAttribute('x') || 0);
    const y      = parseFloat(textEl.getAttribute('y') || 0);
    const sizePx = parseFloat(cs(textEl));
    const font   = id === 'barcode' ? window.barcodeFont : window.ocrFont;
    if (!font) return; // fonts not ready

    const path = font.getPath(str, x, y, sizePx);
    const d    = path.toPathData(2);
    const p    = document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d', d);

    // carry over fill/stroke if any
    ['fill','fill-opacity','stroke','stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        p.setAttribute(attr, textEl.getAttribute(attr));
      }
    });

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
