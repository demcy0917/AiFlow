import type { CompanyValue, Integration, Metric, ProcessStep } from '../types';

/* ═══════════════════════════════════════════════════════════════
   CONTENIDO DE SECCIONES: PROCESO, MÉTRICAS, INTEGRACIONES, VALORES
   ═══════════════════════════════════════════════════════════════ */

/** Los cuatro pasos. El acento avanza por el degradado de marca:
 *  cyan → violeta → magenta → naranja, y ese mismo orden pinta los
 *  circulos de la linea de tiempo y los iconos de las cifras. */
export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Diagnóstico',
    body: 'Mapeamos el proceso actual, sus tiempos y dónde se pierde esfuerzo.',
    icon: 'fa-solid fa-magnifying-glass',
    accent: 'cyan',
    image: '/proceso/synq-diagnostico.webp',
  },
  {
    num: '02',
    title: 'Diseño de la solución',
    body: 'Definimos alcance, integraciones y criterios de éxito antes de escribir código.',
    icon: 'fa-solid fa-lightbulb',
    accent: 'purple',
    image: '/proceso/synq-diseno-solucion.webp',
  },
  {
    num: '03',
    title: 'Construcción y pruebas',
    body: 'Entregas cortas y revisables, con tu equipo validando cada avance.',
    icon: 'fa-solid fa-code',
    accent: 'magenta',
    image: '/proceso/synq-construccion-pruebas.webp',
  },
  {
    num: '04',
    title: 'Puesta en marcha y soporte',
    body: 'Capacitación, documentación y monitoreo continuo del resultado.',
    icon: 'fa-solid fa-chart-simple',
    accent: 'orange',
    image: '/proceso/synq-puesta-marcha-soporte.webp',
  },
];

/* Estas cuatro cifras son afirmaciones sobre el negocio: vienen del
   mockup de marca. Revisalas antes de publicar si alguna cambia. */
export const metrics: Metric[] = [
  {
    value: '6',
    label: 'Áreas de especialidad en un mismo equipo',
    icon: 'fa-solid fa-users',
    accent: 'cyan',
  },
  {
    value: '24/7',
    label: 'Atención automatizada para tus clientes',
    icon: 'fa-solid fa-comment-dots',
    accent: 'purple',
  },
  {
    value: '4 sem',
    label: 'Tiempo típico de la primera entrega funcional',
    icon: 'fa-solid fa-bolt',
    accent: 'magenta',
  },
  {
    value: '100%',
    label: 'Proyectos con documentación y capacitación',
    icon: 'fa-solid fa-chart-simple',
    accent: 'orange',
  },
];

/* Font Awesome no trae marca libre para OpenAI, Notion, n8n ni Google
   Workspace, así que esos van con un icono genérico que evoca la
   herramienta (destello, hoja, nodos, cuadrícula). */
export const integrations: Integration[] = [
  { name: 'WhatsApp Business API', icon: 'fa-brands fa-whatsapp',      accent: 'green' },
  { name: 'OpenAI',                icon: 'fa-solid fa-wand-magic-sparkles', accent: 'teal' },
  { name: 'Google Workspace',      icon: 'fa-solid fa-table-cells-large',   accent: 'blue' },
  { name: 'Meta',                  icon: 'fa-brands fa-meta',          accent: 'magenta' },
  { name: 'HubSpot',               icon: 'fa-brands fa-hubspot',       accent: 'orange' },
  { name: 'Shopify',               icon: 'fa-brands fa-shopify',       accent: 'green' },
  { name: 'Notion',                icon: 'fa-solid fa-file-lines',     accent: 'cyan' },
  { name: 'n8n',                   icon: 'fa-solid fa-share-nodes',    accent: 'magenta' },
  { name: 'Stripe',                icon: 'fa-brands fa-stripe-s',      accent: 'purple' },
  { name: 'Airtable',              icon: 'fa-brands fa-airtable',      accent: 'orange' },
  { name: 'Slack',                 icon: 'fa-brands fa-slack',         accent: 'cyan' },
  { name: 'APIs propias',          icon: 'fa-solid fa-code',           accent: 'blue' },
];

/** Las tres promesas que acompañan a las integraciones. */
export const integrationPerks = [
  { icon: 'fa-solid fa-bolt',        title: 'Integración rápida',  body: 'Menos tiempo, más valor',   accent: 'cyan' as const },
  { icon: 'fa-solid fa-lock',        title: 'Segura y confiable',  body: 'Tus datos, siempre tuyos',  accent: 'purple' as const },
  { icon: 'fa-solid fa-chart-simple', title: 'A la medida',        body: 'Sin límites',               accent: 'magenta' as const },
];

/* Los dos primeros caen en la columna izquierda de Nosotros y los dos
   ultimos en la derecha, con la escultura en medio. El acento avanza
   por el degradado de marca en ese mismo recorrido. */
export const companyValues: CompanyValue[] = [
  {
    title: 'Tecnología con propósito',
    body: 'Automatizamos lo que libera tiempo, no lo que suena moderno.',
    icon: 'fa-solid fa-bullseye',
    accent: 'cyan',
  },
  {
    title: 'Un solo equipo',
    body: 'Estrategia, desarrollo y diseño en la misma mesa de trabajo.',
    icon: 'fa-solid fa-users',
    accent: 'blue',
  },
  {
    title: 'Transparencia',
    body: 'Alcances, tiempos y costos definidos antes de empezar.',
    icon: 'fa-solid fa-shield-halved',
    accent: 'purple',
  },
  {
    title: 'Continuidad',
    body: 'Acompañamiento después del lanzamiento, no solo en la entrega.',
    icon: 'fa-solid fa-arrows-rotate',
    accent: 'magenta',
  },
];
