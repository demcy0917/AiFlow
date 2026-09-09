import { useState } from 'react';
import { Container } from '../../components/common/Container';
import { divisions, divisionFilters } from '../../data/divisions';
import { BRAND } from '../../data/site';
import styles from './Ecosystem.module.css';

/* ═══════════════════════════════════════════════════════════════
   ECOSISTEMA SYNQ — LAS SEIS SOLUCIONES
   ───────────────────────────────────────────────────────────────
   Cada tarjeta lleva su imagen a sangre con un velo oscuro encima
   que garantiza el contraste del texto. El color no se decide
   aquí: la clase lleva el `id` de la división y el CSS resuelve
   chip, borde y acento con los tokens --div-<id>-*.
   ═══════════════════════════════════════════════════════════════ */

type Filtro = (typeof divisionFilters)[number];

export function Ecosystem() {
  const [filtro, setFiltro] = useState<Filtro>('Todo');

  // `some` en vez de `includes(filtro)` para no tener que castear:
  // el filtro también puede valer 'Todo', que no es una etiqueta.
  const visibles = divisions.filter(
    (d) => filtro === 'Todo' || d.tags.some((t) => t === filtro),
  );

  return (
    <section id="ecosistema" className={styles.section} aria-label="Ecosistema SynQ">
      <Container>
        <div className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.kicker}>Ecosistema SynQ / Soluciones</p>
            <h2 className={styles.title}>Seis soluciones, un futuro en sincronía</h2>
          </div>
          <p className={styles.count} aria-live="polite">
            {visibles.length} / {divisions.length} soluciones
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrar soluciones por categoría">
          {divisionFilters.map((f) => {
            const activo = f === filtro;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={activo}
                onClick={() => setFiltro(f)}
                className={`${styles.filter} ${activo ? styles.filterActive : ''}`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className={styles.grid}>
          {visibles.map((d) => (
            <article key={d.id} className={`${styles.card} ${styles[d.id]}`}>
              {/* alt vacío: la imagen es ambiental, el nombre y la
                  descripción de al lado ya dicen de qué trata. */}
              <img src={d.image} alt="" className={styles.bg} loading="lazy" />
              <span className={styles.veil} aria-hidden />

              <div className={styles.content}>
                <div className={styles.top}>
                  <span className={styles.chip}>
                    <img src={BRAND.isotipo} alt="" className={styles.chipIcon} />
                  </span>
                  <span className={styles.num}>{d.num}</span>
                </div>

                <h3 className={styles.name}>
                  SynQ <span className={styles.nameStrong}>{d.name}</span>
                </h3>
                <p className={styles.short}>{d.short}</p>
                <p className={styles.cardKicker}>{d.kicker}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
