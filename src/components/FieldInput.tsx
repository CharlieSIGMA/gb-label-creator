// src/components/FieldInput.tsx
import { useRef, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import type { Field } from '../templates/config';

type Props = {
  field: Field;
  value: unknown;
  defaultValue?: unknown;
  onChange: (value: unknown) => void;
};

const HEX_MATCHER = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const FALLBACK_HEX = '#000000';

function sanitizeHexColor(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  const match = HEX_MATCHER.exec(trimmed);
  if (!match) return null;
  const value = match[1];
  const expanded = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  return `#${expanded.toLowerCase()}`;
}

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

  if (field.type === 'toggle') {
    const defaultChecked = typeof defaultValue === 'boolean' ? defaultValue : Boolean(defaultValue);
    const checked = typeof value === 'boolean' ? value : defaultChecked;

    return (
      <label className="field field--toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={event => onChange(event.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type !== 'color') {
    return null;
  }

  const normalizedDefault = sanitizeHexColor(defaultValue) ?? FALLBACK_HEX;
  const normalizedValue = sanitizeHexColor(value);
  const color = normalizedValue ?? normalizedDefault;
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleColorChange = (nextColor: string) => {
    const sanitized = sanitizeHexColor(nextColor) ?? color;
    onChange(sanitized);
  };

  const handleReset = () => {
    onChange(normalizedDefault);
    setIsPickerOpen(false);
  };

  const handleOpen = () => {
    setIsPickerOpen(true);
    triggerRef.current?.focus();
  };

  return (
    <label className="field field--color">
      {field.label}
      <div className="field-color-controls">
        <button
          type="button"
          ref={triggerRef}
          className="field-color-trigger"
          style={{ backgroundColor: color }}
          onClick={handleOpen}
          aria-label={`Select ${field.label} color`}
          aria-haspopup="dialog"
          aria-expanded={isPickerOpen}
        />
        <button
          type="button"
          className="field-reset"
          onClick={handleReset}
          disabled={color === normalizedDefault}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M17.454,2.546l-2.504,2.504c-1.267-1.267-3.017-2.05-4.95-2.05-3.866,0-7,3.134-7,7s3.134,7,7,7c1.933,0,3.683-.784,4.95-2.05l-1.416-1.416c-.905.905-2.155,1.466-3.534,1.466-2.757,0-5-2.243-5-5s2.243-5,5-5c1.379,0,2.628.561,3.534,1.466l-2.504,2.504,6.892.469-.468-6.893Z" fill="currentColor" /></svg>
          <span>Reset</span>
        </button>

        {isPickerOpen && (
          <div className="field-color-popover" role="dialog" aria-label={`${field.label} color picker`}>
            <button
              type="button"
              className="field-color-close"
              onClick={() => setIsPickerOpen(false)}
              aria-label="Close color picker"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.22 3.22a.75.75 0 0 1 1.06 0L8 6.94l3.72-3.72a.75.75 0 0 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 0 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor" />
              </svg>
            </button>
            <HexColorPicker color={color} onChange={handleColorChange} />
            <HexColorInput
              aria-label="Hex color value"
              color={color}
              prefixed
              onChange={handleColorChange}
              className="field-color-hex-input"
            />
          </div>
        )}
      </div>
    </label>
  );
}
