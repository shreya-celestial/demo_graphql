import { useMutation } from "@tanstack/react-query"
import { gql, request } from "graphql-request";
import { MAKE_QUERY, serverUrl } from "../constants/constants";

const SignUp = () => {

  const signUpQuery = gql`
    mutation SignUpUser($email: String, $name: String , $password: String) {
      insert_user(objects: {email: $email, name: $name, password: $password}) {
        returning {
          email
          id
          name
          password
        }
      }
    }
  `

  const { mutate } = useMutation({
    mutationFn: async (queryVariables) => {
      return await request(
        serverUrl,
        MAKE_QUERY,
        {
          gqlQuery: signUpQuery,
          queryName: 'SignUpUser',
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
      name: e.target.elements.name.value,
      password: e.target.elements.password.value
    })
    mutate(variables)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input type="text" placeholder="name" name="name" required />
      <input type="email" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <button>Submit</button>
    </form>
  );
}

export default SignUp;