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
    // update the live counter
    charCount.textContent = serialI.value.length;
  };
}

// 3) when you switch templates, reload SVG and re-bind
select.addEventListener('change', () => {
  loadSVG(select.value).then(bindInputs);
});

// 4) download the current SVG
dlBtn.addEventListener('click', () => {
  const svgEl  = preview.querySelector('svg');
  const svgStr = new XMLSerializer().serializeToString(svgEl);
  const blob   = new Blob([svgStr], { type: 'image/svg+xml' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href       = url;
  a.download   = `custom-label.svg`;
  a.click();
  URL.revokeObjectURL(url);
});

// 5) initial load
loadSVG(select.value).then(bindInputs);
