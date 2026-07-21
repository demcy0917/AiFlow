import type { ReactNode } from 'react';
import styles from './ChatWidget.module.css';

/**
 * Renderiza el texto del modelo con **negritas** y enlaces clicables.
 * Construye nodos de React en vez de HTML para no exponer la burbuja
 * a inyección de marcado.
 */

// La URL no debe terminar en puntuación: el modelo suele cerrar la oración
// justo después del enlace ("...este enlace: https://wa.me/502... ."), y ese
// punto acabaría dentro del href.
const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]*[^\s).,;:!?¡¿])/g;

function renderLine(line: string, keyPrefix: string): ReactNode[] {
  return line.split(TOKEN).filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    if (/^https?:\/\//.test(part)) {
      const isWhatsApp = part.includes('wa.me');
      return (
        <a
          key={key}
          href={part}
          target="_blank"
          rel="noreferrer"
          className={isWhatsApp ? styles.waLink : styles.link}
        >
          {isWhatsApp ? (
            <>
              <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Hablar por WhatsApp
            </>
          ) : (
            part
          )}
        </a>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

export function MessageContent({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <p key={i} className={styles.line}>
          {renderLine(line, String(i))}
        </p>
      ))}
    </>
  );
}
