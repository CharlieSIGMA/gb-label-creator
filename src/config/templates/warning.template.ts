import type { TemplateDefinition } from '../types';

const warning: TemplateDefinition = {
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
}

export default warning;