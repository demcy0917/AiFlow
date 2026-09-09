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
          tag="Equipo"
          title="Las mentes detrás de SynQ"
          subtitle="Un equipo que combina inteligencia artificial, ingeniería, seguridad y diseño para que cada entrega funcione de verdad."
          align="left"
          className={styles.head}
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
