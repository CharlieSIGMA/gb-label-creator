// src/config/config.ts
import type { TemplateDefinition } from './types';

import barcodeUs from './templates/barcode-us.template';

// AGB-001
import agb001Jpn from './templates/agb-001-jpn.template';
import agb001Jpn1 from './templates/agb-001-jpn-1.template';
import agb001Eur from './templates/agb-001-eur.template';
import agb001Usa from './templates/agb-001-usa.template';
import agb001Chn from './templates/agb-ique-chn.template';

// AGS-001
import ags001Usa from './templates/ags-usa-ags-001.template';
import ags001Chn from './templates/ags-001-ique-chn.template';

// AGS-101
import ags101Usa from './templates/c-agt-usa-ags-101.template';
import ags101E4Usa from './templates/c-agt-usa-e4-ags-101.template';
import ags101Chn from './templates/ags-101-ique-chn.template';

// Misc
import warning from './templates/warning.template';
import gbaLogo1 from './templates/gba-logo-1.template';
import gbaLogo2 from './templates/gba-logo-2.template';
import gbaLogo3 from './templates/gba-logo-3.template';

export const templates: TemplateDefinition[] = [
  barcodeUs,
  agb001Jpn,
  agb001Jpn1,
  agb001Eur,
  agb001Usa,
  agb001Chn,
  ags001Usa,
  ags101Usa,
  ags101E4Usa,
  ags001Chn,
  ags101Chn,
  warning,
  gbaLogo1,
  gbaLogo2,
  gbaLogo3,
];
