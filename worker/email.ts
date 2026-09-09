/**
 * Plantilla del correo de contacto.
 *
 * Los clientes de correo (sobre todo Outlook) ignoran flexbox, grid,
 * variables CSS y hojas externas. Por eso todo va con tablas anidadas y
 * estilos en línea, con colores sólidos como respaldo de los degradados.
 *
 * El cuerpo se mantiene claro aunque la marca sea oscura: un correo con
 * fondo negro se ve roto en los clientes que fuerzan tema claro. La
 * identidad SynQ entra por el encabezado con el degradado de marca.
 *
 * Tampoco lleva imágenes: casi todos los clientes las bloquean por
 * defecto, así que un logo en <img> se vería como un hueco roto la
 * primera vez. El nombre va en texto y el color lo pone el degradado.
 */

/* Con la extension .ts explicita a proposito: asi el modulo se resuelve
   igual con el bundler de wrangler que con `node`, que es como lo carga
   la vista previa (npm run email:preview). Sin ella Node no lo encuentra. */
import { BRAND, EMAIL, LOCATION, WHATSAPP_PLAIN_URL } from '../src/data/site.ts';

// Azul de marca. Se usa para enlaces y botones porque el cyan (#22d3ee)
// no tiene contraste suficiente sobre blanco.
const ACCENT = '#3b6bff';
const ACCENT_DARK = '#2451d8';
const ACCENT_SOFT = '#eef2ff';
const HEADER_BG = '#0b1020';
const TEXT = '#16263f';
const MUTED = '#51607a';
const FAINT = '#8794a8';
const BORDER = '#e2e8ec';
const BG = '#eef1f7';
const PANEL = '#f6f8fc';

/** El negocio opera en Guatemala: el sello va en su hora, no en UTC. */
const TIMEZONE = 'America/Guatemala';

export interface ContactFields {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Fecha legible en hora de Guatemala. Ej: "8 de septiembre de 2026, 15:42". */
function formatReceived(date: Date): string {
  try {
    return new Intl.DateTimeFormat('es-GT', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: TIMEZONE,
    }).format(date);
  } catch {
    // Si el runtime viniera sin datos de zona, mejor una fecha en UTC
    // que romper el envío entero por el sello.
    return date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  }
}

/** Fila de dato: etiqueta pequeña arriba, valor debajo. */
function row(label: string, value: string, opts: { link?: boolean; last?: boolean } = {}): string {
  const safe = escapeHtml(value);
  const vacio = value === 'No indicó';
  const shown = opts.link
    ? `<a href="mailto:${safe}" style="color:${ACCENT_DARK};text-decoration:none;font-weight:700;">${safe}</a>`
    : safe;

  return `
    <tr>
      <td style="padding:13px 0;${opts.last ? '' : `border-bottom:1px solid ${BORDER};`}">
        <p style="margin:0 0 3px;font-size:11px;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
          label
        )}</p>
        <p style="margin:0;font-size:16px;line-height:1.5;color:${
          vacio ? FAINT : TEXT
        };font-family:Arial,Helvetica,sans-serif;font-weight:${
          vacio ? '400' : '500'
        };${vacio ? 'font-style:italic;' : ''}">${shown}</p>
      </td>
    </tr>`;
}

