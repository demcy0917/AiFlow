import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { Container } from '../../components/common/Container';
import { SectionTitle } from '../../components/common/SectionTitle';
import styles from './Intelligence.module.css';

/* ── Static data ─────────────────────────────────────────────── */

interface KpiDef {
  label: string;
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
  delta: string;
  positive: boolean;
}

const kpis: KpiDef[] = [
  { label: 'Ventas del Mes',      end: 847,  decimals: 0, prefix: '$', suffix: 'K', delta: '+12.5%', positive: true  },
  { label: 'Margen Bruto',        end: 34.2, decimals: 1, prefix: '',  suffix: '%', delta: '+2.1%',  positive: true  },
  { label: 'Rotación Inventario', end: 8.4,  decimals: 1, prefix: '',  suffix: 'x', delta: '+0.8',   positive: true  },
  { label: 'Días de Cobro',       end: 28,   decimals: 0, prefix: '',  suffix: '',  delta: '-3',     positive: true  },
];

const barHeights = [32, 48, 44, 62, 50, 72, 58, 80, 66, 88, 74, 92];
const months     = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/* Donut segments: [cyan, purple] as percentages → strokeDasharray out of 176 (2πr) */
const CIRCUMFERENCE = 2 * Math.PI * 28; // ≈ 175.93

const features = [
  { faIcon: 'fa-solid fa-gauge-high',  color: 'cyan',   title: 'Dashboards Ejecutivos',  desc: 'Tableros de control con métricas clave actualizadas en tiempo real.' },
  { faIcon: 'fa-solid fa-bullseye',    color: 'purple', title: 'KPIs Estratégicos',       desc: 'Indicadores de rendimiento alineados a los objetivos del negocio.' },
  { faIcon: 'fa-solid fa-table-cells', color: 'teal',   title: 'Análisis Financiero',     desc: 'Proyecciones, flujo de caja, márgenes y análisis de rentabilidad.' },
  { faIcon: 'fa-solid fa-file-invoice',color: 'orange', title: 'Reportes Fiscales',       desc: 'Reportes regulatorios automatizados y cumplimiento tributario.' },
  { faIcon: 'fa-solid fa-chart-simple',color: 'red',    title: 'Reportes de Producción',  desc: 'Eficiencia operativa, costos de producción y control de calidad.' },
  { faIcon: 'fa-solid fa-truck',       color: 'teal',   title: 'Reportes Logísticos',     desc: 'Seguimiento de entregas, rutas y rendimiento de la cadena.' },
];

/* ── Animated KPI card ───────────────────────────────────────── */
function KpiCard({ kpi, active }: { kpi: KpiDef; active: boolean }) {
  const value = useCountUp({ end: kpi.end, decimals: kpi.decimals, active, duration: 1800 });

  return (
    <div className={styles.kpiCard}>
      <span className={styles.kpiLabel}>{kpi.label}</span>
      <span className={styles.kpiValue}>
        {kpi.prefix}{kpi.decimals > 0 ? value.toFixed(kpi.decimals) : Math.round(value)}{kpi.suffix}
      </span>
      <span className={`${styles.kpiDelta} ${kpi.positive ? styles.positive : styles.negative}`}>
        <i className={`fa-solid ${kpi.positive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`} aria-hidden="true" />
        {kpi.delta}
      </span>
    </div>
  );
}

