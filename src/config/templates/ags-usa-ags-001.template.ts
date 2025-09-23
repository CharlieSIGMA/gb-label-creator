import type { TemplateDefinition } from '../types';

const ags001Usa: TemplateDefinition = {
    id: 'c-ags-usa-ags-001',
    label: 'C/AGS-USA (AGS-001)',
    svgPath: 'templates/C-AGS-USA_(AGS-001).svg',
    defaults: {
        serial: 'AB123456789',
        foreground: '#ffffff',
        background: '#231f20',
        stroke: false,
    },
    filename: values => `c-ags-usa-ags-001-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
        {
            id: 'serial',
            label: 'Serial & Barcode',
            type: 'text',
            maxLength: 11,
            uppercase: true,
            targets: [
                { selector: '.barcode tspan', decorate: value => `*${value}*` },
                { selector: '[data-serial-part="prefix"]', decorate: value => value.padEnd(2, ' ').slice(0, 2) },
                { selector: '[data-serial-part="middle"]', decorate: value => value.padEnd(10, ' ').slice(2, 10) },
                { selector: '[data-serial-part="suffix"]', decorate: value => value.padEnd(11, ' ').slice(10, 11) }
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

export default ags001Usa;