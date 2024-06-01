import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/dogs";
import { basicAuth } from "../controllers/authentication";
import { validateDog } from "../controllers/validation";


const router = new Router({ prefix: "/api/v1/dogs" });



const getAll = async (ctx: RouterContext, next: any) => {
  const { limit = 100, page = 1, order = "dateCreated", direction = 'ASC' } = ctx.request.query;
  const parsedLimit = parseInt(limit as string, 10);
  const parsedPage = parseInt(page as string, 10);
  const result = await model.getDogs(parsedLimit, parsedPage, order, direction);
  if (result.length) {
    const body: Dog[] = result.map((dog: any) => {
      const { id = 0, name = "", breed = "", age = 0, imageUrl = "", description = "" }: Partial<Dog> = dog;
      const links = {
        self: `http://${ctx.host}/api/v1/dogs/${dog.id}`,
      };
      return { id, name, breed, age, imageUrl, description, links };
    });
    ctx.body = body;
  }
  await next();
};

const createDog = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  let result = await model.addDog(body);
  if (result.status === 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "Failed to insert data" };
  }
  await next();
};

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let dog = await model.getDogById(id);
  if (dog.length) {
    ctx.body = dog[0];
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
  await next();
};

const updateDog = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let c: any = ctx.request.body;
  let result = await model.updateDog(c, id);
  if (result) {
    ctx.status = 201;
    ctx.body = `Dog with id ${id} updated`;
  }
  await next();
};

const deleteDog = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let dog: any = await model.deleteDogById(id);
  ctx.status = 201;
  ctx.body = dog.affectedRows ? { message: "removed" } : { message: "error" };
  await next();
};

router.get("/", getAll);
router.post("/", basicAuth, bodyParser(), validateDog, createDog);
router.get("/:id([0-9]{1,})", getById);
router.put("/:id([0-9]{1,})", basicAuth, bodyParser(),validateDog, updateDog);
router.del("/:id([0-9]{1,})", deleteDog);
export { router };