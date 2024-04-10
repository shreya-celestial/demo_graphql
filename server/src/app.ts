import express from "express";
import dotenv from "dotenv";
import { createSchema, createYoga } from 'graphql-yoga';
import jwt from "jsonwebtoken";
import { typeDef } from "./gql/typeDef";
import { queryResolver } from "./gql/queryResolver";
dotenv.config()

const app = express();
app.use(express.json());

const yoga = createYoga({
  context({req, res}:any){
    // console.log(req.headers)
    // console.log(req.body.variables)
    // const key = process.env.CRYPTO_HASH_KEY || ''
    // jwt.verify(req.headers.authorization.split(' ')[1], key, (err:any,data:any)=>{
      
    // })
    
    return {
      access: 'granted'
    }
  },
  schema: createSchema({
    typeDefs: typeDef,
    resolvers: {
      Query: queryResolver
    }
  }),
})

app.use('/graphql',yoga)

app.listen(8080, ()=>{
  console.log('listening at http://localhost:8080/graphql')
})
