import type { Stat } from '../types';

export const stats: Stat[] = [
  {
    id: 'tiempo',
    value: '+80%',
    label: 'Ahorro de tiempo',
    description: 'Reducción en tareas operativas manuales',
    icon: '⏱️',
    color: 'cyan',
  },
  {
    id: 'ventas',
    value: '+35%',
    label: 'Más ventas',
    description: 'Incremento promedio en conversión de leads',
    icon: '📈',
    color: 'blue',
  },
  {
    id: 'atencion',
    value: '24/7',
    label: 'Atención al cliente',
    description: 'Soporte ininterrumpido con IA conversacional',
    icon: '💬',
    color: 'purple',
  },
  {
    id: 'integracion',
    value: '100%',
    label: 'Integración empresarial',
    description: 'Compatible con tus herramientas actuales',
    icon: '🔗',
    color: 'magenta',
  },
];
