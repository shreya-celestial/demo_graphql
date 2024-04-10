import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App = () => {

  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Login />
      <SignUp />
    </QueryClientProvider>
  );
}

export default App;