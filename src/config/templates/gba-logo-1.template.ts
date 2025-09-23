import type { TemplateDefinition } from '../types';

const gbaLogo1: TemplateDefinition = {
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
}

export default gbaLogo1;