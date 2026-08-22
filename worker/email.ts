/**
 * Plantilla del correo de contacto.
 *
 * Los clientes de correo (sobre todo Outlook) ignoran flexbox, grid,
 * variables CSS y hojas externas. Por eso todo va con tablas anidadas y
 * estilos en línea, con colores sólidos como respaldo de los degradados.
 */

const TEAL = '#14b8a6';
const TEAL_DARK = '#0d9488';
const TEXT = '#16263f';
const MUTED = '#51607a';
const BORDER = '#e2e8ec';
const BG = '#f1f7f8';

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

/** Fila de dato: etiqueta pequeña arriba, valor debajo. */
function row(label: string, value: string, isLink = false): string {
  const safe = escapeHtml(value);
  const shown = isLink
    ? `<a href="mailto:${safe}" style="color:${TEAL_DARK};text-decoration:none;font-weight:600;">${safe}</a>`
    : safe;

  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${BORDER};">
        <p style="margin:0 0 4px;font-size:11px;line-height:1.4;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
          label
        )}</p>
        <p style="margin:0;font-size:16px;line-height:1.5;color:${TEXT};font-family:Arial,Helvetica,sans-serif;font-weight:500;">${shown}</p>
      </td>
    </tr>`;
}

export function buildContactEmail(f: ContactFields): { html: string; text: string } {
  const preheader = `${f.name} · ${f.service} · ${f.message.slice(0, 90)}`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Nuevo contacto demcy.ia</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};">

<!-- Resumen que se ve en la bandeja, antes de abrir el correo -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
    preheader
  )}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(22,38,63,.08);">

        <!-- Encabezado. El degradado lo ven los clientes que lo soportan;
             el resto queda con el teal sólido del bgcolor. -->
        <tr>
          <td bgcolor="${TEAL}" style="background-color:${TEAL};background-image:linear-gradient(135deg,#2dd4bf 0%,${TEAL} 55%,${TEAL_DARK} 100%);padding:28px 32px;">
            <p style="margin:0;font-size:20px;line-height:1.3;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-.01em;">demcy.ia</p>
            <p style="margin:6px 0 0;font-size:14px;line-height:1.4;color:#e6fffb;font-family:Arial,Helvetica,sans-serif;">Nuevo contacto desde el sitio web</p>
          </td>
        </tr>

        <!-- Nombre destacado -->
        <tr>
          <td style="padding:28px 32px 4px;">
            <p style="margin:0;font-size:22px;line-height:1.3;font-weight:700;color:${TEXT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
    f.name
  )}</p>
          </td>
        </tr>

        <!-- Datos -->
        <tr>
          <td style="padding:8px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row('Correo', f.email, true)}
              ${row('Empresa', f.company)}
              ${row('Servicio de interés', f.service)}
            </table>
          </td>
        </tr>

        <!-- Mensaje, resaltado en un bloque aparte -->
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">Mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};border-left:3px solid ${TEAL};border-radius:0 8px 8px 0;">
              <tr>
                <td style="padding:16px 18px;font-size:15px;line-height:1.65;color:${TEXT};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(
    f.message
  ).replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Botón de responder. Se arma con tabla para que Outlook lo respete. -->
        <tr>
          <td style="padding:28px 32px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${TEAL}" style="background-color:${TEAL};border-radius:999px;">
                  <a href="mailto:${escapeHtml(
                    f.email
                  )}" style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Responder a ${escapeHtml(
    f.name.split(' ')[0]
  )}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td style="padding:18px 32px;border-top:1px solid ${BORDER};background-color:#fafcfc;">
            <p style="margin:0;font-size:12px;line-height:1.5;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
              Enviado desde el formulario de contacto de demcy.ia. Podés responder directamente a este correo: la respuesta le llega a ${escapeHtml(
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
    'NUEVO CONTACTO DESDE EL SITIO WEB DE DEMCY.IA',
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
