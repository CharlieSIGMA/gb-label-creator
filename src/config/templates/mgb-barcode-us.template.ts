import type { TemplateDefinition } from '../types';

const mgbBarcodeUs: TemplateDefinition = {
    id: 'mgb-barcode-us',
    label: 'MGB Barcode (US)',
    svgPath: 'templates/MGB_barcode_us.svg',
    defaults: {
        serial: 'MG123456789',
        foreground: '#000000',
        background: '#ffffff',
        stroke: true,
    },
    filename: values => `mgb-barcode-us-${String(values.serial ?? '').toUpperCase()}.svg`,
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
export default mgbBarcodeUs;
