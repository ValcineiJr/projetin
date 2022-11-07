import { AuthContextProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./rotas";
import Global from "./styles/global";

function App() {
  return (
    <div className="App">
      <Global />
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
