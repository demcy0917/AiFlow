import { useEffect, useRef, useState } from 'react';
import { MessageContent } from './MessageContent';
import { BRAND, WHATSAPP_PLAIN_URL } from '../../../data/site';
import styles from './ChatWidget.module.css';

/* ═══════════════════════════════════════════════════════════════
   ASESOR VIRTUAL — WIDGET FLOTANTE
   ───────────────────────────────────────────────────────────────
   Botón fijo abajo a la derecha que abre una barra lateral con la
   conversación real contra /api/chat. Está disponible en toda la
   página, no solo en una sección.
   ═══════════════════════════════════════════════════════════════ */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content:
    '¡Hola! 👋 Soy el asesor virtual de SynQ. Ayudo a negocios a dejar de perder tiempo y dinero en tareas manuales.\n\nContame, ¿a qué se dedica tu negocio?',
};

const SUGGESTIONS = [
  'Pierdo pedidos por anotarlos a mano',
  'Se me olvida cobrarle a mis clientes',
  '¿Qué puede automatizar SynQ?',
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al último mensaje.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Enfocar el campo al abrir.
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* Mantener el panel dentro de la parte visible de la pantalla.
     Al abrirse el teclado en movil, el viewport visible se encoge pero el
     de layout no: un panel de 100dvh conserva su alto, el navegador
     desplaza para mostrar el campo de texto y la cabecera y los mensajes
     se van fuera de pantalla. Aqui se copia el alto real de
     visualViewport a --chat-h, y su desplazamiento a --chat-top, que en
     iOS hace falta porque un position: fixed se ancla al viewport de
     layout. Sin visualViewport no se toca nada y manda el 100dvh del CSS. */
  useEffect(() => {
    const vv = window.visualViewport;
    if (!isOpen || !vv) return;

    const raiz = document.documentElement;

    function sincronizar() {
      // vv nunca es null aqui: la salida temprana de arriba lo garantiza,
      // pero el cierre lo captura como posiblemente nulo.
      if (!vv) return;
      raiz.style.setProperty('--chat-h', `${vv.height}px`);
      raiz.style.setProperty('--chat-top', `${vv.offsetTop}px`);
    }

    sincronizar();
    vv.addEventListener('resize', sincronizar);
    vv.addEventListener('scroll', sincronizar);

    return () => {
      vv.removeEventListener('resize', sincronizar);
      vv.removeEventListener('scroll', sincronizar);
      raiz.style.removeProperty('--chat-h');
      raiz.style.removeProperty('--chat-top');
    };
  }, [isOpen]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(history);
    setInput('');
    setError(null);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // El saludo inicial es del cliente, no parte de la conversación real.
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        setError(data.error ?? 'No pude responder en este momento.');
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply as string }]);
    } catch {
      setError('Se perdió la conexión. Revisá tu internet e intentá de nuevo.');
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        className={`${styles.launcher} ${isOpen ? styles.launcherHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir asesor virtual"
      >
        <i className="fa-solid fa-comment-dots" aria-hidden="true" />
        <span className={styles.launcherText}>Asesoría con IA</span>
      </button>

      {/* Fondo oscuro (solo móvil) */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Barra lateral */}
      <aside
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="Asesor virtual de SynQ"
        aria-hidden={!isOpen}
      >
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.avatar}>
              <img src={BRAND.isotipo} alt="" className={styles.avatarIcon} />
            </span>
            <div>
              <p className={styles.headerTitle}>Asesor SynQ</p>
              <p className={styles.headerStatus}>
                <span className={styles.statusDot} /> En línea
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar asesor virtual"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </header>

        <div className={styles.messages} ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.row} ${m.role === 'user' ? styles.rowUser : ''}`}>
              <div
                className={`${styles.bubble} ${
                  m.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                }`}
              >
                <MessageContent text={m.content} />
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={styles.row}>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typing}`}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className="sr-only">Escribiendo…</span>
              </div>
            </div>
          )}

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {showSuggestions && (
            <div className={styles.suggestions}>
              <p className={styles.suggestionsLabel}>Dudas frecuentes</p>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={styles.suggestion}
                  onClick={() => void send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className={styles.composer} onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className={styles.input}
            placeholder="Escribí tu mensaje…"
            rows={1}
            maxLength={1500}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Mensaje"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || isTyping}
            aria-label="Enviar mensaje"
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
          </button>
        </form>

        <p className={styles.disclaimer}>
          Respuestas generadas con IA. Para una propuesta formal,{' '}
          <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer">
            escribinos por WhatsApp
          </a>
          .
        </p>
      </aside>
    </>
  );
}