/* ── Animated donut ──────────────────────────────────────────── */
function DonutChart({ active }: { active: boolean }) {
  const cyanPct  = useCountUp({ end: 55,  decimals: 0, active, duration: 1600 });
  const purplePct= useCountUp({ end: 30,  decimals: 0, active, duration: 1600 });

  const cyanDash   = (cyanPct   / 100) * CIRCUMFERENCE;
  const purpleDash = (purplePct / 100) * CIRCUMFERENCE;
  const cyanOffset   = 0;
  const purpleOffset = -cyanDash;

  return (
    <div className={styles.donutCard}>
      <div className={styles.donutHeader}>
        <i className="fa-regular fa-clock" aria-hidden="true" />
        <span>By Region</span>
      </div>
      <div className={styles.donutWrapper}>
        <svg className={styles.donutSvg} viewBox="0 0 80 80" aria-hidden="true">
          <defs>
            <linearGradient id="gCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#0080ff" />
            </linearGradient>
            <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7b2fff" />
              <stop offset="100%" stopColor="#ff00aa" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />

          {/* Cyan arc */}
          <circle
            cx="40" cy="40" r="28"
            fill="none"
            stroke="url(#gCyan)"
            strokeWidth="10"
            strokeDasharray={`${cyanDash} ${CIRCUMFERENCE}`}
            strokeDashoffset={cyanOffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />

          {/* Purple arc */}
          <circle
            cx="40" cy="40" r="28"
            fill="none"
            stroke="url(#gPurple)"
            strokeWidth="10"
            strokeDasharray={`${purpleDash} ${CIRCUMFERENCE}`}
            strokeDashoffset={purpleOffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>

        <div className={styles.donutLegend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#00f5ff' }} />
            LATAM {Math.round(cyanPct)}%
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#7b2fff' }} />
            USA {Math.round(purplePct)}%
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: 'rgba(255,255,255,0.2)' }} />
            EU 15%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────── */
export function Intelligence() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="inteligencia" className={styles.section} aria-label="Reportería e Inteligencia de Negocios">
      <div className={styles.bgGlow} aria-hidden />
      <Container>
        <SectionTitle
          tag="Business Intelligence"
          title={<>Reportería e <span className="gradient-text">Inteligencia</span> de Negocios</>}
          subtitle="Dashboards ejecutivos, KPIs en tiempo real y análisis predictivo conectados directamente a tus sistemas empresariales."
        />

        {/* ── Dashboard card ── */}
        <div className={styles.dashCard} ref={ref}>

          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.liveIndicator} aria-hidden />
              <span className={styles.cardTitle}>Dashboard Ejecutivo</span>
              <span className={styles.realtime}>· Real-time</span>
            </div>
            <div className={styles.previewBtn}>
              <i className="fa-solid fa-chart-line" aria-hidden="true" />
              Preview
            </div>
          </div>

          {/* KPIs */}
          <div className={styles.kpiRow}>
            {kpis.map((k) => <KpiCard key={k.label} kpi={k} active={inView} />)}
          </div>

          {/* Charts */}
          <div className={styles.chartRow}>
            <div className={styles.barChartCard}>
              <div className={styles.barChartHeader}>
                <span className={styles.barChartTitle}>Sales Trend</span>
                <span className={styles.monthlyBadge}>Monthly</span>
              </div>
              <div className={styles.barChart}>
                {barHeights.map((h, i) => (
                  <div key={i} className={styles.barCol}>
                    <div
                      className={styles.bar}
                      style={{
                        height: inView ? `${h}%` : '0%',
                        transitionDelay: `${i * 0.07}s`,
                      }}
                    />
                    {(i === 0 || i === 5 || i === 11) && (
                      <span className={styles.barLabel}>{months[i]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rightCol}>
              <DonutChart active={inView} />

              <div className={styles.aiCard}>
                <div className={styles.aiHeader}>
                  <span className={styles.aiIcon}>◈</span>
                  <span className={styles.aiTitle}>IA Predictiva Activa</span>
                </div>
                <div className={styles.aiMetrics}>
                  <div className={styles.aiMetric}>
                    <span className={styles.aiMetricLabel}>Q4 Projection</span>
                    <span className={styles.aiMetricValue}>+18.5%</span>
                  </div>
                  <div className={styles.aiMetric}>
                    <span className={styles.aiMetricLabel}>Confidence</span>
                    <span className={styles.aiMetricValue}>94%</span>
                  </div>
                </div>
                <div className={styles.confidenceBar}>
                  <div
                    className={styles.confidenceFill}
                    style={{ width: inView ? '94%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${styles.featureCard} ${styles[f.color]}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`${styles.featureIconWrapper} ${styles[`icon_${f.color}`]}`}>
                <i className={f.faIcon} aria-hidden="true" />
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
