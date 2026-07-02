import { useEffect, useState } from 'react';
import { Container } from '../../common/Container';
import { TermsModal } from './TermsModal';
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
  const [showTerms, setShowTerms] = useState(false);

  // Bloquea el scroll del fondo mientras el modal de términos está abierto.
  useEffect(() => {
    document.body.style.overflow = showTerms ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showTerms]);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topLine} aria-hidden />
      <Container>
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logo} aria-label="Aiflow – Inicio">
              <img src="/logoaiflow.jpeg" alt="Aiflow" className={styles.logoImg} />
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
                <a href="mailto:demcy@aiflowgt.com" className={styles.contactLink}>
                  demcy@aiflowgt.com
                </a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <a href="https://wa.me/50233658428" className={styles.contactLink} target="_blank" rel="noreferrer">
                  +502 3365-8428
                </a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <span className={styles.contactText}>Guatemala</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Aviso de uso de IA — requerido por temas legales */}
        <p className={styles.aiNotice}>
          <i className="fa-solid fa-robot" aria-hidden="true" />
          Este sitio web utiliza inteligencia artificial (IA) en sus chatbots,
          automatizaciones e interacciones. Las respuestas generadas por IA pueden
          contener imprecisiones y no constituyen asesoramiento profesional. Al usar
          el sitio aceptas nuestros{' '}
          <button type="button" className={styles.inlineLink} onClick={() => setShowTerms(true)}>
            Términos y Condiciones
          </button>.
        </p>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Aiflow. Todos los derechos reservados.
          </p>
          <div className={styles.bottomRight}>
            <button type="button" className={styles.legalLink} onClick={() => setShowTerms(true)}>
              Términos y Condiciones
            </button>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden />
              Sistemas operativos
            </span>
          </div>
        </div>
      </Container>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </footer>
  );
}
