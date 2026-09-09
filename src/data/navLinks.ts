import type { NavLink } from '../types';

/**
 * Enlaces del navbar.
 *
 * "Soluciones" apunta a la sección del ecosistema (#ecosistema): es
 * como se llama de cara al visitante, aunque internamente el ancla
 * conserve el nombre técnico.
 *
 * Servicios no está en el menú a propósito: va inmediatamente
 * después de Soluciones, así que se encuentra bajando, y además
 * está enlazado desde el pie.
 *
 * El orden sigue al de la página: Nosotros y Equipo son secciones
 * distintas (#nosotros y #equipo) y van seguidas, antes de Contacto.
 */
export const navLinks: NavLink[] = [
  { id: 'soluciones',    label: 'Soluciones',    href: '#ecosistema' },
  { id: 'proceso',       label: 'Cómo funciona', href: '#proceso' },
  { id: 'integraciones', label: 'Integraciones', href: '#integraciones' },
  { id: 'nosotros',      label: 'Nosotros',      href: '#nosotros' },
  { id: 'equipo',        label: 'Equipo',        href: '#equipo' },
  { id: 'contacto',      label: 'Contacto',      href: '#contacto' },
];
