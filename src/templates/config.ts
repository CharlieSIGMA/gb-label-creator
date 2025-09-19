// src/templates/config.ts
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
    label: 'CGB/AGB Barcode (US)',
    svgPath: '/templates/barcode-us.svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#000000'
    },
    filename: values => `agb-cgb-barcode-us-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial & Barcode',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '#serial' },
          { selector: '#barcode', decorate: value => `*${value}*` }
        ]
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