export function buildContactEmail(
  f: ContactFields,
  receivedAt: Date = new Date()
): { html: string; text: string } {
  const recibido = formatReceived(receivedAt);
  const primerNombre = f.name.split(' ')[0];

  // Lo que se lee en la bandeja antes de abrir. El relleno invisible del
  // final evita que el cliente siga tirando del cuerpo para completarlo.
  const preheader = `${f.service} · ${f.company} · ${f.message.slice(0, 80)}`;

  /* mailto con asunto y saludo ya puestos: responder es un clic y escribir.
     La dirección va SIN encodeURIComponent — codificaría la arroba como
     %40 y hay clientes que no la resuelven. La ruta ya validó el formato
     del correo, así que solo hace falta escaparla para el atributo; el
     asunto y el cuerpo sí van codificados porque llevan espacios y saltos. */
  const replyHref =
    `mailto:${escapeHtml(f.email)}` +
    `?subject=${encodeURIComponent('Re: tu consulta a SynQ Corporation')}` +
    `&body=${encodeURIComponent(`Hola ${primerNombre},\n\n`)}`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<!-- Le dice al cliente que el correo ya resuelve sus colores y que no
     invierta la paleta por su cuenta, que es lo que rompe el diseño. -->
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Nuevo contacto SynQ Corporation</title>
<style>
  /* Los estilos en línea mandan; esto solo cubre lo que no se puede
     hacer en línea: consultas de medio para pantallas angostas. */
  @media only screen and (max-width:620px) {
    .sq-pad { padding-left:22px !important; padding-right:22px !important; }
    .sq-name { font-size:24px !important; }
    .sq-btn a { display:block !important; text-align:center !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BG};">

<!-- Resumen que se ve en la bandeja, antes de abrir el correo -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
    preheader
  )}${'&#8203;&nbsp;'.repeat(60)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 22px rgba(11,16,32,.10);">

        <!-- Encabezado. El degradado de marca lo ven los clientes que lo
             soportan; el resto queda con el azul oscuro del bgcolor. -->
        <tr>
          <td bgcolor="${HEADER_BG}" class="sq-pad" style="background-color:${HEADER_BG};background-image:linear-gradient(100deg,#00d3f2 0%,#3b6bff 38%,#c026d3 72%,#ff4f8b 100%);padding:26px 32px;">
            <p style="margin:0;font-size:20px;line-height:1.3;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-.01em;">SynQ <span style="font-weight:300;">Corporation</span></p>
            <p style="margin:6px 0 0;font-size:13px;line-height:1.4;color:#eaf4ff;font-family:Arial,Helvetica,sans-serif;">Nuevo contacto desde el sitio web</p>
          </td>
        </tr>

        <!-- Quién escribe: el servicio arriba como etiqueta, porque es el
             dato que decide quién del equipo toma el mensaje. -->
        <tr>
          <td class="sq-pad" style="padding:28px 32px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
              <tr>
                <td bgcolor="${ACCENT_SOFT}" style="background-color:${ACCENT_SOFT};border-radius:999px;padding:6px 14px;">
                  <span style="font-size:12px;line-height:1.4;font-weight:700;color:${ACCENT_DARK};font-family:Arial,Helvetica,sans-serif;letter-spacing:.02em;">${escapeHtml(
                    f.service
                  )}</span>
                </td>
              </tr>
            </table>

            <p class="sq-name" style="margin:0;font-size:27px;line-height:1.25;font-weight:700;color:${TEXT};font-family:Arial,Helvetica,sans-serif;letter-spacing:-.02em;">${escapeHtml(
    f.name
  )}</p>
            <p style="margin:7px 0 0;font-size:13px;line-height:1.5;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">Recibido el ${escapeHtml(
    recibido
  )}</p>
          </td>
        </tr>

        <!-- Datos -->
        <tr>
          <td class="sq-pad" style="padding:18px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row('Correo', f.email, { link: true })}
              ${row('Empresa', f.company, { last: true })}
            </table>
          </td>
        </tr>

        <!-- Mensaje, resaltado en un bloque aparte -->
        <tr>
          <td class="sq-pad" style="padding:24px 32px 0;">
            <p style="margin:0 0 9px;font-size:11px;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">Mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PANEL};border-left:3px solid ${ACCENT};border-radius:0 10px 10px 0;">
              <tr>
                <td style="padding:17px 19px;font-size:15px;line-height:1.7;color:${TEXT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
                  f.message
                ).replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Botón de responder. Se arma con tabla para que Outlook lo respete. -->
        <tr>
          <td class="sq-pad" style="padding:26px 32px 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="sq-btn">
              <tr>
                <td bgcolor="${ACCENT}" style="background-color:${ACCENT};border-radius:999px;">
                  <a href="${replyHref.replace(
                    /&/g,
                    '&amp;'
                  )}" style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Responder a ${escapeHtml(
    primerNombre
  )}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td class="sq-pad" style="padding:18px 32px;border-top:1px solid ${BORDER};background-color:#fafbfe;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
              Enviado desde el formulario de contacto de SynQ Corporation. Podés responder directamente a este correo: la respuesta le llega a ${escapeHtml(
                f.name
              )}.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  // Versión en texto plano: mejora la entrega y sirve en clientes que
  // bloquean HTML.
  const text = [
    'NUEVO CONTACTO DESDE EL SITIO WEB DE SYNQ CORPORATION',
    '',
    `Recibido: ${recibido}`,
    '',
    `Nombre:   ${f.name}`,
    `Correo:   ${f.email}`,
    `Empresa:  ${f.company}`,
    `Servicio: ${f.service}`,
    '',
    'Mensaje:',
    f.message,
    '',
    '---',
    'Respondé directamente a este correo para contestarle.',
  ].join('\n');

  return { html, text };
}

