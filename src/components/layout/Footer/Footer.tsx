import { Container } from '../../common/Container';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Soluciones', href: '#beneficios' },
  { label: 'Nosotros',   href: '#equipo' },
  { label: 'Contacto',   href: '#contacto' },
];

const serviceLinks = [
  { label: 'Automatizaciones',      href: '#servicios' },
  { label: 'Chatbots con IA',       href: '#servicios' },
  { label: 'Sistemas Empresariales',href: '#servicios' },
  { label: 'Software a la Medida',  href: '#servicios' },
  { label: 'Business Intelligence', href: '#inteligencia' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topLine} aria-hidden />
      <Container>
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logo} aria-label="Aiflow – Inicio">
              <span className={styles.logoIcon}>⬡</span>
              <span className={styles.logoText}>
                Ai<span className={styles.logoAccent}>flow</span>
              </span>
            </a>
            <p className={styles.tagline}>
              Automatizaciones, chatbots con IA, sistemas y software a la medida
              para empresas que quieren crecer sin límites.
            </p>
            <span className={styles.coverage}>
              <i className="fa-solid fa-earth-americas" aria-hidden="true" />
              Cobertura Internacional
            </span>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <p className={styles.colTitle}>Navegación</p>
            <ul className={styles.linkList}>
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={styles.link}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <div>
            <p className={styles.colTitle}>Servicios</p>
            <ul className={styles.linkList}>
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={styles.link}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className={styles.colTitle}>Contacto</p>
            <ul className={styles.contactList}>
              <li>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <a href="mailto:davidmelgar28115@gmail.com" className={styles.contactLink}>
                  davidmelgar28115@gmail.com
                </a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <a href="https://wa.me/50258744495" className={styles.contactLink} target="_blank" rel="noreferrer">
                  +502 5874-4495
                </a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <span className={styles.contactText}>Guatemala</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Aiflow. Todos los derechos reservados.
          </p>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden />
            Sistemas operativos
          </span>
        </div>
      </Container>
    </footer>
  );
}
