import Koa from "koa";
import  { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from "koa-passport";
import cors from '@koa/cors';

import { router as dogs } from "./routes/dogs";
import { router as special } from './routes/special';
import { router as users } from './routes/users';

import serve from 'koa-static-folder';

const app: Koa = new Koa();
//const router: Router = new Router();

/*const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = { message: "Welcome to The Dog Shelter API!" };
  await next();
}

//End-point
router.get('/api/v1', welcomeAPI);*/
app.use(cors());

//For Document:
app.use(serve('./docs'));

app.use(logger());
app.use(json());
app.use(passport.initialize());
//app.use(router.routes());
app.use(cors());

app.use(users.routes());
app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = { err: "Resources not found" };
    }
  } catch (err: any) {
    ctx.body = { err: err };
  }
})

app.listen(10888);