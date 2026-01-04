import type { TemplateDefinition } from '../types';

const agb001Jpn1_8: TemplateDefinition = {
    id: 'c-agb-001-jpn-1_8',
    label: 'C/AGB-JPN-1 (AGB-001) (8-char serial)',
    svgPath: 'templates/AGB-JPN-1_8.svg',
    defaults: {
        serial: 'AB12345678',
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
            maxLength: 10,
            uppercase: true,
            targets: [
                { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
                { selector: '[data-serial-part="numbers"]', decorate: value => value.padEnd(10, ' ').slice(2, 10) }
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
export default agb001Jpn1_8;