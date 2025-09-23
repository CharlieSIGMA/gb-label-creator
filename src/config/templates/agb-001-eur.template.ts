import type { TemplateDefinition } from '../types';

const agb001Eur: TemplateDefinition = {
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
}

export default agb001Eur;