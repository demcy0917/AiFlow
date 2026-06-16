import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';
import { ChatPanel } from './ChatPanel';
import { DashPanel } from './DashPanel';
import styles from './Hero.module.css';

const highlights = [
  { icon: '✦', text: 'Soluciones a la medida' },
  { icon: '✦', text: 'Resultados medibles' },
  { icon: '✦', text: 'Tecnología que escala' },
];

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-label="Sección principal">
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.bgGlow1} aria-hidden />
      <div className={styles.bgGlow2} aria-hidden />

      <Container size="wide">
        <div className={styles.layout}>

          {/* ── Copy ── */}
          <div className={styles.copy}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden />
              Inteligencia Artificial Empresarial
            </div>

            <h1 className={styles.heading}>
              Automatiza tu negocio con{' '}
              <span className={styles.gradientWord}>inteligencia</span>{' '}
              y tecnología
            </h1>

            <p className={styles.subtitle}>
              Diseñamos chatbots, automatizaciones, sistemas y software a la medida
              para empresas que quieren crecer sin límites.
            </p>

            <div className={styles.actions}>
              <Button href="#contacto" size="lg">Agenda una demo</Button>
              <Button href="#servicios" size="lg" variant="secondary">Ver servicios</Button>
            </div>

            <ul className={styles.highlights} aria-label="Beneficios clave">
              {highlights.map((h) => (
                <li key={h.text} className={styles.highlightItem}>
                  <span className={styles.highlightIcon} aria-hidden>{h.icon}</span>
                  {h.text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Panels ── */}
          <div className={styles.panels} aria-hidden="true">
            <ChatPanel />
            <DashPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
