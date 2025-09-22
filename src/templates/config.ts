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

export const templates: TemplateDefinition[] = [
  {
    id: 'barcode-us',
    label: 'CGB/AGB Barcode (US)',
    svgPath: 'templates/barcode-us.svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#000000',
      background: '#ffffff',
      stroke: true,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'agb-001-jpn',
    label: 'AGB-JPN (AGB-001)',
    svgPath: 'templates/AGB-JPN.svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#595a5c',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'c-agb-001-jpn-1',
    label: 'C/AGB-JPN-1 (AGB-001)',
    svgPath: 'templates/AGB-JPN-1.svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#595a5c',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'agb-001-eur',
    label: 'C/AGB-EUR (AGB-001)',
    svgPath: 'templates/AGB-EUR.svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#595a5c',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'agb-001-usa',
    label: 'C/AGB-USA-1 (AGB-001)',
    svgPath: 'templates/AGB-USA-1.svg',
    defaults: {
      foreground: '#ffffff',
      background: '#595a5c',
      stroke: false,
    },
    filename: () => 'c-agb-usa-1-agb-001.svg',
    fields: [
      {
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ],
  },
  {
    id: 'c-ags-usa-ags-001',
    label: 'C/AGS-USA (AGS-001)',
    svgPath: 'templates/C-AGS-USA_(AGS-001).svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#231f20',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'c-agt-usa-ags-101',
    label: 'C/AGT-USA (AGS-101)',
    svgPath: 'templates/C-AGT-USA_(AGS-101).svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#231f20',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'c-agt-usa-e4-ags-101',
    label: 'C/AGT-USA E4 (AGS-101)',
    svgPath: 'templates/C-AGT-USA_E4_(AGS-101).svg',
    defaults: {
      serial: 'AB123456789',
      foreground: '#ffffff',
      background: '#231f20',
      stroke: false,
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
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ]
  },
  {
    id: 'warning',
    label: 'Warning',
    svgPath: 'templates/warning.svg',
    defaults: {
      foreground: '#ffffff',
      background: '#404041',
      stroke: false,
    },
    filename: () => 'warning.svg',
    fields: [
      {
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ],
    //hiddenFieldIds: ['foreground']
  },
  {
    id: 'gba-logo-1',
    label: 'GBA Logo 1',
    svgPath: 'templates/GBA_Logo_1.svg',
    defaults: {
      foreground: '#000000',
      background: '#ffffff',
      stroke: true,
    },
    filename: () => 'gba-logo-1.svg',
    fields: [
      {
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ],
    //hiddenFieldIds: ['foreground']
  },
  {
    id: 'gba-logo-2',
    label: 'GBA Logo 2',
    svgPath: 'templates/GBA_Logo_2.svg',
    defaults: {
      foreground: '#000000',
      background: '#ffffff',
      stroke: true,
    },
    filename: () => 'gba-logo-2.svg',
    fields: [
      {
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ],
    //hiddenFieldIds: ['foreground']
  },
  {
    id: 'gba-logo-3',
    label: 'GBA Logo 3',
    svgPath: 'templates/GBA_Logo_3.svg',
    defaults: {
      foreground: '#000000',
      background: '#ffffff',
      stroke: true,
    },
    filename: () => 'gba-logo-3.svg',
    fields: [
      {
        id: 'foreground',
        label: 'Foreground colour',
        type: 'color',
        target: '[data-foreground="foreground"]'
      },
      {
        id: 'background',
        label: 'Background colour',
        type: 'color',
        target: '[data-background="background"]'
      },
      {
        id: 'stroke',
        label: 'Enable dashed border',
        type: 'toggle',
        target: '[data-stroke="stroke"]',
        attribute: 'stroke',
        onValue: '#a8a8ab',
        offValue: 'none'
      },
    ],
    //hiddenFieldIds: ['foreground']
  },
];


