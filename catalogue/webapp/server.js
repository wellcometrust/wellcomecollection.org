const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const Cookies = require('cookies');
const { initialize, isEnabled } = require('@weco/common/services/unleash/feature-flags');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.argv[2] || 3000;

function getFlags(ctx, next) {
  const cookies = new Cookies(ctx.req, ctx.res);
  const cohort = cookies.get('WC_featuresCohort');
  ctx.flags = {
    apiV2: isEnabled('apiV2', { cohort })
  };
  return next();
}

function setCohort(ctx, next) {
  const cohort = ctx.query.cohort;
  if (cohort) {
    const cookies = new Cookies(ctx.req, ctx.res);
    cookies.set('WC_featuresCohort', cohort);
  }
  return next();
}

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  const instance = initialize({
    appName: 'works'
  });

  try {
    await new Promise((resolve, reject) => {
      instance.on('ready', async () => {
        resolve(true);
      });
      instance.on('error', async () => {
        reject(new Error('unleash: unable to initialize unleash'));
      });
    });
  } catch (e) {
    // TODO: We don't want to not start the app here
    // but we should report to sentry.
    console.error(e);
  }

  // Feature flags
  server.use(setCohort);
  server.use(getFlags);

  // Next routing
  router.get('/embed/works/:id', async ctx => {
    const {flags} = ctx;
    await app.render(ctx.req, ctx.res, '/embed', {
      id: ctx.params.id,
      flags
    });
    ctx.respond = false;
  });

  router.get('/works/:id', async ctx => {
    const {flags} = ctx;
    await app.render(ctx.req, ctx.res, '/work', {
      page: ctx.query.page,
      query: ctx.query.query,
      id: ctx.params.id,
      flags
    });
    ctx.respond = false;
  });

  router.get('/works', async ctx => {
    const {flags} = ctx;
    await app.render(ctx.req, ctx.res, '/works', {
      page: ctx.query.page,
      query: ctx.query.query,
      flags
    });
    ctx.respond = false;
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> ${process.env.NODE_ENV || 'development'} ready on http://localhost:${port}/works`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
