import { useEffect, useState } from 'react';
import { navLinks } from '../../../data/navLinks';
import { BRAND, WHATSAPP_URL } from '../../../data/site';
import styles from './Navbar.module.css';

/**
 * Encabezado de SynQ.
 *
 * En escritorio son los enlaces más el botón de WhatsApp. Por debajo
 * de 1160px los enlaces se van a un drawer lateral y queda solo el
 * logo, el botón y la hamburguesa.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  // Escape cierra el drawer.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  // Bloquea el scroll del fondo mientras el drawer está abierto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={styles.header} role="banner">
        <div className={styles.bar}>
          {/* Logo: isotipo + nombre en dos pesos + bajada */}
          <a href="#inicio" className={styles.logo} aria-label={`${BRAND.fullName} – Inicio`} onClick={close}>
            <img src={BRAND.isotipo} alt="" className={styles.logoMark} width={44} height={44} />
            <span className={styles.logoText}>
              <span className={styles.logoName}>
                SynQ <span className={styles.logoNameLight}>Corporation</span>
              </span>
              <span className={styles.logoTagline}>{BRAND.tagline}</span>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a key={link.id} href={link.href} className={styles.navLink} onClick={close}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={styles.waBtn}>
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              <span className={styles.waLabel}>Hablemos por WhatsApp</span>
            </a>

            <button
              type="button"
              className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer de móvil ──────────────────────────────────── */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className={styles.mobileNav} aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} className={styles.mobileLink} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={styles.mobileWa}>
          <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Hablemos por WhatsApp
        </a>
      </div>
    </>
  );
}
