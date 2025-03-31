import { Context } from "https://deno.land/x/oak@v12.6.0/mod.ts";

export function logger(ctx: Context, next: () => Promise<unknown>) {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });
}
