/* ═══════════════════════════════════════════════════════════════
   MARCA Y CONTACTO — SYNQ CORPORATION
   ───────────────────────────────────────────────────────────────
   Único lugar donde viven el correo, el teléfono y las redes.
   Si cambia un dato de contacto, se cambia AQUÍ y se actualiza
   en toda la página (navbar, contacto, pie y el asesor con IA).
   ═══════════════════════════════════════════════════════════════ */

export const BRAND = {
  name: 'SynQ',
  fullName: 'SynQ Corporation',
  tagline: 'Technology in sync',
  claim: 'Personas, ideas y tecnología para un mañana más brillante.',
  claimEn: 'People. Ideas. Technology. A brighter tomorrow.',
  isotipo: '/brand/synq-isotipo.png',
  lettering: '/brand/synq-lettering.png',
} as const;

/** Número de WhatsApp en formato internacional, solo dígitos (502 = Guatemala). */
export const WHATSAPP_NUMBER = '50233514921';

/** El mismo número, formateado para mostrarse en pantalla. */
export const PHONE_DISPLAY = '+502 3351-4921';

export const EMAIL = 'synqcorporation@gmail.com';

/* Ojo: el handle real que nos pasaste es "sinq.corporation" (con i),
   no "synq". Se respeta tal cual porque viene del enlace del perfil.
   Si la cuenta se renombra, cambiar las dos constantes de abajo. */
export const INSTAGRAM_HANDLE = '@sinq.corporation';
export const INSTAGRAM_URL = 'https://www.instagram.com/sinq.corporation';

export const LOCATION = 'Guatemala';

/** Mensaje con el que se abre WhatsApp desde los botones de la página. */
const WHATSAPP_MESSAGE = 'Hola SynQ, quiero automatizar un proceso en mi negocio.';

/** Enlace de WhatsApp con el mensaje ya escrito. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

/** Enlace de WhatsApp sin mensaje, para enlaces de texto sueltos. */
export const WHATSAPP_PLAIN_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const MAILTO_URL = `mailto:${EMAIL}`;
