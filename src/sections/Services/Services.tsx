import { Container } from '../../components/common/Container';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { services } from '../../data/services';
import styles from './Services.module.css';

export function Services() {
  return (
    <section id="servicios" className={styles.section} aria-label="Nuestros servicios">
      <Container>
        <SectionTitle
          tag="Servicios"
          title={<>Lo que construimos para <span className="gradient-text">ti</span></>}
          subtitle="Soluciones digitales diseñadas para transformar la forma en que opera y crece tu empresa."
        />

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
