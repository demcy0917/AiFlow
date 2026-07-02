import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  return (
    <section id="cta" className={styles.section} aria-label="Llamada a la acción">
      <div className={styles.bgGlow1} aria-hidden />
      <div className={styles.bgGlow2} aria-hidden />

      <Container size="narrow">
        <div className={styles.inner}>
          <div className={styles.badge}>🚀 El futuro de tu empresa empieza hoy</div>

          <h2 className={styles.heading}>
            ¿Listo para llevar tu negocio al{' '}
            <span className={styles.gradientText}>siguiente nivel?</span>
          </h2>

          <p className={styles.body}>
            Conversemos sobre tu proyecto y descubramos cómo la automatización y la IA
            pueden impulsar el crecimiento de tu empresa.
          </p>

          <div className={styles.actions}>
            <Button href="#contacto" size="lg">
              Agenda una demo
            </Button>
            <Button
              href="https://wa.me/50233658428"
              size="lg"
              variant="secondary"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              Hablemos por WhatsApp
            </Button>
          </div>

          <ul className={styles.reassurances}>
            {['Sin compromiso', 'Respuesta en menos de 24h', 'Demo personalizada'].map((r) => (
              <li key={r} className={styles.reassurance}>
                <span className={styles.checkIcon} aria-hidden>✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
