import { Container } from '../../components/common/Container';
import { services } from '../../data/services';
import { WHATSAPP_URL } from '../../data/site';
import styles from './Services.module.css';

/* ═══════════════════════════════════════════════════════════════
   SERVICIOS — LO QUE CONSTRUIMOS
   ───────────────────────────────────────────────────────────────
   Cinco tarjetas con fondo a sangre en una rejilla asimétrica:
   dos anchas arriba, tres abajo. El color de cada una sale de los
   datos; el CSS lo resuelve con la clase del acento.
   ═══════════════════════════════════════════════════════════════ */

export function Services() {
  return (
    <section id="servicios" className={styles.section} aria-label="Servicios">
      <Container>
        <div className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.kicker}>Servicios</p>
            <h2 className={styles.title}>
              Lo que <span className="gradient-text">construimos</span> para ti
            </h2>
            <p className={styles.subtitle}>
              Cada entrega incluye documentación, capacitación y soporte posterior.
            </p>
          </div>

          <span className={styles.badge}>
            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
            Soluciones con IA
          </span>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <article key={s.num} className={`${styles.card} ${styles[s.accent]}`}>
              {/* alt vacío: la imagen es ambiental, el título y la
                  descripción de al lado ya dicen de qué trata. */}
              <img src={s.image} alt="" className={styles.bg} loading="lazy" />
              <span className={styles.veil} aria-hidden />

              <div className={styles.content}>
                <p className={styles.num}>
                  <span className={styles.dot} aria-hidden />
                  {s.num}
                </p>

                <div className={styles.text}>
                  <h3 className={styles.cardTitle}>
                    {s.title}
                    {s.subtitle && <span className={styles.cardSubtitle}>{s.subtitle}</span>}
                  </h3>

                  <p className={styles.cardBody}>{s.body}</p>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.cta}
                  >
                    Consultar servicio
                    <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                    <span className="sr-only"> sobre {s.title}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
