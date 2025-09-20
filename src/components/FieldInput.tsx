// src/components/FieldInput.tsx
import type { Field } from '../templates/config';

type Props = {
  field: Field;
  value: unknown;
  defaultValue?: unknown;
  onChange: (value: unknown) => void;
};

export function FieldInput({ field, value, defaultValue, onChange }: Props) {
  if (field.type === 'text') {
    return (
      <label>
        {field.label}
        <input
          type="text"
          maxLength={field.maxLength}
          value={String(value ?? '')}
          onChange={event => onChange(event.target.value)}
        />
        <small>{String(value ?? '').length}/{field.maxLength}</small>
      </label>
    );
  }

  if (field.type === 'color') {
    const colorValue = typeof value === 'string' ? value : '';
    const defaultColor = typeof defaultValue === 'string' ? defaultValue : '';
    const effectiveValue = colorValue || defaultColor;
    const isAtDefault = !!defaultColor && effectiveValue === defaultColor;

    return (
      <label className="field field--color">
        {field.label}
        <div className="field-color-controls">
          <input
            type="color"
            value={effectiveValue}
            onChange={event => onChange(event.target.value)}
          />
          <button
            type="button"
            className="field-reset"
            onClick={() => defaultColor && onChange(defaultColor)}
            disabled={!defaultColor || isAtDefault}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M17.454,2.546l-2.504,2.504c-1.267-1.267-3.017-2.05-4.95-2.05-3.866,0-7,3.134-7,7s3.134,7,7,7c1.933,0,3.683-.784,4.95-2.05l-1.416-1.416c-.905.905-2.155,1.466-3.534,1.466-2.757,0-5-2.243-5-5s2.243-5,5-5c1.379,0,2.628.561,3.534,1.466l-2.504,2.504,6.892.469-.468-6.893Z" fill="currentColor" /></svg>
            <span>Reset</span>
          </button>
        </div>
      </label>
    );
  }

  return null;
}
