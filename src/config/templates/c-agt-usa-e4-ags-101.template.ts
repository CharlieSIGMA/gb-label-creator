import type { TemplateDefinition } from '../types';

const ags101E4Usa: TemplateDefinition = {
    id: 'c-agt-usa-e4-ags-101',
    label: 'C/AGT-USA E4 (AGS-101)',
    svgPath: 'templates/C-AGT-USA_E4_(AGS-101).svg',
    defaults: {
        serial: 'AB123456789',
        foreground: '#ffffff',
        background: '#231f20',
        stroke: false,
    },
    filename: values => `c-agt-usa-e4-ags-101-${String(values.serial ?? '').toUpperCase()}.svg`,
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

export default ags101E4Usa;