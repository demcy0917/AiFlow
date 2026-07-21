import { Hono } from 'hono';
import { SYSTEM_PROMPT } from '../prompt';
import { rateLimit } from '../rateLimit';
import type { ChatMessage, Env } from '../types';

/** Topes para que nadie use nuestra llave de OpenAI como API propia. */
const MAX_MESSAGES = 24;
const MAX_CHARS = 1500;

export const chatRoute = new Hono<{ Bindings: Env }>();

chatRoute.use(
  '*',
  rateLimit(
    (env) => env.CHAT_LIMITER,
    'Vas muy rápido. Esperá unos segundos y seguimos.'
  )
);

chatRoute.post('/', async (c) => {
  if (!c.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY no está configurada');
    return c.json({ error: 'El asesor no está disponible en este momento.' }, 503);
  }

  let body: { messages?: unknown };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Petición inválida.' }, 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return c.json({ error: 'Petición inválida.' }, 400);
  }

  if (messages.length > MAX_MESSAGES) {
    return c.json(
      { error: 'Esta conversación ya está muy larga. Sigamos por WhatsApp para no perder el hilo.' },
      400
    );
  }

  const valid = messages.every(
    (m): m is ChatMessage =>
      typeof m === 'object' &&
      m !== null &&
      (m as ChatMessage).role !== undefined &&
      ['user', 'assistant'].includes((m as ChatMessage).role) &&
      typeof (m as ChatMessage).content === 'string' &&
      (m as ChatMessage).content.length <= MAX_CHARS
  );

  if (!valid) {
    return c.json({ error: 'Mensaje demasiado largo o con formato inválido.' }, 400);
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${c.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('OpenAI respondió', res.status, detail);
      return c.json({ error: 'No pude procesar tu mensaje. Intentá de nuevo.' }, 502);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return c.json({ error: 'No pude procesar tu mensaje. Intentá de nuevo.' }, 502);
    }

    return c.json({ reply });
  } catch (err) {
    console.error('Error llamando a OpenAI', err);
    return c.json({ error: 'No pude procesar tu mensaje. Intentá de nuevo.' }, 502);
  }
});
