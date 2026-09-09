import type { Division, DivisionTag } from '../types';

/* ═══════════════════════════════════════════════════════════════
   ECOSISTEMA SYNQ — LAS SEIS SOLUCIONES
   ───────────────────────────────────────────────────────────────
   El color de cada división NO se define aquí: vive en
   variables.css como --div-<id>-chip y --div-<id>-glow, y el CSS
   del ecosistema lo aplica usando el `id` como clase. Así el
   navbar, las tarjetas y el pie comparten exactamente el mismo
   color sin repetirlo en tres lugares.
   ═══════════════════════════════════════════════════════════════ */

export const divisions: Division[] = [
  {
    id: 'intelligence',
    num: '01',
    name: 'Intelligence',
    short: 'IA, agentes, LLMs y soluciones inteligentes.',
    kicker: 'Inteligencia que potencia',
    tags: ['IA'],
    image: '/ecosistema/synq-intelligence.webp',
  },
  {
    // Absorbió a la antigua división "Connect": las APIs, integraciones y
    // webhooks son el medio con el que Flow conecta procesos, no una
    // especialidad aparte. Fusionarlas deja seis tarjetas, que llenan la
    // rejilla de tres columnas en dos filas exactas.
    id: 'flow',
    num: '02',
    name: 'Flow',
    short: 'Automatización de procesos, workflows, APIs e integraciones entre sistemas.',
    kicker: 'Todo conectado, en armonía',
    tags: ['Automatización', 'IA', 'Software'],
    image: '/ecosistema/synq-flow.webp',
  },
  {
    id: 'secure',
    num: '03',
    name: 'Secure',
    short: 'Ciberseguridad, redes e infraestructura.',
    kicker: 'Confianza en cada conexión',
    tags: ['Infraestructura'],
    image: '/ecosistema/synq-secure.webp',
  },
  {
    id: 'systems',
    num: '04',
    name: 'Systems',
    short: 'Backend, arquitectura, bases de datos y software.',
    kicker: 'Bases sólidas para el mañana',
    tags: ['Software', 'Infraestructura'],
    image: '/ecosistema/synq-systems.webp',
  },
  {
    id: 'creative',
    num: '05',
    name: 'Creative',
    short: 'Branding, UI/UX, frontend y contenido digital.',
    kicker: 'Ideas que inspiran',
    tags: ['Diseño', 'Software'],
    image: '/ecosistema/synq-creative.webp',
  },
  {
    id: 'ops',
    num: '06',
    name: 'Ops',
    short: 'Operaciones, administración y finanzas.',
    kicker: 'Eficiencia que impulsa',
    tags: ['Automatización'],
    image: '/ecosistema/synq-ops.webp',
  },
];

/** Etiquetas del filtro, en orden. 'Todo' siempre va primero. */
export const divisionFilters: Array<'Todo' | DivisionTag> = [
  'Todo',
  'IA',
  'Automatización',
  'Software',
  'Diseño',
  'Infraestructura',
];
