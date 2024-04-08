import Router, { RouterContext } from "koa-router";
import { basicAuth } from "../controllers/authentication";

const router = new Router({ prefix: '/api/v1' });

//Testing
router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Public API return'
  };
  await next();
})

//Proctected route that requires authentication
router.get("/private", basicAuth);

export { router };