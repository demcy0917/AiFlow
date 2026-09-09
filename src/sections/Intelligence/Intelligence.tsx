import { Container } from '../../components/common/Container';
import { ChatPanel } from './ChatPanel';
import { BRAND } from '../../data/site';
import styles from './Intelligence.module.css';

/* ═══════════════════════════════════════════════════════════════
   SYNQ INTELLIGENCE
   ───────────────────────────────────────────────────────────────
   Vitrina de la división. El panel de la derecha reproduce una
   conversación de ejemplo en bucle; el asesor REAL es el widget
   flotante que se abre con el botón de abajo a la derecha.
   ═══════════════════════════════════════════════════════════════ */

const capabilities = [
  {
    icon: 'fa-solid fa-comments',
    title: 'Atiende y califica',
    body: 'Conversa con el visitante, entiende su problema y separa a los curiosos de los prospectos reales.',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'Conoce tu negocio',
    body: 'Responde con el contexto de tu operación: servicios, procesos y forma de trabajar.',
  },
  {
    icon: 'fa-solid fa-arrow-right-arrow-left',
    title: 'Pasa a un humano',
    body: 'Cuando hay interés real, deriva la conversación a WhatsApp con el contexto ya recogido.',
  },
];

export function Intelligence() {
  return (
    <section id="inteligencia" className={styles.section} aria-label="SynQ Intelligence">
      <div className={styles.glow} aria-hidden />

      <Container>
        <div className={styles.head}>
          <span className={styles.chip}>
            <img src={BRAND.isotipo} alt="" className={styles.chipIcon} />
          </span>
          <div className={styles.headText}>
            <p className={styles.kicker}>SynQ Intelligence · 01</p>
            <h2 className={styles.title}>
              Así conversa <span className="gradient-text">un chatbot de SynQ</span>.
            </h2>
          </div>
        </div>

        <div className={styles.layout}>
          {/* Columna de texto */}
          <div className={styles.info}>
            <p className={styles.lead}>
              Atiende, entiende lo que le piden y lleva la conversación hasta agendar.
              Trabaja con el contexto de tu negocio, día y noche, sin que nadie tenga
              que estar pendiente del teléfono.
            </p>

            <ul className={styles.capabilities}>
              {capabilities.map((c) => (
                <li key={c.title} className={styles.capability}>
                  <span className={styles.capabilityIcon}>
                    <i className={c.icon} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className={styles.capabilityTitle}>{c.title}</h3>
                    <p className={styles.capabilityBody}>{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* Fuera de .info a proposito: asi .info ocupa solo la fila 1 de
              la rejilla y el panel del chat puede estirarse justo hasta el
              borde inferior de la ultima tarjeta. Visualmente la nota queda
              donde estaba, porque cae en la fila 2 de la misma columna. */}
          <p className={styles.note}>
            <i className="fa-solid fa-comment-dots" aria-hidden="true" />
            <span>
              ¿Querés probarlo de verdad? Abrí <strong>Asesoría con IA</strong> en el
              botón de abajo a la derecha y preguntale por tu operación.
            </span>
          </p>

          {/* Demo animado de conversación */}
          <div className={styles.chatCol}>
            <ChatPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