/* ═══════════════════════════════════════════════════════════════
   RESPUESTA AUTOMÁTICA AL VISITANTE
   ───────────────────────────────────────────────────────────────
   Este sí llega a la bandeja de un desconocido, así que es más
   conservador que el aviso interno: un solo mensaje claro, nada de
   jerga, y una vía alterna por si tiene prisa.

   OJO: para que salga hace falta un dominio verificado en Resend.
   Con el remitente de prueba `onboarding@resend.dev` este envío
   falla siempre, porque Resend solo entrega al dueño de la cuenta.
   ═══════════════════════════════════════════════════════════════ */

/** Paso del bloque "qué sigue": círculo numerado y texto al lado. */
function step(num: string, title: string, body: string, last = false): string {
  const gap = last ? '0' : '16px';
  return `
    <tr>
      <td width="34" valign="top" style="padding:0 12px ${gap} 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="26" height="26" align="center" valign="middle" bgcolor="${ACCENT_SOFT}" style="background-color:${ACCENT_SOFT};border-radius:999px;font-size:12px;font-weight:700;color:${ACCENT_DARK};font-family:Arial,Helvetica,sans-serif;line-height:26px;">${num}</td>
          </tr>
        </table>
      </td>
      <td valign="top" style="padding:0 0 ${gap};">
        <p style="margin:0 0 2px;font-size:15px;line-height:1.45;font-weight:700;color:${TEXT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
          title
        )}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
          body
        )}</p>
      </td>
    </tr>`;
}

