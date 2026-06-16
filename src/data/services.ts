import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'automatizaciones',
    icon: '⚡',
    title: 'Automatizaciones',
    description:
      'Elimina tareas repetitivas y optimiza tus flujos de trabajo con automatizaciones inteligentes que conectan todas tus herramientas.',
    color: 'cyan',
    features: ['Flujos sin código', 'Integración multi-plataforma', 'Reportes en tiempo real'],
  },
  {
    id: 'chatbots',
    icon: '🤖',
    title: 'Chatbots con IA',
    description:
      'Asistentes virtuales avanzados que atienden clientes 24/7, califican leads y cierran ventas de forma autónoma.',
    color: 'blue',
    features: ['Procesamiento de lenguaje natural', 'Multicanal (Web, WhatsApp, IG)', 'Aprendizaje continuo'],
  },
  {
    id: 'sistemas',
    icon: '🏗️',
    title: 'Sistemas Empresariales',
    description:
      'Desarrollamos CRMs, ERPs y plataformas internas adaptadas exactamente a los procesos únicos de tu empresa.',
    color: 'purple',
    features: ['CRM y ERP a medida', 'Dashboards analíticos', 'Acceso en la nube'],
  },
  {
    id: 'software',
    icon: '💡',
    title: 'Software a la Medida',
    description:
      'Aplicaciones web y móviles diseñadas desde cero para resolver los desafíos específicos de tu negocio.',
    color: 'magenta',
    features: ['Apps web y móvil', 'Arquitectura escalable', 'Soporte continuo'],
  },
];
