/* ═══════════════════════════════════════════════════════════════
   TIPOS COMPARTIDOS — SYNQ CORPORATION
   ═══════════════════════════════════════════════════════════════ */

/** Identificador de cada división del ecosistema SynQ.
 *  Se usa también como clase CSS para pintar el chip y el halo:
 *  ver los tokens --div-<id>-chip / --div-<id>-glow. */
export type DivisionId =
  | 'intelligence'
  | 'flow'
  | 'secure'
  | 'systems'
  | 'creative'
  | 'ops';

/** Etiquetas del filtro del ecosistema. 'Todo' muestra las siete. */
export type DivisionTag =
  | 'IA'
  | 'Automatización'
  | 'Software'
  | 'Diseño'
  | 'Infraestructura';

export interface Division {
  id: DivisionId;
  /** Numeración visible en la tarjeta: '01' … '07'. */
  num: string;
  /** Nombre sin el prefijo: 'Intelligence' (la tarjeta antepone "SynQ"). */
  name: string;
  /** Descripción de una línea. */
  short: string;
  /** Frase de cierre al pie de la tarjeta: 'Inteligencia que potencia'. */
  kicker: string;
  /** Categorías por las que se puede filtrar. */
  tags: DivisionTag[];
  /** Fondo a sangre de la tarjeta, servido desde /public/ecosistema/. */
  image: string;
}

export interface Service {
  num: string;
  title: string;
  /** Segunda linea del titulo. Solo la usa "Software a la medida". */
  subtitle?: string;
  body: string;
  /** Fondo a sangre de la tarjeta, servido desde /public/servicios/. */
  image: string;
  accent: AccentColor;
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
  /** Clase de Font Awesome del icono del paso. */
  icon: string;
  accent: AccentColor;
  /** Ilustracion de la tarjeta, servida desde /public. Formato 16:9. */
  image: string;
}

export interface Metric {
  value: string;
  label: string;
  icon: string;
  accent: AccentColor;
}

export interface Integration {
  name: string;
  icon: string;
  accent: AccentColor;
}

/**
 * Colores de acento de las secciones.
 *
 * Aparte de ColorVariant a proposito: aquel lo consume TeamCard, que
 * solo tiene clases para sus seis colores. Este suma 'green', que usan
 * Servicios e Integraciones.
 */
export type AccentColor =
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'teal'
  | 'orange'
  | 'green';

export interface CompanyValue {
  title: string;
  body: string;
  /** Clase de Font Awesome del icono del valor. */
  icon: string;
  accent: AccentColor;
}

export interface TeamSocial {
  icon: string;   // clase Font Awesome, ej: 'fa-brands fa-linkedin-in'
  label: string;  // texto accesible, ej: 'LinkedIn'
  href: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  description: string;
  image: string;
  initials: string;
  color: ColorVariant;
  socials: TeamSocial[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export type ColorVariant = 'cyan' | 'blue' | 'purple' | 'magenta' | 'teal' | 'orange';
