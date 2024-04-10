"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResolver = void 0;
exports.queryResolver = {
    someQuery(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(context.access);
            console.log(args.queryName);
            const graphql = JSON.stringify({
                query: args.gqlQuery.toString(),
                variables: JSON.parse(args.queryVars)
            });
            if (process.env.HASURA_KEY) {
                const res = yield fetch('https://funky-meerkat-27.hasura.app/v1/graphql', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-hasura-admin-secret': process.env.HASURA_KEY
                    },
                    body: graphql
                });
                const data = yield res.json();
                return JSON.stringify(data);
            }
            return null;
        });
    }
};
