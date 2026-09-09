/** Rate limiter nativo de Workers (binding de tipo "ratelimit"). */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  /** Assets estáticos del build de Vite (carpeta dist). */
  ASSETS: Fetcher;
  /** Tope de mensajes del chat por IP. */
  CHAT_LIMITER: RateLimiter;
  /** Tope de envíos del formulario por IP. */
  CONTACT_LIMITER: RateLimiter;
  /** Secret: clave de OpenAI. Se configura con `wrangler secret put OPENAI_API_KEY`. */
  OPENAI_API_KEY: string;
  /** Secret: clave de Resend para el formulario de contacto. */
  RESEND_API_KEY: string;
  /**
   * Remitente del formulario, ej: "SynQ Corporation <hola@tudominio.com>".
   * Se define en wrangler.jsonc. Su dominio debe estar verificado en Resend.
   * Si falta, el Worker cae al remitente de prueba, que solo entrega al
   * dueño de la cuenta de Resend.
   */
  CONTACT_FROM?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
