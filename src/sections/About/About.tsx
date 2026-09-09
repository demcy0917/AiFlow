import { Container } from '../../components/common/Container';
import { companyValues } from '../../data/content';
import { BRAND } from '../../data/site';
import styles from './About.module.css';

/* ═══════════════════════════════════════════════════════════════
   NOSOTROS
   ───────────────────────────────────────────────────────────────
   Encabezado centrado y los cuatro valores repartidos a los lados
   de la escultura: dos a la izquierda y dos a la derecha.

   Van en dos listas y no en una porque cada una ocupa una columna
   distinta de la rejilla, y un solo <ul> no puede partirse entre
   dos columnas separadas por la figura.
   ═══════════════════════════════════════════════════════════════ */

const izquierda = companyValues.slice(0, 2);
const derecha = companyValues.slice(2);

function Value({ value }: { value: (typeof companyValues)[number] }) {
  return (
    <li className={`${styles.value} ${styles[value.accent]}`}>
      <span className={styles.valueIcon}>
        <i className={value.icon} aria-hidden="true" />
      </span>
      <h3 className={styles.valueTitle}>{value.title}</h3>
      <p className={styles.valueBody}>{value.body}</p>
    </li>
  );
}

export function About() {
  return (
    <section id="nosotros" className={styles.section} aria-label="Sobre SynQ Corporation">
      <Container>
        <div className={styles.head}>
          <p className={styles.kicker}>Nosotros</p>
          <h2 className={styles.title}>
            Diferentes mentes,
            <br />
            <span className="gradient-text">una misma dirección</span>
          </h2>
          <p className={styles.subtitle}>
            Inteligencia artificial, software y diseño digital en un mismo equipo.
            Automatizamos procesos para operar con información confiable.
          </p>
        </div>

        <div className={styles.layout}>
          <ul className={`${styles.col} ${styles.colLeft}`}>
            {izquierda.map((v) => (
              <Value key={v.title} value={v} />
            ))}
          </ul>

          {/* Decorativa: no aporta información que no esté en el texto. */}
          <figure className={styles.figure} aria-hidden="true">
            <img
              className={styles.figureImg}
              src="/nosotros/synq-escultura.webp"
              alt=""
              width={760}
              height={780}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <ul className={`${styles.col} ${styles.colRight}`}>
            {derecha.map((v) => (
              <Value key={v.title} value={v} />
            ))}
          </ul>
        </div>

        <div className={styles.foot}>
          <p className={styles.footTitle}>{BRAND.tagline}</p>
          <p className={styles.footBody}>
            Personas, ideas y tecnología trabajando al mismo ritmo.
          </p>
        </div>
      </Container>
    </section>
  );
}
