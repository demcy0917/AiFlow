import type { TeamMember } from '../types';

/* ───────────────────────────────────────────────────────────────
   EQUIPO DE SYNQ CORPORATION
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
      '',
    image: '/team/david-melgar.jpeg',
    initials: 'DM',
    color: 'cyan',
    socials: [
      { icon: 'fa-brands fa-github', label: 'GitHub', href: 'https://github.com/demcy0917' },
      { icon: 'fa-solid fa-globe', label: 'Portafolio', href: 'https://portafolio.davidmelgar28115.workers.dev/' },
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-melgar-833974337/' },
    ],
  },
  {
    id: 'cto',
    name: 'Ing. Jose Pablo Diaz Meyer',
    role: 'Chief Technology Officer (CTO)',
    badge: 'NEURAL ARCHITECT',
    description: '',
    image: '/team/pablo-diaz.jpeg',
    initials: 'PD',
    color: 'purple',
    socials: [
      { icon: 'fa-brands fa-github', label: 'GitHub', href: 'https://github.com/Meyersin' },
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/pabsmeyer/' },
    ],
  },

  {
    id: 'cfo',
    name: 'Lic. Josué De la Rosa',
    role: 'Chief Financial Officer (CFO)',
    badge: 'FINANCE & STRATEGY',
    description: '',
    image: '/team/josue-delarosa.jpeg',
    initials: 'JD',
    color: 'teal',
    socials: [
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/josu%C3%A9-de-la-rosa-7510a3242/' },
    ],
  },
  {
    // Su rol es CHRO. El id decía 'cfo' de antes; se renombra para que
    // no choque con el CFO real de arriba: los ids se usan como key de
    // React y repetirlos rompe la lista.
    id: 'chro',
    name: 'Licda. María José Gaitán Ramírez',
    role: 'Chief Human Resources Officer (CHRO)',
    badge: 'PEOPLE & CULTURE',
    description:
      '',
    image: '/team/maria-gaitan.jpeg',
    initials: 'MG',
    color: 'magenta',
    socials: [],
  },
  {
    id: 'ciso',
    name: 'Ing. Carlos Reyna',
    role: 'Chief Information Security Officer (CISO)',
    badge: 'SECURITY & COMPLIANCE',
    description:
      '',
    image: '/team/carlos-reyna.jpeg',
    initials: 'CR',
    color: 'blue',
    socials: [
      {
        icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlos-andr%C3%A9s-reyna-z%C3%BA%C3%B1iga-a65aaa432/',
      }
    ],
  },
  {
    id: 'cm',
    name: 'Lic. Mario Moreira',
    role: 'Community Manager',
    badge: 'BRAND & COMMUNITY',
    description: '',
    image: '/team/mario-moreira.jpeg',
    initials: 'MM',
    color: 'purple',
    socials: [
      {
        icon: 'fa-solid fa-globe',
        label: 'Portafolio',
        href: 'https://neilscz.github.io/Portafolioweb.github.io/',
      },
    ],
  },
];
