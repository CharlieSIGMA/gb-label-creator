import type { TemplateDefinition } from '../types';

const cMgb001Noe: TemplateDefinition = {
    id: 'c-mgb-001-noe',
    label: 'C/MGB-NOE (MGB-001)',
    svgPath: 'templates/C-MGB-NOE.svg',
    defaults: {
      foreground: '#000000',
      background: '#d7d7d7',
      stroke: true,
    },
    filename: () => 'c-mgb-noe-mgb-001.svg',
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
  export default cMgb001Noe;