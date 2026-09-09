import { Hono } from 'hono';
import { buildAutoReplyEmail, buildContactEmail } from '../email';
import { rateLimit } from '../rateLimit';
import type { Env } from '../types';

/** Destino de los mensajes del formulario de contacto. */
const TO_EMAIL = 'synqcorporation@gmail.com';

/**
 * Remitente de reserva.
 *
 * `onboarding@resend.dev` no exige verificar dominio, pero SOLO entrega al
 * correo con el que se registró la cuenta de Resend. Hoy esa cuenta es
 * demcycode@gmail.com, así que con este remitente todo envío a
 * synqcorporation@gmail.com o a un visitante se rechaza con 403.
 *
 * Sirve para que el Worker arranque sin configuración, no para producción.
 */
const FROM_FALLBACK = 'SynQ Corporation <onboarding@resend.dev>';

/**
 * Remitente real, desde la variable CONTACT_FROM de wrangler.jsonc.
 *
 * Se configura ahí y no en el código para que verificar el dominio en
 * Resend no obligue a tocar esta ruta: basta cambiar una línea de
 * configuración. Formato esperado:
 *
 *   "SynQ Corporation <hola@tudominio.com>"
 *
 * El dominio de esa dirección tiene que estar verificado en
 * resend.com/domains, o Resend responde 403.
 */
function remitente(env: Env): string {
  const configurado = env.CONTACT_FROM?.trim();
  if (configurado) return configurado;

  console.warn(
    'CONTACT_FROM sin configurar: se usa el remitente de prueba de Resend, ' +
      'que solo entrega al dueño de la cuenta. Verificá un dominio en ' +
      'resend.com/domains y poné CONTACT_FROM en wrangler.jsonc.'
  );
  return FROM_FALLBACK;
}

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const MAX_FIELD = 2000;

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

  const datos = { name, email, company, service, message };
  const recibido = new Date();

  const from = remitente(c.env);

  const enviar = (payload: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

  // 1. Aviso al equipo. Este sí decide el resultado de la petición: si no
  //    llega, el mensaje se perdió y hay que decírselo al visitante.
  const { html, text } = buildContactEmail(datos, recibido);

  try {
    const res = await enviar({
      from,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Nuevo contacto SynQ — ${name}`,
      html,
      text,
    });

    if (!res.ok) {
      console.error('Resend respondió', res.status, await res.text());
      return c.json({ error: 'No se pudo enviar el mensaje.' }, 502);
    }
  } catch (err) {
    console.error('Error enviando correo', err);
    return c.json({ error: 'No se pudo enviar el mensaje.' }, 502);
  }

  /* 2. Acuse de recibo al visitante. Va DESPUÉS y su fallo no cambia la
        respuesta: el mensaje ya llegó al equipo, que es lo que importa.
        Ahora mismo este envío falla siempre con el remitente de prueba
        (ver la nota de FROM_EMAIL): Resend solo entrega a la cuenta
        dueña, y este correo va a un desconocido. Queda registrado en el
        log y el formulario sigue respondiendo éxito. */
  try {
    const auto = buildAutoReplyEmail(datos, recibido);
    const res = await enviar({
      from,
      to: [email],
      reply_to: TO_EMAIL,
      subject: auto.subject,
      html: auto.html,
      text: auto.text,
    });

    if (!res.ok) {
      console.error('Acuse automático no enviado:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Error enviando el acuse automático', err);
  }

  return c.json({ success: true });
});
