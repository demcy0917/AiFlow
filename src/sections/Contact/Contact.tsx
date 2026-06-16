import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';
import { SectionTitle } from '../../components/common/SectionTitle';
import styles from './Contact.module.css';

const WHATSAPP_NUMBER = '50258744495';

interface ContactOption {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}

const contactOptions: ContactOption[] = [
  { icon: <i className="fa-solid fa-envelope" />,       label: 'Email',     value: 'davidmelgar28115@gmail.com', href: 'mailto:davidmelgar28115@gmail.com' },
  { icon: <i className="fa-brands fa-whatsapp" />,      label: 'WhatsApp',  value: '+502 5874-4495',             href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: <i className="fa-solid fa-location-dot" />,   label: 'Ubicación', value: 'Guatemala',                  href: '#' },
];

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const EMPTY_FORM: FormState = { name: '', email: '', company: '', service: '', message: '' };

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `Nuevo contacto Aiflow — ${form.name}`,
          from_name: 'Aiflow Landing Page',
          name: form.name,
          email: form.email,
          company: form.company || 'No indicó',
          service: form.service || 'No indicó',
          message: form.message || 'Sin mensaje',
        }),
      });

      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contacto" className={styles.section} aria-label="Contacto">
      <Container>
        <div className={styles.layout}>
          {/* Info column */}
          <div className={styles.info}>
            <SectionTitle
              tag="Contacto"
              title={<>Hablemos de tu <span className="gradient-text">proyecto</span></>}
              subtitle="Cuéntanos sobre tu empresa y tus desafíos. Te respondemos en menos de 24 horas con una propuesta personalizada."
              align="left"
            />

            <ul className={styles.contactList}>
              {contactOptions.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className={styles.contactItem}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    <span className={styles.contactIcon}>{c.icon}</span>
                    <div>
                      <span className={styles.contactLabel}>{c.label}</span>
                      <span className={styles.contactValue}>{c.value}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className={styles.formWrapper}>
            {status === 'success' ? (
              <div className={styles.successState}>
                <span className={styles.successIcon}>✓</span>
                <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
                <p className={styles.successText}>
                  Nos pondremos en contacto contigo en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Nombre</label>
                    <input
                      id="name" name="name" type="text"
                      className={styles.input} placeholder="Tu nombre"
                      required aria-required="true"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      id="email" name="email" type="email"
                      className={styles.input} placeholder="tu@empresa.com"
                      required aria-required="true"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="company" className={styles.label}>Empresa</label>
                  <input
                    id="company" name="company" type="text"
                    className={styles.input} placeholder="Nombre de tu empresa"
                    value={form.company} onChange={handleChange}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="service" className={styles.label}>¿Qué necesitas?</label>
                  <select
                    id="service" name="service"
                    className={`${styles.input} ${styles.select}`}
                    value={form.service} onChange={handleChange}
                  >
                    <option value="" disabled>Selecciona un servicio</option>
                    <option>Automatizaciones</option>
                    <option>Chatbots con IA</option>
                    <option>Sistema Empresarial</option>
                    <option>Software a la Medida</option>
                    <option>No estoy seguro, necesito orientación</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>Cuéntanos más</label>
                  <textarea
                    id="message" name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Describe brevemente tu proyecto o desafío..."
                    rows={4}
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p className={styles.errorMsg} role="alert">
                    Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <Button type="submit" size="lg" fullWidth disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
