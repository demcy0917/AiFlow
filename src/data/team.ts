import type { TeamMember } from '../types';

/* ───────────────────────────────────────────────────────────────
   EQUIPO DE AIFLOW
   ---------------------------------------------------------------
   Para editar un miembro, cambia los campos de abajo.

   • image     → coloca la foto en la carpeta  public/team/
                 y referénciala aquí como  '/team/nombre.jpg'.
                 Si la foto no existe, se muestran las iniciales.
   • initials  → respaldo visual cuando no hay foto.
   • badge     → texto que aparece sobre la foto.
   • description → texto editable bajo el nombre.
   • socials   → enlaces; cambia el href '#' por el real.
   ─────────────────────────────────────────────────────────────── */

export const team: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Ing. David Emanuel Melgar Cardona',
    role: 'Chief Executive Officer (CEO)',
    badge: 'VISIONARY LEADERSHIP',
    description:
      'Visionario al frente de la estrategia y la innovación, liderando la transformación digital y el crecimiento de Aiflow.',
    image: '/team/david-melgar.jpeg',
    initials: 'DM',
    color: 'cyan',
    socials: [
      { icon: 'fa-brands fa-github', label: 'GitHub', href: 'https://github.com/demcy0917' },
    ],
  },
  {
    id: 'cto',
    name: 'Ing. Jose Pablo Díaz Meyer',
    role: 'Chief Technology Officer (CTO)',
    badge: 'NEURAL ARCHITECT',
    description:
      'Experto en arquitectura de software, IA y escalabilidad de sistemas de alto rendimiento.',
    image: '/team/pablo-diaz.jpeg',
    initials: 'PD',
    color: 'purple',
    socials: [
      { icon: 'fa-brands fa-github', label: 'GitHub', href: 'https://github.com/Meyersin' },
    ],
  },
  {
    id: 'cpo',
    name: 'Ing. Jose Pablo Lima Martinez',
    role: 'Chief Product Officer (CPO)',
    badge: 'PRODUCT STRATEGY',
    description:
      'Lidera la estrategia de producto y la experiencia de usuario, conectando tecnología con las necesidades del cliente.',
    image: '/team/pablo-lima.jpeg',
    initials: 'PL',
    color: 'blue',
    socials: [],
  },
  {
    id: 'cfo',
    name: 'Licda. María José Gaitán Ramírez',
    role: 'Chief Human Resources Officer (CHRO)',
    badge: 'PEOPLE & CULTURE',
    description:
      'Lidera la estrategia de talento y cultura, impulsando el desarrollo y bienestar del equipo.',
    image: '/team/maria-gaitan.jpeg',
    initials: 'MG',
    color: 'magenta',
    socials: [],
  },
];
