import type { TemplateDefinition } from '../types';

const cgb001PobJpn2: TemplateDefinition = {
    id: 'cgb-001-pob-jpn-2',
    label: 'CGB-POB-JPN-2 (CGB-001)',
    svgPath: 'templates/CGB-POB-JPN-2.svg',
    defaults: {
      foreground: '#ffffff',
      background: '#231f20',
      stroke: false,
    },
    filename: () => 'cgb-pob-jpn-2-cgb-001.svg',
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
  }
  export default cgb001PobJpn2;