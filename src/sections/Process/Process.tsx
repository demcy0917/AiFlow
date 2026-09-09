import { Container } from '../../components/common/Container';
import { metrics, processSteps } from '../../data/content';
import styles from './Process.module.css';

/* ═══════════════════════════════════════════════════════════════
   PROCESO + RESULTADOS
   ───────────────────────────────────────────────────────────────
   Las cifras vivían en una sección aparte (Metrics). El rediseño
   las trae aquí: son la consecuencia del proceso, y separarlas en
   dos bandas rompía esa lectura.

   Los cuatro pasos van sobre una línea de tiempo: cada tarjeta
   lleva su círculo numerado por encima del borde superior y la
   línea que los une se dibuja en la lista, no en las tarjetas.
   ═══════════════════════════════════════════════════════════════ */

export function Process() {
  return (
    <section id="proceso" className={styles.section} aria-label="Proceso">
      <Container>
        <div className={styles.head}>
          <p className={styles.kicker}>
            <span className={styles.kickerLine} aria-hidden />
            Proceso
          </p>
          <h2 className={styles.title}>
            Cuatro pasos,
            <br />
            <span className="gradient-text">sin sorpresas</span> en el camino
          </h2>
          <p className={styles.subtitle}>
            Un proceso claro, colaborativo y enfocado en resultados.
          </p>
        </div>

        {/* ── Los cuatro pasos ── */}
        <ol className={styles.steps}>
          {processSteps.map((step) => (
            <li key={step.num} className={`${styles.step} ${styles[step.accent]}`}>
              {/* Sale por encima del borde de la tarjeta y se apoya en la
                  línea de .steps. Es la numeración del paso, no adorno. */}
              <span className={styles.marker}>{step.num}</span>

              <div className={styles.media}>
                {/* alt vacío a propósito: la ilustración repite lo que ya
                    dicen el título y el cuerpo justo debajo, así que para
                    un lector de pantalla sería ruido duplicado. */}
                <img
                  className={styles.mediaImg}
                  src={step.image}
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <span className={styles.stepIcon}>
                <i className={step.icon} aria-hidden="true" />
              </span>

              <span className={styles.stepRule} aria-hidden />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>

        {/* ── Separador ── */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} aria-hidden />
          <span className={styles.dividerText}>Resultados que hablan por sí solos</span>
          <span className={styles.dividerLine} aria-hidden />
        </div>

        {/* ── Las cifras: una sola tarjeta con cuatro columnas ── */}
        <div className={styles.metrics}>
          {metrics.map((m) => (
            <div key={m.label} className={`${styles.metric} ${styles[m.accent]}`}>
              <div className={styles.metricTop}>
                <i className={`${m.icon} ${styles.metricIcon}`} aria-hidden="true" />
                <span className={styles.metricValue}>{m.value}</span>
              </div>
              <p className={styles.metricLabel}>{m.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
