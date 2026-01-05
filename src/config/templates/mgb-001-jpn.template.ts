import type { TemplateDefinition } from '../types';

const Mgb001Jpn: TemplateDefinition = {
    id: 'mgb-001-jpn',
    label: 'MGB-JPN (MGB-001)',
    svgPath: 'templates/MGB-JPN.svg',
    defaults: {
      foreground: '#000000',
      background: '#d7d7d7',
      stroke: true,
    },
    filename: () => 'mgb-jpn-mgb-001.svg',
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
  export default Mgb001Jpn;