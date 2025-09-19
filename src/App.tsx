// src/App.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { templates } from './templates/config';
import { FieldInput } from './components/FieldInput';
import { applyTemplateValues, downloadOutlinedSvg } from './lib/svg';

const templateById = new Map(templates.map(t => [t.id, t]));

export function App() {
  const [activeId, setActiveId] = useState(templates[0]?.id ?? '');
  const template = useMemo(() => templateById.get(activeId) ?? templates[0], [activeId]);
  const [values, setValues] = useState<Record<string, unknown>>(template.defaults);
  const svgHostRef = useRef<HTMLDivElement>(null);

  // reload SVG when changing template
  useEffect(() => {
    if (!template) return;
    setValues(template.defaults);
    fetch(template.svgPath)
      .then(res => res.text())
      .then(markup => {
        if (!svgHostRef.current) return;
        svgHostRef.current.innerHTML = markup;
        applyTemplateValues(svgHostRef.current, template, template.defaults);
      });
  }, [template]);

  // apply updates on value change
  useEffect(() => {
    if (!svgHostRef.current) return;
    applyTemplateValues(svgHostRef.current, template, values);
  }, [template, values]);

  return (
    <div className="layout">
      <aside className="panel">
        <label>
          Template
          <select value={activeId} onChange={event => setActiveId(event.target.value)}>
            {templates.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        {template.fields.map(field => (
          <FieldInput
            key={field.id}
            field={field}
            value={values[field.id]}
            onChange={value => setValues(prev => ({ ...prev, [field.id]: value }))}
          />
        ))}

        <button
          type="button"
          onClick={() => {
            const svg = svgHostRef.current?.querySelector('svg');
            if (svg) downloadOutlinedSvg(svg, template, values);
          }}
        >
          Download SVG
        </button>
      </aside>

      <section className="preview" ref={svgHostRef} />
    </div>
  );
}
