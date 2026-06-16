import { useState } from 'react';
import type { TeamMember } from '../../../types';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = member.image && !imgError;

  return (
    <article className={`${styles.card} ${styles[member.color]}`}>
      {/* Glow border (hover) */}
      <span className={styles.borderGlow} aria-hidden />

      {/* Photo */}
      <div className={styles.photoWrapper}>
        {showImage ? (
          <img
            src={member.image}
            alt={`Foto de ${member.name}`}
            className={styles.photo}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.fallback} aria-label={member.name}>
            <span className={styles.fallbackInitials}>{member.initials}</span>
          </div>
        )}

        <div className={styles.photoOverlay} aria-hidden />

        {/* Badge */}
        <span className={styles.badge}>{member.badge}</span>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{member.name}</h3>
        <span className={styles.role}>{member.role}</span>
        <p className={styles.description}>{member.description}</p>

        {/* Socials */}
        {member.socials.length > 0 && (
          <div className={styles.socials}>
            {member.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialLink}
                aria-label={`${s.label} de ${member.name}`}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <i className={s.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
