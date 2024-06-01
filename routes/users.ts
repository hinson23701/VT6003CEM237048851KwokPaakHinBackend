import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/user";
import { basicAuth } from "../controllers/authentication";
import { validateUser } from "../controllers/validation";


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
  const users = await model.getAll();
  ctx.body = users;
  await next();
};

//Add User
const addUser = async(ctx: any, next: any) =>{
  const body = ctx.request.body;
    let avatarurl:string=' '
    if(body.avatarurl)
      avatarurl=body.avatarurl;
    let username:string= body.username;
    let password:string = body.password;
    let email:any = body.email;
    let role:string = 'user';
    let secretkey:string = body.actiCode;
    let secretList:string[]= ["mongkok_123456789", "mongkok_987654321","shatin_123456789","shatin_987654321","chaiwan_123456789","chaiwan_987654321" ]
     if(secretkey)
     {for(let i=0;i<secretList.length;i++)
       if(secretkey==secretList[i])
       {role='admin'
        break;
       }
     }
    console.log("role ", role)
    let newUser = {username: username, password: password, email: email, avatarurl: avatarurl, role: role};

  let result = await model.add(newUser);
  if (result) {
    ctx.status = 201;
    ctx.body = result;
  } else {
    ctx.status = 201;
    ctx.body = "{message:New user created}";
  }
}

//Update User Info
const updateUser = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  const user = ctx.request.body;
  const result = await model.update(id, user);
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
  const result = await model.deleteById(id);
  if (result.status === 200) {
    ctx.status = 200;
  } else {
    ctx.status = 500;
  }
  await next();
};

router.get('/:username', findByUsername);
router.get('/', getAllUsers);
router.post('/', bodyParser(),validateUser, addUser);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(),validateUser, updateUser);
router.delete('/:id([0-9]{1,})', basicAuth, deleteUser);

export { router };

