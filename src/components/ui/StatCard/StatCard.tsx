import type { Stat } from '../../../types';
import styles from './StatCard.module.css';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className={`${styles.card} ${styles[stat.color]}`} role="figure" aria-label={`${stat.value} ${stat.label}`}>
      <span className={styles.icon} aria-hidden>{stat.icon}</span>
      <div className={styles.body}>
        <span className={styles.value}>{stat.value}</span>
        <span className={styles.label}>{stat.label}</span>
        <span className={styles.description}>{stat.description}</span>
      </div>
    </div>
  );
}
