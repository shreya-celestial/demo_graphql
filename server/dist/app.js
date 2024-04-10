"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_yoga_1 = require("graphql-yoga");
const typeDef_1 = require("./gql/typeDef");
const queryResolver_1 = require("./gql/queryResolver");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const yoga = (0, graphql_yoga_1.createYoga)({
    context({ req, res }) {
        // console.log(req.headers)
        // console.log(req.body.variables)
        // const key = process.env.CRYPTO_HASH_KEY || ''
        // jwt.verify(req.headers.authorization.split(' ')[1], key, (err:any,data:any)=>{
        // })
        return {
            access: 'granted'
        };
    },
    schema: (0, graphql_yoga_1.createSchema)({
        typeDefs: typeDef_1.typeDef,
        resolvers: {
            Query: queryResolver_1.queryResolver
        }
    }),
});
app.use('/graphql', yoga);
app.listen(8080, () => {
    console.log('listening at http://localhost:8080/graphql');
});
