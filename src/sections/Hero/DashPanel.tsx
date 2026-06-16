import styles from './DashPanel.module.css';

const kpis = [
  { label: 'Leads hoy',     value: '247',   delta: '+12%',  color: 'cyan'    },
  { label: 'Conversiones',  value: '38',    delta: '+8%',   color: 'blue'    },
  { label: 'Automatizados', value: '1,204', delta: '+24%',  color: 'purple'  },
  { label: 'Ahorro tiempo', value: '32h',   delta: '+18%',  color: 'magenta' },
];

const bars = [42, 55, 48, 70, 62, 85, 78];
const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const flowRow1 = [
  { icon: 'fa-solid fa-bolt',       label: 'Trigger',    color: '#f59e0b' },
  { icon: 'fa-brands fa-whatsapp',  label: 'WhatsApp',   color: '#25d366' },
  { icon: 'fa-solid fa-robot',      label: 'IA',         color: '#00f5ff' },
  { icon: 'fa-solid fa-filter',     label: 'Filtrar',    color: '#a78bfa' },
];

const flowRow2 = [
  { icon: 'fa-solid fa-users',          label: 'CRM',          color: '#38bdf8' },
  { icon: 'fa-solid fa-table',          label: 'Sheets',       color: '#4ade80' },
  { icon: 'fa-solid fa-check-circle',   label: 'Acción',       color: '#00f5ff' },
  { icon: 'fa-solid fa-bell',           label: 'Notificación', color: '#f59e0b' },
];

export function DashPanel() {
  return (
    <div className={styles.panel}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <i className={`fa-solid fa-chart-line ${styles.headerIcon}`} aria-hidden="true" />
          <span className={styles.headerTitle}>Aiflow Dashboard</span>
        </div>
        <span className={styles.period}>Últimos 7 días ▾</span>
      </div>

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <div key={k.label} className={`${styles.kpiCard} ${styles[k.color]}`}>
            <span className={styles.kpiLabel}>{k.label}</span>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiDelta}>{k.delta}</span>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div className={styles.chartSection}>
        <span className={styles.chartLabel}>Flujo de automatizaciones — 7 días</span>
        <div className={styles.bars}>
          {bars.map((h, i) => (
            <div key={i} className={styles.barCol}>
              <div className={styles.bar} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
              <span className={styles.dayLabel}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Automation flow */}
      <div className={styles.flowSection}>
        <div className={styles.flowHeader}>
          <span className={styles.flowTitle}>
            <span className={styles.flowPlus}>+</span> Automatización
          </span>
          <span className={styles.activeBadge}>
            <span className={styles.activeDot} />
            Activo
          </span>
          <div className={styles.flowActions}>
            <button className={styles.flowBtn}>Guardar</button>
            <button className={`${styles.flowBtn} ${styles.flowBtnPrimary}`}>Publicar</button>
          </div>
        </div>

        {[flowRow1, flowRow2].map((row, ri) => (
          <div key={ri} className={styles.flowRow}>
            {row.map((node, ni) => (
              <div key={node.label} className={styles.nodeWrapper}>
                <div className={styles.node}>
                  <i className={node.icon} style={{ color: node.color }} aria-hidden="true" />
                  <span className={styles.nodeLabel}>{node.label}</span>
                </div>
                {ni < row.length - 1 && <div className={styles.arrow}>→</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
