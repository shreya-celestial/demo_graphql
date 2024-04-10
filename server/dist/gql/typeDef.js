"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = void 0;
exports.typeDef = `
  type Query {
    someQuery(gqlQuery: String!, queryName: String!, queryVars: String!): String!
  }
`;
