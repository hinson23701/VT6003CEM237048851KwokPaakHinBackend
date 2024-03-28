import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/user";
import { basicAuth } from "../controllers/authentication";


const router = new Router({ prefix: '/api/v1/users' });

const findByUsername = async (ctx: RouterContext, next: any) => {
  const username = ctx.params.username;
  const users = await model.findByUsername(username);
  if (users) {
    ctx.body = users;
  } else {
    ctx.status = 404;
  }
  await next();
};

const getAllUsers = async (ctx: RouterContext, next: any) => {
  const users = await model.getAllUsers();
  ctx.body = users;
  await next();
};

//Add User
const addUser = async (ctx: RouterContext, next: any) => {
  const user = ctx.request.body;
  const result = await model.addUser(user);
  if (result.status === 201) {
    ctx.status = 201;
  } else {
    ctx.status = 500;
  }
  await next();
};

//Update User Info
const updateUser = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  const user = ctx.request.body;
  const result = await model.updateUser(id, user);
  if (result.status === 200) {
    ctx.status = 200;
  } else {
    ctx.status = 500;
  }
  await next();
};

//Delete user
const deleteUser = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  const result = await model.deleteUser(id);
  if (result.status === 200) {
    ctx.status = 200;
  } else {
    ctx.status = 500;
  }
  await next();
};

router.get('/:username', findByUsername);
router.get('/', getAllUsers);
router.post('/', bodyParser(), addUser);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateUser);
router.delete('/:id([0-9]{1,})', basicAuth, deleteUser);

export { router };

