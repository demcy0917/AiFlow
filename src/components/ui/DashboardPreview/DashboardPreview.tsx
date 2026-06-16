import styles from './DashboardPreview.module.css';

const metricCards = [
  { label: 'Leads hoy',     value: '247',   delta: '+12%', color: 'cyan'    },
  { label: 'Conversiones',  value: '38',    delta: '+8%',  color: 'blue'    },
  { label: 'Automatizados', value: '1,204', delta: '+24%', color: 'purple'  },
];

const flowNodes = [
  { label: 'Trigger', icon: '⚡', active: true  },
  { label: 'Filtrar',  icon: '🔍', active: true  },
  { label: 'IA',       icon: '🤖', active: true  },
  { label: 'Acción',   icon: '✅', active: false },
];

const integrations = [
  { label: 'WhatsApp', icon: '💬', color: '#25d366' },
  { label: 'Gmail',    icon: '📧', color: '#ea4335' },
  { label: 'CRM',      icon: '📊', color: '#00f5ff' },
  { label: 'IG',       icon: '📸', color: '#e1306c' },
  { label: 'Sheets',   icon: '📋', color: '#34a853' },
  { label: 'Slack',    icon: '🔔', color: '#4a154b' },
];

export function DashboardPreview() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* Outer glow ring */}
      <div className={styles.glowRing} />

      {/* Main dashboard window */}
      <div className={styles.dashboard}>
        {/* Window chrome */}
        <div className={styles.chrome}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
          </div>
          <span className={styles.chromeTitle}>Aiflow Dashboard</span>
        </div>

        {/* Metric cards row */}
        <div className={styles.metricsRow}>
          {metricCards.map((m) => (
            <div key={m.label} className={`${styles.metricCard} ${styles[m.color]}`}>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricDelta}>{m.delta}</span>
            </div>
          ))}
        </div>

        {/* Chart bar area */}
        <div className={styles.chart}>
          <span className={styles.chartLabel}>Flujo de automatizaciones — 7 días</span>
          <div className={styles.bars}>
            {[45, 62, 38, 75, 55, 88, 70].map((h, i) => (
              <div key={i} className={styles.barWrapper}>
                <div
                  className={styles.bar}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Automation flow */}
        <div className={styles.flow}>
          {flowNodes.map((node, i) => (
            <div key={node.label} className={styles.flowRow}>
              <div className={`${styles.flowNode} ${node.active ? styles.flowNodeActive : ''}`}>
                <span className={styles.flowIcon}>{node.icon}</span>
                <span className={styles.flowLabel}>{node.label}</span>
              </div>
              {i < flowNodes.length - 1 && (
                <div className={`${styles.flowLine} ${node.active ? styles.flowLineActive : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Integrations bubble */}
      <div className={styles.integrations}>
        <span className={styles.intTitle}>Integraciones</span>
        <div className={styles.intGrid}>
          {integrations.map((int) => (
            <div key={int.label} className={styles.intBadge} title={int.label}>
              <span className={styles.intIcon}>{int.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating notification */}
      <div className={styles.notification}>
        <span className={styles.notifDot} />
        <span className={styles.notifText}>⚡ 24 tareas automatizadas</span>
      </div>
    </div>
  );
}
