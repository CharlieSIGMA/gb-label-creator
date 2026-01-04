import type { TemplateDefinition } from '../types';

const dmgBarcodeUs: TemplateDefinition = {
    id: 'dmg-barcode-us',
    label: 'DMG Barcode (US)',
    svgPath: 'templates/DMG_barcode_US.svg',
    defaults: {
        serial: 'G123456789',
        foreground: '#000000',
        background: '#ffffff',
        stroke: true,
    },
    filename: values => `dmg-barcode-us-${String(values.serial ?? '').toUpperCase()}.svg`,
    fields: [
        {
            id: 'serial',
            label: 'Serial & Barcode',
            type: 'text',
            maxLength: 10,
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
export default dmgBarcodeUs;
