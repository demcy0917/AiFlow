import { useState, useEffect } from 'react';
import { navLinks } from '../../../data/navLinks';
import { Button } from '../../common/Button';
import { Container } from '../../common/Container';
import styles from './Navbar.module.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <Container>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#inicio" className={styles.logo} aria-label="Aiflow – Inicio">
            <img src="/logoaiflow.png" alt="Aiflow" className={styles.logoImg} />
          </a>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`} role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.navLink} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles.mobileCtaItem}>
              <a
                href="https://wa.me/50233658428"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappMobile}
                onClick={closeMenu}
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Hablar por WhatsApp
              </a>
            </li>
            <li className={styles.mobileCtaItem}>
              <Button href="#contacto" size="md" onClick={closeMenu}>
                Agenda una demo
              </Button>
            </li>
          </ul>

          <div className={styles.actions}>
            <a
              href="https://wa.me/50233658428"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
              aria-label="Hablar por WhatsApp"
              title="Hablar por WhatsApp"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
            <Button href="#contacto" size="sm">
              Agenda una demo
            </Button>
            <button
              className={`${styles.menuToggle} ${menuOpen ? styles.menuOpen : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
