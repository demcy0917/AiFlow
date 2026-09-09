import type { Service } from '../types';

/* ═══════════════════════════════════════════════════════════════
   SERVICIOS — LO QUE CONSTRUIMOS
   ───────────────────────────────────────────────────────────────
   Cinco tarjetas con fondo a sangre. El orden importa: las dos
   primeras ocupan la fila ancha y las tres restantes la fila de
   abajo, así que mover un elemento cambia la composición.

   Los textos son deliberadamente cortos: van sobre una foto, y ahí
   un párrafo largo compite con la imagen y se vuelve ilegible.
   ═══════════════════════════════════════════════════════════════ */

export const services: Service[] = [
  {
    num: '01',
    title: 'Chatbots con IA',
    body: 'Atiende, califica y responde en WhatsApp y en tu sitio web.',
    image: '/servicios/synq-chatbots.webp',
    accent: 'cyan',
  },
  {
    num: '02',
    title: 'Software a la medida',
    subtitle: 'Con IA integrada',
    body: 'Aplicaciones diseñadas para tu operación, con IA donde aporta valor.',
    image: '/servicios/synq-software.webp',
    accent: 'purple',
  },
  {
    num: '03',
    title: 'Landing pages',
    body: 'Páginas rápidas y claras que convierten visitas en conversaciones.',
    image: '/servicios/synq-landing-pages.webp',
    accent: 'orange',
  },
  {
    num: '04',
    title: 'Catálogos digitales',
    body: 'Tus productos organizados, fáciles de editar y conectados a WhatsApp.',
    image: '/servicios/synq-catalogos.webp',
    accent: 'green',
  },
  {
    num: '05',
    title: 'Sistemas y automatización',
    body: 'Conecta áreas y datos. Automatiza las tareas que consumen a tu equipo.',
    image: '/servicios/synq-automatizacion.webp',
    accent: 'blue',
  },
];
