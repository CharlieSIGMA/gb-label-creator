// src/config/config.ts
import type { TemplateDefinition } from './types';

const desiredOrder = [
  'barcode-us',
  'agb-001-jpn',
  'c-agb-001-jpn-1',
  'c-agb-001-eur',
  'c-agb-001-usa',
  'gba-001-chn-ique',
  'c-ags-usa-ags-001',
  'c-agt-usa-ags-101',
  'c-agt-usa-e4-ags-101',
  'ags-001-chn-ique',
  'ags-101-chn-ique',
  'warning',
  'gba-logo-1',
  'gba-logo-2',
  'gba-logo-3',
];

const modules = import.meta.glob<{ default: TemplateDefinition }>('./templates/*.template.ts', {
  eager: true,
});

export const templates = Object.values(modules)
  .map(module => module.default)
  .sort((a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id));
