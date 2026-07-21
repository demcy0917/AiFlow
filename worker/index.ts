import { Hono } from 'hono';
import { chatRoute } from './routes/chat';
import { contactRoute } from './routes/contact';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.route('/api/chat', chatRoute);
app.route('/api/contact', contactRoute);

// Cualquier otra ruta bajo /api que no exista.
app.all('/api/*', (c) => c.json({ error: 'Ruta no encontrada' }, 404));

// Red de seguridad: si algo fuera de /api llegara al Worker, lo delegamos
// a los assets estáticos en vez de responder 404.
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
