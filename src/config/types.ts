// src/config/types.ts
export type TextTarget = {
  selector: string;
  decorate?: (value: string) => string;
};

export type TextField = {
  id: string;
  label: string;
  type: 'text';
  maxLength: number;
  uppercase?: boolean;
  targets: TextTarget[];
};

export type ColorField = {
  id: string;
  label: string;
  type: 'color';
  target: string;
};

export type ToggleField = {
  id: string;
  label: string;
  type: 'toggle';
  target: string;
  attribute: string;
  onValue: string;
  offValue: string;
};

export type Field = TextField | ColorField | ToggleField;

export type TemplateDefinition = {
  id: string;
  label: string;
  svgPath: string;
  filename: (values: Record<string, unknown>) => string;
  defaults: Record<string, unknown>;
  fields: Field[];
  hiddenFieldIds?: string[];
};
