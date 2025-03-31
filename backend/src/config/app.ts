import { config } from 'dotenv';
import { Application, Router } from 'oak';
import { oakCors } from 'cors';
import { errorHandler } from '../utils/api/error.ts';
import { logger } from '../utils/logger.ts';
import { authRoutes } from '../routes/v1/auth.ts';
import { bookRoutes } from '../routes/v1/books.ts';
import { docsRoutes } from '../routes/docs.ts';

config({ export: true });

const app = new Application();
const router = new Router();

app.use(oakCors());
app.use(logger);
app.use(errorHandler);

router.use('/api/v1/auth', authRoutes.routes(), authRoutes.allowedMethods());
router.use('/api/v1/books', bookRoutes.routes(), bookRoutes.allowedMethods());
router.use('/docs', docsRoutes.routes(), docsRoutes.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
