const preview = document.getElementById('preview');
const select  = document.getElementById('templateSelect');
const serialI = document.getElementById('serialInput');
const dlBtn   = document.getElementById('downloadBtn');

// 1) Load chosen SVG inline
async function loadSVG(name) {
  const res = await fetch(`templates/${name}`);
  const svgText = await res.text();
  preview.innerHTML = svgText;
}

// 2) When template or input changes → update SVG text
select.addEventListener('change', () => {
  loadSVG(select.value).then(() => {
    bindInputs();
  });
});

function bindInputs() {
  serialI.addEventListener('input', () => {
    const txt = preview.querySelector('#serial');
    if (txt) txt.textContent = serialI.value;
  });
}

// 3) Download the modified SVG
dlBtn.addEventListener('click', () => {
  const svgEl = preview.querySelector('svg');
  const svgStr = new XMLSerializer().serializeToString(svgEl);
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `custom-label.svg`;
  a.click();
  URL.revokeObjectURL(url);
});

// init
loadSVG(select.value).then(bindInputs);
