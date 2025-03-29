import { Context } from 'oak';

export function logger(ctx: Context, next: () => Promise<unknown>) {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });
}
