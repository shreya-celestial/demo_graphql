import CryptoJS from "crypto-js";
import getData from "./getData";

const signup = async (inputVars: any, query: string) => {
  const key = process.env.CRYPTO_HASH_KEY || ''
  const encryptedPass = CryptoJS.AES.encrypt(inputVars?.password, key)
  inputVars.password = encryptedPass.toString()

  const graphql = {
    query: query,
    variables: inputVars
  }

  const data = await getData(graphql)
  return data
}

export default signup;