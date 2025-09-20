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
          { selector: '.serial' },
          { selector: '.barcode', decorate: value => `*${value}*` }
        ]
      },
      {
        id: 'primary',
        label: 'Ink color',
        type: 'color',
        target: '[data-primary]'
      }
    ]
  },
  {
    id: 'c-agt-usa-e4-ags-101',
    label: 'C/AGT-USA E4 (AGS-101)',
    svgPath: '/templates/C-AGT-USA_E4_(AGS-101).svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `c-agt-usa-e4-ags-101-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial & Barcode',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '.barcode tspan', decorate: value => `*${value}*` },
          { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
          { selector: '[data-serial-part="middle"]', decorate: value => value.padEnd(10, ' ').slice(2, 10) },
          { selector: '[data-serial-part="suffix"]', decorate: value => value.padEnd(11, ' ').slice(10, 11) }
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


