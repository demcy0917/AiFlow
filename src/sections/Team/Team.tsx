import { Container } from '../../components/common/Container';
import { SectionTitle } from '../../components/common/SectionTitle';
import { TeamCard } from '../../components/ui/TeamCard';
import { team } from '../../data/team';
import styles from './Team.module.css';

export function Team() {
  return (
    <section id="equipo" className={styles.section} aria-label="Nuestro equipo">
      <div className={styles.bgGlow} aria-hidden />

      <Container>
        <SectionTitle
          tag="Nuestro Equipo"
          title={<>Liderando la evolución de la <span className="gradient-text">Inteligencia</span></>}
          subtitle="Un equipo visionario comprometido con la automatización y el flujo inteligente de datos en la era moderna."
        />

        <div className={styles.grid}>
          {team.map((member, i) => (
            <div
              key={member.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
