// js/app.js

// grab all of our elements once
const preview   = document.getElementById('preview');
const select    = document.getElementById('templateSelect');
const serialI   = document.getElementById('serialInput');
const charCount = document.getElementById('charCount');
const dlBtn     = document.getElementById('downloadBtn');

// 1) load an SVG into #preview
async function loadSVG(name) {
  const res     = await fetch(`templates/${name}`);
  const svgText = await res.text();
  preview.innerHTML = svgText;
}

// 2) bind your input → update SVG text & counter
function bindInputs() {
  // find the <text id="serial"> inside the freshly loaded SVG
  const serialTxt = preview.querySelector('#serial');
  const barcodeTxt = preview.querySelector('#barcode');
  // set the counter to the current value in case of template changes
  charCount.textContent = serialI.value.length;

  // remove any existing listener before adding a new one
  serialI.oninput = () => {
    // enforce maxlength for pasted text
    if (serialI.value.length > 11) {
      serialI.value = serialI.value.slice(0, 11);
    }

    // update the SVG
    if (serialTxt) {
      serialTxt.textContent = serialI.value;
    }
    // update barcode (wrap in asterisks)
    if (barcodeTxt) {
      barcodeTxt.textContent = `*${serialI.value}*`;
    }
    // update the live counter
    charCount.textContent = serialI.value.length;
  };
}

// 3) when you switch templates, reload SVG and re-bind
select.addEventListener('change', () => {
  loadSVG(select.value).then(bindInputs);
});

// 4) download the current SVG
// New: load both fonts once
let ocrFont, barcodeFont;
Promise.all([
  opentype.load('/fonts/OCRBS.otf').then(f => ocrFont = f),
  opentype.load('/fonts/LibreBarcode39-Regular.ttf').then(f => barcodeFont = f)
]).catch(console.error);

// Replace your dlBtn click-handler with:
dlBtn.addEventListener('click', async () => {
  const svgEl = preview.querySelector('svg');

  // 1) convert all <text> → <path>
  outlineText(svgEl);

  // 2) serialize & download
  const svgStr = new XMLSerializer().serializeToString(svgEl);
  const blob   = new Blob([svgStr], { type: 'image/svg+xml' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href       = url;
  a.download   = `custom-label.svg`;
  a.click();
  URL.revokeObjectURL(url);
});

function outlineText(svgEl) {
  // getComputedStyle helper
  const cs = el => window.getComputedStyle(el).fontSize;

  // grab every text node
  const texts = Array.from(svgEl.querySelectorAll('text'));
  texts.forEach(textEl => {
    const str    = textEl.textContent || '';
    const id     = textEl.id;         // “serial” or “barcode”
    const x      = parseFloat(textEl.getAttribute('x') || '0');
    const y      = parseFloat(textEl.getAttribute('y') || '0');

    // measure the font size in pixels from computed style
    const sizePx = parseFloat(cs(textEl));

    // pick the right font
    const font = id === 'barcode' ? barcodeFont : ocrFont;
    if (!font) return; // not yet loaded

    // generate the outline path
    const path = font.getPath(str, x, y, sizePx);
    const d    = path.toPathData(2);

    // make a <path> that carries over fill/fill-opacity/etc.
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    // copy relevant style attributes
    ['fill','fill-opacity','stroke','stroke-width'].forEach(attr => {
      if (textEl.hasAttribute(attr)) {
        p.setAttribute(attr, textEl.getAttribute(attr));
      }
    });

    // replace the <text> with our outlined <path>
    svgEl.replaceChild(p, textEl);
  });
}

// 5) initial load
loadSVG(select.value).then(bindInputs);
