import type { TemplateDefinition } from '../types';

const agb001Chn: TemplateDefinition = {
  id: 'gba-001-chn-ique',
  label: 'AGB-iQUE (GBA-001)',
  svgPath: 'templates/AGB-iQUE.svg',
  defaults: {
    foreground: '#ffffff',
    background: '#595a5c',
    stroke: false,
  },
  filename: () => 'gba-001-chn-ique.svg',
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

export default agb001Chn;