// src/components/FieldInput.tsx
import type { Field } from '../templates/config';

type Props = {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
};

export function FieldInput({ field, value, onChange }: Props) {
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
    return (
      <label>
        {field.label}
        <input
          type="color"
          value={String(value ?? '')}
          onChange={event => onChange(event.target.value)}
        />
      </label>
    );
  }

  return null;
}
