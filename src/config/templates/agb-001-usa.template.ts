import type { TemplateDefinition } from '../types';

const agb001Usa: TemplateDefinition = {
    id: 'c-agb-001-usa',
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
  }
  export default agb001Usa;