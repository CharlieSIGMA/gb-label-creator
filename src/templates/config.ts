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
        label: 'Barcode & Serial color',
        type: 'color',
        target: '[data-primary="barcode+serial"]'
      }
    ]
  },
  {
    id: 'agb-001-jpn',
    label: 'AGB-JPN (AGB-001)',
    svgPath: '/templates/AGB-JPN.svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `agb-jpn-agb-001-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
          { selector: '[data-serial-part="numbers"]', decorate: value => value.padEnd(10, ' ').slice(2, 11) }
        ]
      },
      {
        id: 'primary',
        label: 'Serial color',
        type: 'color',
        target: '[data-primary="serial"]'
      }
    ]
  },
  {
    id: 'c-agb-001-jpn-1',
    label: 'C/AGB-JPN-1 (AGB-001)',
    svgPath: '/templates/AGB-JPN-1.svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `c-agb-jpn-1-agb-001-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
          { selector: '[data-serial-part="numbers"]', decorate: value => value.padEnd(10, ' ').slice(2, 11) }
        ]
      },
      {
        id: 'primary',
        label: 'Serial color',
        type: 'color',
        target: '[data-primary="serial"]'
      }
    ]
  },
  {
    id: 'agb-001-eur',
    label: 'C/AGB-EUR (AGB-001)',
    svgPath: '/templates/AGB-EUR.svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `c-agb-eur-agb-001-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
          { selector: '[data-serial-part="numbers"]', decorate: value => value.padEnd(10, ' ').slice(2, 11) }
        ]
      },
      {
        id: 'primary',
        label: 'Serial color',
        type: 'color',
        target: '[data-primary="serial"]'
      }
    ]
  },
  {
    id: 'agb-001-usa',
    label: 'C/AGB-USA-1 (AGB-001)',
    svgPath: '/templates/AGB-USA-1.svg',
    defaults: {
      //serial: 'AB123456789',
      //primary: '#231f20'
    },
    filename: values => `c-agb-eur-agb-001-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
      {
        id: 'serial',
        label: 'Serial',
        type: 'text',
        maxLength: 11,
        uppercase: true,
        targets: [
          { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
          { selector: '[data-serial-part="numbers"]', decorate: value => value.padEnd(10, ' ').slice(2, 11) }
        ]
      },
      {
        id: 'primary',
        label: 'Serial color',
        type: 'color',
        target: '[data-primary="serial"]'
      }
    ]
  },
  {
    id: 'c-agt-usa-ags-101',
    label: 'C/AGT-USA (AGS-101)',
    svgPath: '/templates/C-AGT-USA_(AGS-101).svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `c-agt-usa-ags-101-${String(values.serial ?? '').toUpperCase()}.svg`,
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
        label: 'Barcode & serial color',
        type: 'color',
        target: '[data-primary="barcode+serial"]'
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
        label: 'Barcode & serial color',
        type: 'color',
        target: '[data-primary="barcode+serial"]'
      }
    ]
  },
  {
    id: 'c-ags-usa-ags-001',
    label: 'C/AGS-USA (AGS-001)',
    svgPath: '/templates/C-AGS-USA_(AGS-001).svg',
    defaults: {
      serial: 'AB123456789',
      primary: '#231f20'
    },
    filename: values => `c-ags-usa-ags-001-${String(values.serial ?? '').toUpperCase()}.svg`,
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
        label: 'Barcode & serial color',
        type: 'color',
        target: '[data-primary="barcode+serial"]'
      }
    ]
  }
];


