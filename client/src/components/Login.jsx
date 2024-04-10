import { MAKE_QUERY, serverUrl } from "../constants/constants";
import { request } from "graphql-request";
import { useMutation } from "@tanstack/react-query"

const Login = () => {

  const { mutate } = useMutation({
    mutationFn: async (queryVariables) => {
      return await request(
        serverUrl,
        MAKE_QUERY,
        {
          gqlQuery: '',
          queryName: 'SignInUser',
          queryVars: queryVariables
        }
      )
    },
    onSuccess: (response) => {
      console.log(JSON.parse(response.someQuery))
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = JSON.stringify({
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    })
    mutate(variables)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <button>Submit</button>
    </form>
  );
}

export default Login;