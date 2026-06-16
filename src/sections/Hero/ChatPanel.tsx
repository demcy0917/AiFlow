import { useState, useEffect, useRef } from 'react';
import styles from './ChatPanel.module.css';

interface Msg { from: 'user' | 'bot'; text: string; time: string; }

const SCRIPT: Msg[] = [
  { from: 'user', text: 'Hola, necesito ayuda con mi negocio.',                                          time: '10:30' },
  { from: 'bot',  text: '¡Hola! Claro, ¿qué te gustaría automatizar?',                                  time: '10:30' },
  { from: 'user', text: 'Quiero responder clientes por WhatsApp y agendar citas.',                       time: '10:30' },
  { from: 'bot',  text: 'Perfecto. Podemos conectar WhatsApp, IA, CRM y Google Calendar.',              time: '10:31' },
  { from: 'user', text: '¿También pueden guardar mis leads?',                                            time: '10:32' },
  { from: 'bot',  text: 'Sí, automáticamente en tu CRM o en Google Sheets. ¿Deseas una demo?',          time: '10:32' },
  { from: 'user', text: 'Sí, agendemos una demo.',                                                      time: '10:33' },
];

/* Delay before each message (ms) */
const MSG_DELAY = 1200;
const TYPING_DURATION = 1400;
const RESET_DELAY = 3000;

export function ChatPanel() {
  const [visible, setVisible] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;

    function schedule() {
      if (cancelled) return;

      if (idx >= SCRIPT.length) {
        setTimeout(() => {
          if (!cancelled) { setVisible([]); setTyping(false); idx = 0; schedule(); }
        }, RESET_DELAY);
        return;
      }

      const msg = SCRIPT[idx];
      const delay = idx === 0 ? 600 : MSG_DELAY;

      setTimeout(() => {
        if (cancelled) return;

        if (msg.from === 'bot') {
          setTyping(true);
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setVisible((prev) => [...prev, msg]);
            idx++;
            schedule();
          }, TYPING_DURATION);
        } else {
          setVisible((prev) => [...prev, msg]);
          idx++;
          schedule();
        }
      }, delay);
    }

    schedule();
    return () => { cancelled = true; };
  }, []);

  // Scroll SOLO dentro del contenedor del chat — nunca mueve la página
  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [visible, typing]);

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>
          <i className="fa-solid fa-robot" aria-hidden="true" />
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.name}>Asistente IA</span>
          <span className={styles.online}>
            <span className={styles.onlineDot} />
            En línea
          </span>
        </div>
        <div className={styles.menuDots}>···</div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className={styles.messages} aria-live="polite" aria-label="Conversación de chat">
        {visible.map((msg, i) => (
          <div key={i} className={`${styles.row} ${styles[msg.from]}`}>
            {msg.from === 'bot' && (
              <div className={styles.botAvatar} aria-hidden>
                <i className="fa-solid fa-robot" />
              </div>
            )}
            {msg.from === 'user' && (
              <div className={styles.userAvatar} aria-hidden>
                <i className="fa-solid fa-user" />
              </div>
            )}
            <div className={styles.bubble}>
              <p className={styles.text}>{msg.text}</p>
              <span className={styles.time}>{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className={`${styles.row} ${styles.bot}`}>
            <div className={styles.botAvatar} aria-hidden>
              <i className="fa-solid fa-robot" />
            </div>
            <div className={`${styles.bubble} ${styles.typingBubble}`} aria-label="El bot está escribiendo">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={styles.inputBar}>
        <span className={styles.inputPlaceholder}>Escribe un mensaje...</span>
        <button className={styles.sendBtn} aria-label="Enviar mensaje">
          <i className="fa-solid fa-paper-plane" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