export function buildAutoReplyEmail(
  f: ContactFields,
  receivedAt: Date = new Date()
): { subject: string; html: string; text: string } {
  const primerNombre = f.name.split(' ')[0];
  const recibido = formatReceived(receivedAt);
  const subject = 'Hemos recibido su mensaje — SynQ Corporation';
  const preheader = `Gracias por comunicarse con SynQ Corporation, ${primerNombre}. Le responderemos a la brevedad.`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
<style>
  @media only screen and (max-width:620px) {
    .sq-pad { padding-left:22px !important; padding-right:22px !important; }
    .sq-h1 { font-size:24px !important; }
    .sq-btn a { display:block !important; text-align:center !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BG};">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
    preheader
  )}${'&#8203;&nbsp;'.repeat(60)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 22px rgba(11,16,32,.10);">

        <tr>
          <td bgcolor="${HEADER_BG}" class="sq-pad" align="center" style="background-color:${HEADER_BG};background-image:linear-gradient(100deg,#00d3f2 0%,#3b6bff 38%,#c026d3 72%,#ff4f8b 100%);padding:30px 32px;">
            <p style="margin:0;font-size:21px;line-height:1.3;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-.01em;">SynQ <span style="font-weight:300;">Corporation</span></p>
            <p style="margin:6px 0 0;font-size:13px;line-height:1.4;color:#eaf4ff;font-family:Arial,Helvetica,sans-serif;letter-spacing:.02em;">${escapeHtml(
              BRAND.tagline
            )}</p>
          </td>
        </tr>

        <tr>
          <td class="sq-pad" align="center" style="padding:34px 32px 0;">
            <h1 class="sq-h1" style="margin:0;font-size:28px;line-height:1.25;font-weight:700;color:${TEXT};font-family:Arial,Helvetica,sans-serif;letter-spacing:-.02em;">Hemos recibido su mensaje</h1>
            <p style="margin:14px 0 0;font-size:16px;line-height:1.65;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
              Gracias por comunicarse con nosotros, <strong style="color:${TEXT};">${escapeHtml(
    primerNombre
  )}</strong>. Su consulta sobre <strong style="color:${TEXT};">${escapeHtml(
    f.service
  )}</strong> ya fue registrada, y un integrante de nuestro equipo se pondrá en contacto con usted a la brevedad.
            </p>
          </td>
        </tr>

        <tr>
          <td class="sq-pad" style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PANEL};border-radius:12px;">
              <tr>
                <td style="padding:22px 24px;">
                  <p style="margin:0 0 16px;font-size:11px;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">Qué sigue</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${step('1', 'Revisamos su mensaje', 'Lo analiza un integrante del equipo, no un sistema automatizado.')}
                    ${step('2', 'Nos comunicamos con usted', 'Por este mismo correo o por WhatsApp, según su preferencia.')}
                    ${step(
                      '3',
                      'Conversamos sin compromiso',
                      'Le indicamos con claridad si podemos ayudarle y de qué manera.',
                      true
                    )}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Copia de lo que envió: le queda como comprobante. -->
        <tr>
          <td class="sq-pad" style="padding:26px 32px 0;">
            <p style="margin:0 0 9px;font-size:11px;line-height:1.4;letter-spacing:.09em;text-transform:uppercase;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">Detalle de su mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;">
              <tr>
                <td style="padding:16px 18px;font-size:14px;line-height:1.7;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
    f.message
  ).replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            <p style="margin:9px 0 0;font-size:12px;line-height:1.5;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">Enviado el ${escapeHtml(
    recibido
  )}</p>
          </td>
        </tr>

        <!-- Vía alterna, por si tiene prisa. -->
        <tr>
          <td class="sq-pad" align="center" style="padding:28px 32px 8px;">
            <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">Si su consulta requiere atención inmediata, puede escribirnos por WhatsApp.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="sq-btn" align="center">
              <tr>
                <td bgcolor="#25D366" style="background-color:#25D366;border-radius:999px;">
                  <a href="${WHATSAPP_PLAIN_URL}" style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Escribir por WhatsApp</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="sq-pad" align="center" style="padding:26px 32px 18px;">
            <p style="margin:0;font-size:13px;line-height:1.6;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">
              También puede responder a este correo: su respuesta llegará directamente a nuestro equipo.
            </p>
          </td>
        </tr>

        <tr>
          <td class="sq-pad" align="center" style="padding:18px 32px;border-top:1px solid ${BORDER};background-color:#fafbfe;">
            <p style="margin:0 0 4px;font-size:13px;line-height:1.5;font-weight:700;color:${TEXT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
              BRAND.fullName
            )}</p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
              ${escapeHtml(
                LOCATION
              )} · <a href="mailto:${EMAIL}" style="color:${ACCENT_DARK};text-decoration:none;">${escapeHtml(
    EMAIL
  )}</a>
            </p>
            <p style="margin:10px 0 0;font-size:11px;line-height:1.5;color:${FAINT};font-family:Arial,Helvetica,sans-serif;">
              Este es un mensaje automático, generado por el envío del formulario de contacto de nuestro sitio.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    'HEMOS RECIBIDO SU MENSAJE — SYNQ CORPORATION',
    '',
    `Gracias por comunicarse con nosotros, ${primerNombre}.`,
    '',
    `Su consulta sobre ${f.service} ya fue registrada. Un integrante de`,
    'nuestro equipo se pondrá en contacto con usted a la brevedad.',
    '',
    'QUÉ SIGUE',
    '1. Revisamos su mensaje: lo analiza un integrante del equipo.',
    '2. Nos comunicamos con usted por correo o WhatsApp, según su preferencia.',
    '3. Conversamos sin compromiso y le indicamos si podemos ayudarle.',
    '',
    'DETALLE DE SU MENSAJE',
    f.message,
    '',
    `Enviado el ${recibido}`,
    '',
    `Si requiere atención inmediata, puede escribirnos por WhatsApp:`,
    WHATSAPP_PLAIN_URL,
    'También puede responder a este correo: llegará directamente a nuestro equipo.',
    '',
    '---',
    `${BRAND.fullName} · ${LOCATION} · ${EMAIL}`,
    'Este es un mensaje automático, generado por el envío del formulario',
    'de contacto de nuestro sitio.',
  ].join('\n');

  return { subject, html, text };
}
