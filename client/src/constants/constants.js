export const serverUrl = 'http://localhost:8080/graphql'

export const MAKE_QUERY = `
  query MyQuery($gqlQuery: String!, $queryName:String!, $queryVars:String!) {
    someQuery(gqlQuery:$gqlQuery, queryName: $queryName, queryVars:$queryVars)
  }
`;