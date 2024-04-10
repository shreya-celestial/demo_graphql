import getData from "./getData";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const login = async (inputVars: any) => {
  const query = `
    query MyQuery($email: String, $limit: Int) {
      user(where: {email: {_eq: $email}}, limit: $limit) {
        email
        id
        name
        password
      }
    }       
  `;

  const queryVars = {
    email: inputVars?.email,
    limit: 1
  }
  const graphql = {
    query: query,
    variables: queryVars
  }

  const response = await getData(graphql)
  const key = process.env.CRYPTO_HASH_KEY || ''
  const decryptPass = CryptoJS.AES.decrypt(response?.data?.user[0]?.password, key)

  if(decryptPass.toString(CryptoJS.enc.Utf8) === inputVars?.password)
  {
    const token = jwt.sign({user:inputVars}, key)
    return {
      status: 'success',
      message: 'access granted!',
      token: token,
      data: response?.data?.user[0]
    }
  }
  
  return {
    status: 'error',
    message: 'Invalid credentials'
  }

}

export default login