/**
 * Previsualiza los correos del formulario SIN enviarlos y SIN desplegar.
 *
 *   npm run email:preview
 *
 * Genera los dos:
 *   .preview/aviso-equipo.html      lo que le llega a SynQ
 *   .preview/acuse-visitante.html   el automático para quien escribió
 *
 * Node 22+ quita los tipos de email.ts al vuelo, así que lo que se ve
 * aquí es exactamente lo que manda el Worker, no una copia aparte.
 *
 * A propósito NO se escribe nada dentro de public/: aunque .gitignore lo
 * excluyera, `vite build` copia esa carpeta entera a dist y la vista
 * previa terminaría publicada en el sitio.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// pathToFileURL y no la ruta pelada: en Windows un import dinámico con
// "C:\..." falla porque Node lee "c:" como esquema de URL.
const { buildContactEmail, buildAutoReplyEmail } = await import(
  pathToFileURL(path.join(raiz, 'worker', 'email.ts')).href
);

/* Caso de ejemplo. Trae acentos, un mensaje de varias líneas y nombre
   compuesto para ver cómo sale el saludo por el primer nombre. */
const ejemplo = {
  name: 'María José Hernández',
  email: 'mjhernandez@distribuidoraelroble.com',
  company: 'Distribuidora El Roble',
  service: 'Chatbots con IA',
  message:
    'Buenas tardes,\n\nTenemos tres personas respondiendo WhatsApp todo el día y aun así se nos quedan mensajes sin contestar los fines de semana.\n\nQuisiéramos ver si se puede automatizar la primera respuesta y el agendado de visitas. Somos distribuidora de materiales de construcción, unos 40 pedidos diarios.\n\nQuedo atenta.',
};

// Fecha fija: así dos corridas seguidas generan el mismo HTML y se puede
// comparar si un cambio alteró algo que no tocaba.
const fecha = process.env.EMAIL_PREVIEW_NOW
  ? new Date(process.env.EMAIL_PREVIEW_NOW)
  : new Date();

const interno = buildContactEmail(ejemplo, fecha);
const acuse = buildAutoReplyEmail(ejemplo, fecha);

const salida = path.join(raiz, '.preview');
fs.mkdirSync(salida, { recursive: true });

const escribir = (nombre, { html, text }) => {
  fs.writeFileSync(path.join(salida, `${nombre}.html`), html, 'utf8');
  fs.writeFileSync(path.join(salida, `${nombre}.txt`), text, 'utf8');
  return path.join(salida, `${nombre}.html`);
};

const rutaInterno = escribir('aviso-equipo', interno);
const rutaAcuse = escribir('acuse-visitante', acuse);

const kb = (s) => `${Math.round(s.length / 1024)} KB`;

console.log('AVISO AL EQUIPO     ', kb(interno.html));
console.log('  ', pathToFileURL(rutaInterno).href);
console.log('ACUSE AL VISITANTE  ', kb(acuse.html), `· asunto: "${acuse.subject}"`);
console.log('  ', pathToFileURL(rutaAcuse).href);
console.log('\n--- acuse al visitante, en texto plano ---\n');
console.log(acuse.text);
