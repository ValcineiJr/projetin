import { AuthContextProvider } from "./contexts/AuthContext";
import { ProductContextProvider } from "./contexts/ProductContext";
import { AppRoutes } from "./rotas";
import Global from "./styles/global";

function App() {
  return (
    <div className="App">
      <Global />
      <AuthContextProvider>
        <ProductContextProvider>
          <AppRoutes />
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
