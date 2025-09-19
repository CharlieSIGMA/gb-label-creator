// src/templates/config.ts
export type TextField = {
  id: string;
  label: string;
  type: 'text';
  maxLength: number;
  uppercase?: boolean;
  decorate?: (value: string) => string;
  target: string;
};

export type ColorField = {
  id: string;
  label: string;
  type: 'color';
  target: string;
};

export type Field = TextField | ColorField;

export type TemplateDefinition = {
  id: string;
  label: string;
  svgPath: string;
  filename: (values: Record<string, unknown>) => string;
  defaults: Record<string, unknown>;
  fields: Field[];
};

export const templates: TemplateDefinition[] = [
  {
    id: 'barcode-us',
    label: 'Barcode Label (US)',
    svgPath: '/templates/barcode-us.svg',
    defaults: {
      serial: 'AB123456789',
      barcode: 'AB123456789',
      primary: '#000000'
    },
    filename: values => `barcode-us-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        target: '#serial'
      },
      {
        id: 'barcode',
        label: 'Barcode',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        decorate: value => `*${value}*`,
        target: '#barcode'
      },
      {
        id: 'primary',
        label: 'Ink color',
        type: 'color',
        target: '[data-primary]'
      }
    ]
  }
];
