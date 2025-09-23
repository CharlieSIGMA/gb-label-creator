import type { TemplateDefinition } from '../types';

const barcodeUs: TemplateDefinition = {
    id: 'barcode-us',
    label: 'CGB/AGB Barcode (US)',
    svgPath: 'templates/barcode-us.svg',
    defaults: {
        serial: 'AB123456789',
        foreground: '#000000',
        background: '#ffffff',
        stroke: true,
    },
    filename: values => `agb-cgb-barcode-us-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
        {
            id: 'serial',
            label: 'Serial & Barcode',
            type: 'text',
            maxLength: 11,
            uppercase: true,
            targets: [
                { selector: '.serial' },
                { selector: '.barcode', decorate: value => `*${value}*` }
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
};
export default barcodeUs;
