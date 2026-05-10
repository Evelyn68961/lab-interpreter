import { coagulation } from './coagulation.js';
import { cbc } from './cbc.js';
import { renal } from './renal.js';
import { electrolytes } from './electrolytes.js';

export const panels = [coagulation, cbc, renal, electrolytes];
export const panelById = Object.fromEntries(panels.map((p) => [p.id, p]));
