import { Button } from '../../components/common/Button';
import { BRAND, WHATSAPP_URL } from '../../data/site';
import styles from './Hero.module.css';

/**
 * Hero de SynQ.
 *
 * Dos columnas: el mensaje a la izquierda y el isotipo a la derecha,
 * flotando dentro de dos anillos concéntricos. En pantallas angostas
 * las columnas se apilan solas (auto-fit) y el isotipo queda debajo.
 */
export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-label="Presentación">
      {/* Halos de color. Decorativos: fuera del árbol de accesibilidad. */}
      <div className={styles.glowTop} aria-hidden />
      <div className={styles.glowRight} aria-hidden />

      <div className={styles.inner}>
        {/* ── Columna del mensaje ── */}
        <div className={styles.content}>
          <p className={styles.kicker}>
            <span>Personas</span>
            <span className={styles.slashBlue} aria-hidden>/</span>
            <span>Ideas</span>
            <span className={styles.slashMagenta} aria-hidden>/</span>
            <span>Tecnología</span>
          </p>

          <h1 className={styles.title}>
            Automatización e inteligencia artificial,{' '}
            <span className="gradient-text">en sincronía con tu negocio</span>.
          </h1>

          <p className={styles.lead}>
            Diseñamos y construimos chatbots con IA, software a la medida, sitios web
            y sistemas que resuelven tareas repetitivas. Un solo equipo, de la
            estrategia a la operación.
          </p>

          <p className={styles.claim}>{BRAND.claimEn}</p>

          <div className={styles.actions}>
            <Button href={WHATSAPP_URL} external size="lg">
              Escríbenos por WhatsApp
            </Button>
            <Button href="#ecosistema" variant="secondary" size="lg">
              Ver soluciones
            </Button>
          </div>
        </div>

        {/* ── Columna del isotipo ── */}
        <div className={styles.art} aria-hidden>
          <div className={styles.artGlow} />
          <div className={styles.ringOuter} />
          <div className={styles.ringInner} />
          {/* Dos capas: la de afuera flota, la de adentro late. Separadas
              porque ambas animan `transform` y se pisarían. */}
          <span className={styles.isotipoFloat}>
            <img src={BRAND.isotipo} alt="" className={styles.isotipo} />
          </span>
        </div>
      </div>
    </section>
  );
}
