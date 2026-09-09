import { Container } from '../../components/common/Container';
import { integrationPerks, integrations } from '../../data/content';
import styles from './Integrations.module.css';

/* ═══════════════════════════════════════════════════════════════
   INTEGRACIONES
   ───────────────────────────────────────────────────────────────
   Mensaje a la izquierda, herramientas a la derecha. Los chips van
   con flex-wrap: sus anchos son distintos, así que las filas salen
   irregulares solas, como en el diseño.
   ═══════════════════════════════════════════════════════════════ */

export function Integrations() {
  return (
    <section id="integraciones" className={styles.section} aria-label="Integraciones">
      <div className={styles.glow} aria-hidden />

      <Container>
        <div className={styles.layout}>
          {/* ── Columna del mensaje ── */}
          <div className={styles.info}>
            <p className={styles.kicker}>
              <span className={styles.kickerLine} aria-hidden />
              Integraciones
            </p>

            <h2 className={styles.title}>Se conecta con lo que ya usas</h2>

            <p className={styles.subtitle}>
              Si tiene API, lo integramos. Si no, construimos el puente.
            </p>

            <ul className={styles.perks}>
              {integrationPerks.map((p) => (
                <li key={p.title} className={`${styles.perk} ${styles[p.accent]}`}>
                  <i className={`${p.icon} ${styles.perkIcon}`} aria-hidden="true" />
                  <div className={styles.perkText}>
                    <h3 className={styles.perkTitle}>{p.title}</h3>
                    <p className={styles.perkBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna de herramientas ── */}
          <ul className={styles.chips} aria-label="Herramientas que integramos">
            {integrations.map((i) => (
              <li key={i.name} className={`${styles.chip} ${styles[i.accent]}`}>
                <span className={styles.chipIcon}>
                  <i className={i.icon} aria-hidden="true" />
                </span>
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
