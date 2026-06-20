import { useEffect, useRef } from 'react';
import styles from './TermsModal.module.css';

interface TermsModalProps {
  onClose: () => void;
}

/**
 * Modal de Términos y Condiciones, centrado en el uso de Inteligencia
 * Artificial (requerido por temas legales). Accesible: cierra con Esc,
 * con el botón de cierre o haciendo clic en el fondo.
 */
export function TermsModal({ onClose }: TermsModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              <i className="fa-solid fa-robot" aria-hidden="true" /> Aviso legal · Uso de IA
            </p>
            <h2 id="terms-title" className={styles.title}>Términos y Condiciones</h2>
          </div>
          <button
            type="button"
            ref={closeRef}
            className={styles.close}
            onClick={onClose}
            aria-label="Cerrar términos y condiciones"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.updated}>Última actualización: {year}</p>

          <section className={styles.section}>
            <h3 className={styles.heading}>1. Uso de Inteligencia Artificial</h3>
            <p>
              Este sitio web y los servicios de Aiflow emplean tecnologías de
              inteligencia artificial (IA), incluyendo chatbots, asistentes
              virtuales, automatizaciones y procesamiento de lenguaje natural. Al
              navegar e interactuar con el sitio reconoces y aceptas que parte del
              contenido y de las respuestas que recibes pueden ser generadas de
              forma automatizada mediante IA.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>2. Naturaleza de la información generada</h3>
            <p>
              Las respuestas e interacciones generadas por IA tienen carácter
              informativo y orientativo. Pueden contener imprecisiones, errores u
              omisiones y no deben considerarse asesoramiento profesional, legal,
              financiero ni de ningún otro tipo. Recomendamos verificar la
              información relevante antes de tomar decisiones.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>3. Datos e interacciones</h3>
            <p>
              Las conversaciones, mensajes y datos que proporciones a través de
              nuestros chatbots o formularios pueden ser procesados por sistemas de
              IA y por terceros proveedores con el fin de prestar y mejorar el
              servicio. No compartas información confidencial o sensible que no
              desees que sea procesada de forma automatizada.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>4. Limitación de responsabilidad</h3>
            <p>
              Aiflow no será responsable por decisiones, daños o perjuicios
              derivados del uso de la información generada por IA en este sitio. El
              uso del sitio y de sus funciones automatizadas se realiza bajo tu
              propia responsabilidad.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.heading}>5. Contacto</h3>
            <p>
              Si tienes dudas sobre estos Términos y Condiciones o sobre el uso de
              IA en nuestros servicios, escríbenos a{' '}
              <a href="mailto:davidmelgar28115@gmail.com" className={styles.link}>
                davidmelgar28115@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <footer className={styles.footerBar}>
          <button type="button" className={styles.accept} onClick={onClose}>
            Entendido
          </button>
        </footer>
      </div>
    </div>
  );
}
