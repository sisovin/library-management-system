// Load environment variables first
import "./config/env.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { errorHandler } from './utils/api/error.ts';
import { logger } from './utils/logger.ts';
import { connectToDatabase } from "./db/client.ts"; 
import authRoutes from './routes/v1/auth.ts';
import bookRoutes from './routes/v1/books.ts';
import docsRoutes from './routes/docs.ts';

// Connect to the database before starting the server
await connectToDatabase();

const app = new Application();
const router = new Router();

app.use(oakCors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(logger);
app.use(errorHandler);

// Fix: Use the routes directly instead of router.use
app.use(authRoutes.prefix('/api/v1/auth').routes());
app.use(authRoutes.allowedMethods());

app.use(bookRoutes.prefix('/api/v1/books').routes());
app.use(bookRoutes.allowedMethods());

app.use(docsRoutes.prefix('/docs').routes());
app.use(docsRoutes.allowedMethods());

// Alternative approach if the above doesn't work
// router.get('/api/v1/auth', (ctx) => {
//   ctx.response.status = 308;
//   ctx.response.headers.set('Location', '/api/v1/auth/');
// });
// router.get('/api/v1/books', (ctx) => {
//   ctx.response.status = 308;
//   ctx.response.headers.set('Location', '/api/v1/books/');
// });
// router.get('/docs', (ctx) => {
//   ctx.response.status = 308;
//   ctx.response.headers.set('Location', '/docs/');
// });

// app.use(authRoutes.routes());
// app.use(authRoutes.allowedMethods());
// app.use(bookRoutes.routes());
// app.use(bookRoutes.allowedMethods());
// app.use(docsRoutes.routes());
// app.use(docsRoutes.allowedMethods());

// app.use(router.routes());
// app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`Server running on http://localhost:${port}`);

await app.listen({ port });