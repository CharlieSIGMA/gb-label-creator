import type { TemplateDefinition } from '../types';

const cgb001PobEur: TemplateDefinition = {
    id: 'c-cgb-001-pob-eur',
    label: 'C/CGB-POB-EUR (CGB-001)',
    svgPath: 'templates/C-CGB-POB-EUR.svg',
    defaults: {
      foreground: '#ffffff',
      background: '#231f20',
      stroke: false,
    },
    filename: () => 'c-cgb-pob-eur-cgb-001.svg',
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
  export default cgb001PobEur;