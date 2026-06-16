import styles from './ChatbotPreview.module.css';

const messages = [
  { from: 'user', text: 'Hola, necesito información sobre sus precios' },
  { from: 'bot',  text: '¡Hola! Con gusto te ayudo. ¿Qué tipo de solución buscas?' },
  { from: 'user', text: 'Quiero automatizar mis ventas por WhatsApp' },
  { from: 'bot',  text: 'Perfecto. Tenemos un plan ideal para ti. ¿Te agendamos una demo?', typing: false },
];

export function ChatbotPreview() {
  return (
    <div className={styles.widget} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.avatar}>
          <span>🤖</span>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.name}>Aiflow Bot</span>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            En línea
          </span>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${styles[msg.from]}`}>
            <p className={styles.bubble}>{msg.text}</p>
          </div>
        ))}
        <div className={`${styles.message} ${styles.bot}`}>
          <div className={styles.typing}>
            <span /><span /><span />
          </div>
        </div>
      </div>

      <div className={styles.inputArea}>
        <span className={styles.inputPlaceholder}>Escribe un mensaje…</span>
        <button className={styles.sendBtn} aria-label="Enviar">→</button>
      </div>
    </div>
  );
}
