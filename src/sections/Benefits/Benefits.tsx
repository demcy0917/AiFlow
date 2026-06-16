import { Container } from '../../components/common/Container';
import { SectionTitle } from '../../components/common/SectionTitle';
import { StatCard } from '../../components/ui/StatCard';
import { stats } from '../../data/stats';
import styles from './Benefits.module.css';

const processSteps = [
  { num: '01', title: 'Diagnóstico',    desc: 'Analizamos tus procesos actuales y detectamos oportunidades de mejora.' },
  { num: '02', title: 'Diseño',         desc: 'Creamos la arquitectura de la solución adaptada a tu empresa.' },
  { num: '03', title: 'Implementación', desc: 'Construimos e integramos la solución con tus herramientas existentes.' },
  { num: '04', title: 'Resultados',     desc: 'Medimos el impacto y escalamos la solución conforme creces.' },
];

export function Benefits() {
  return (
    <section id="beneficios" className={styles.section} aria-label="Beneficios y resultados">
      <Container>
        <SectionTitle
          tag="Resultados"
          title={<>Números que <span className="gradient-text">hablan</span> por sí solos</>}
          subtitle="Nuestras soluciones generan impacto real y medible desde las primeras semanas de implementación."
        />

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={stat.id} className={styles.statWrapper} style={{ animationDelay: `${i * 0.1}s` }}>
              <StatCard stat={stat} />
            </div>
          ))}
        </div>

        {/* Process steps */}
        <div className={styles.processWrapper}>
          <h3 className={styles.processTitle}>Nuestro proceso</h3>
          <div className={styles.steps}>
            {processSteps.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                {i < processSteps.length - 1 && <div className={styles.stepLine} aria-hidden />}
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
