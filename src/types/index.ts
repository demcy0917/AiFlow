export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: 'cyan' | 'blue' | 'purple' | 'magenta';
  features: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: 'cyan' | 'blue' | 'purple' | 'magenta';
}

export interface TeamSocial {
  icon: string;   // clase Font Awesome, ej: 'fa-brands fa-linkedin-in'
  label: string;  // texto accesible, ej: 'LinkedIn'
  href: string;   // enlace, ej: 'https://linkedin.com/in/...'
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;        // cargo, ej: 'Chief Executive Officer'
  badge: string;       // etiqueta sobre la foto, ej: 'VISIONARY LEADERSHIP'
  description: string; // descripción editable
  image: string;       // ruta de la foto en /public, ej: '/team/david.jpg'
  initials: string;    // respaldo si la foto no carga, ej: 'DM'
  color: 'cyan' | 'purple' | 'blue' | 'magenta';
  socials: TeamSocial[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export type ColorVariant = 'cyan' | 'blue' | 'purple' | 'magenta';
