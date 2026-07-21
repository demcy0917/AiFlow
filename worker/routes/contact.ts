import { Hono } from 'hono';
import { rateLimit } from '../rateLimit';
import type { Env } from '../types';

/** Destino de los mensajes del formulario de contacto. */
const TO_EMAIL = 'demcycode@gmail.com';

/**
 * Remitente. `onboarding@resend.dev` funciona sin verificar dominio, pero solo
 * entrega al correo con el que se registró la cuenta de Resend. Cuando el
 * dominio propio esté verificado, cambiar a algo como `web@demcy.ia`.
 */
const FROM_EMAIL = 'demcy.ia <onboarding@resend.dev>';

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const MAX_FIELD = 2000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const contactRoute = new Hono<{ Bindings: Env }>();

contactRoute.use(
  '*',
  rateLimit(
    (env) => env.CONTACT_LIMITER,
    'Ya enviaste varios mensajes. Esperá un minuto antes de intentar de nuevo.'
  )
);

contactRoute.post('/', async (c) => {
  if (!c.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY no está configurada');
    return c.json({ error: 'El formulario no está disponible en este momento.' }, 503);
  }

  let body: Partial<ContactPayload>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Petición inválida.' }, 400);
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();

  if (!name || !email) {
    return c.json({ error: 'Nombre y correo son obligatorios.' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'El correo no parece válido.' }, 400);
  }

  const fields = [name, email, body.company ?? '', body.service ?? '', body.message ?? ''];
  if (fields.some((f) => f.length > MAX_FIELD)) {
    return c.json({ error: 'El mensaje es demasiado largo.' }, 400);
  }

  const company = (body.company ?? '').trim() || 'No indicó';
  const service = (body.service ?? '').trim() || 'No indicó';
  const message = (body.message ?? '').trim() || 'Sin mensaje';

  const html = `
    <h2>Nuevo contacto desde la web de demcy.ia</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
    <p><strong>Servicio de interés:</strong> ${escapeHtml(service)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Nuevo contacto demcy.ia — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Resend respondió', res.status, await res.text());
      return c.json({ error: 'No se pudo enviar el mensaje.' }, 502);
    }

    return c.json({ success: true });
  } catch (err) {
    console.error('Error enviando correo', err);
    return c.json({ error: 'No se pudo enviar el mensaje.' }, 502);
  }
});
