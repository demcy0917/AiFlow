import type { Context, MiddlewareHandler } from 'hono';
import type { Env, RateLimiter } from './types';

/**
 * Limita peticiones por IP usando el rate limiter nativo de Workers.
 * No usa KV: el conteo vive en el borde, sin costo de escrituras.
 */
export function rateLimit(
  pick: (env: Env) => RateLimiter,
  message: string
): MiddlewareHandler<{ Bindings: Env }> {
  return async (c: Context<{ Bindings: Env }>, next) => {
    const limiter = pick(c.env);

    // En algunos entornos de desarrollo el binding no existe: no bloqueamos.
    if (!limiter?.limit) return next();

    const ip = c.req.header('CF-Connecting-IP') ?? 'desconocido';
    const { success } = await limiter.limit({ key: ip });

    if (!success) {
      return c.json({ error: message }, 429);
    }

    return next();
  };
}
