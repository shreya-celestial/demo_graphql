import login from "../utils/login"
import signup from "../utils/signup"
import getData from "../utils/getData"

export const queryResolver = {
  async someQuery(_:any, args:any, context:any) {
    console.log(context.access)

    if(process.env.HASURA_KEY){
      args.queryVars = JSON.parse(args.queryVars)

      if(args.queryName === 'SignInUser')
      {
        const data = await login(args.queryVars)
        return JSON.stringify(data)
      }

      if(args.queryName === 'SignUpUser')
      {
        const data = await signup(args.queryVars, args.gqlQuery.toString())
        return JSON.stringify(data)
      }

      const graphql = {
        query: args.gqlQuery.toString(),
        variables: args.queryVars
      }
      const data = await getData(graphql)
      return JSON.stringify(data)

    }
    return null
  }
}