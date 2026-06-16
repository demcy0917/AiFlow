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
            <span className={styles.logoIcon}>⬡</span>
            <span className={styles.logoText}>
              Ai<span className={styles.logoAccent}>flow</span>
            </span>
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
              <Button href="#contacto" size="md" onClick={closeMenu}>
                Agenda una demo
              </Button>
            </li>
          </ul>

          <div className={styles.actions}>
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
