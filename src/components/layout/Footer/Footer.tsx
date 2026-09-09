import { useEffect, useState } from 'react';
import { Container } from '../../common/Container';
import { TermsModal } from './TermsModal';
import { divisions } from '../../../data/divisions';
import { services } from '../../../data/services';
import {
  BRAND,
  WHATSAPP_URL,
  EMAIL,
  MAILTO_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  PHONE_DISPLAY,
  LOCATION,
} from '../../../data/site';
import styles from './Footer.module.css';

/* ═══════════════════════════════════════════════════════════════
   PIE DE PÁGINA
   ───────────────────────────────────────────────────────────────
   Cuatro columnas (marca, ecosistema, servicios, contacto) sobre
   la banda oscura, el aviso legal de uso de IA y la barra de
   copyright. Ecosistema y servicios se generan desde /data para
   que el pie nunca se desincronice de las secciones.
   ═══════════════════════════════════════════════════════════════ */

export function Footer() {
  const year = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);

  // El nombre completo se parte en dos pesos (700 / 300). El resto se deriva
  // de BRAND.fullName para no dejar "Corporation" escrito a mano acá.
  const brandSuffix = BRAND.fullName.replace(BRAND.name, '').trim();

  // Bloquea el scroll del fondo mientras el modal de términos está abierto.
  useEffect(() => {
    document.body.style.overflow = showTerms ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showTerms]);

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container className={styles.top}>
        <div className={styles.grid}>

          {/* Marca */}
          <div className={styles.col}>
            <div className={styles.brandRow}>
              <img src={BRAND.isotipo} alt="" className={styles.brandMark} />
              <div className={styles.brandNames}>
                <span className={styles.brandName}>
                  {BRAND.name} <span className={styles.brandNameLight}>{brandSuffix}</span>
                </span>
                <span className={styles.brandTagline}>{BRAND.tagline}</span>
              </div>
            </div>
            <p className={styles.brandClaim}>{BRAND.claim}</p>
          </div>

          {/* Ecosistema */}
          {/* Los rótulos dicen "enlaces": el nombre a secas chocaría con el
              de la sección Ecosistema en la lista de regiones del lector. */}
          <nav className={styles.col} aria-label="Enlaces del ecosistema">
            <p className={styles.colTitle}>Ecosistema</p>
            <ul className={styles.linkList}>
              {divisions.map((d) => (
                <li key={d.id}>
                  <a href="#ecosistema" className={styles.link}>
                    {BRAND.name} {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav className={styles.col} aria-label="Enlaces de servicios">
            <p className={styles.colTitle}>Servicios</p>
            <ul className={styles.linkList}>
              {services.map((s) => (
                <li key={s.num}>
                  <a href="#servicios" className={styles.link}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className={styles.col}>
            <p className={styles.colTitle}>Contacto</p>
            <ul className={styles.linkList}>
              <li>
                <a href={WHATSAPP_URL} className={styles.link} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={MAILTO_URL} className={styles.link}>{EMAIL}</a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} className={styles.link} target="_blank" rel="noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li><span className={styles.plain}>{PHONE_DISPLAY}</span></li>
              <li><span className={styles.plain}>{LOCATION}</span></li>
            </ul>
          </div>

        </div>

        {/* Aviso de uso de IA — requerido por temas legales */}
        <p className={styles.aiNotice}>
          <i className="fa-solid fa-robot" aria-hidden="true" />
          <span>
            Este sitio web utiliza inteligencia artificial (IA) en sus chatbots,
            automatizaciones e interacciones. Las respuestas generadas por IA pueden
            contener imprecisiones y no constituyen asesoramiento profesional. Al usar
            el sitio aceptas nuestros{' '}
            <button type="button" className={styles.inlineLink} onClick={() => setShowTerms(true)}>
              Términos y Condiciones
            </button>.
          </span>
        </p>
      </Container>

      {/* Barra inferior: el borde cruza todo el ancho, el contenido
          se alinea al contenedor como el resto de la página. */}
      <div className={styles.bottomBar}>
        <Container className={styles.bottomInner}>
          <div className={styles.bottomLeft}>
            <span>© {year} {BRAND.fullName}. Todos los derechos reservados.</span>
            <button type="button" className={styles.legalLink} onClick={() => setShowTerms(true)}>
              Términos y Condiciones
            </button>
          </div>
          <span className={styles.claimEn}>{BRAND.claimEn}</span>
        </Container>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </footer>
  );
}
