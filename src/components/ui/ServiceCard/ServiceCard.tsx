import type { Service } from '../../../types';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={`${styles.card} ${styles[service.color]}`} aria-label={service.title}>
      <div className={styles.iconWrapper} aria-hidden>
        <span className={styles.icon}>{service.icon}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>

        <ul className={styles.features} aria-label={`Características de ${service.title}`}>
          {service.features.map((f) => (
            <li key={f} className={styles.feature}>
              <span className={styles.featureDot} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <a href="#contacto" className={styles.cta} aria-label={`Saber más sobre ${service.title}`}>
        Saber más
        <span className={styles.ctaArrow} aria-hidden>→</span>
      </a>
    </article>
  );
}
