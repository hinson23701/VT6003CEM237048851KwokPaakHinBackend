import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/dogs';
import request from 'supertest';
import { describe,test,expect } from '@jest/globals';

const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);


describe( 'a simple api endpoint', () => {

  test('Get all Dog', async () => {
    const result = await request(app.callback()).get('/api/v1/dogs')
    expect(result.statusCode).toEqual(200)
  })
  test('Post an Dog', async () => {
    const result = await request(app.callback()).post('/api/v1/dogs')
        .set("Authorization", "Basic Ym9iOjY1NDMyMQ==")
        .send({
           "name": "brownie", 
          "breed": "toy poodle", 
          "age": 6, 
          "gender": "male",
          "size" : "small",
          "description": "",
          "imageurl": "https://images.dog.ceo/breeds/poodle-toy/n02113624_2609.jpg", 
          "location" : "Hong Kong",
          "userID": 1
       });         
    expect(result.statusCode).toEqual(201);
  })
  })