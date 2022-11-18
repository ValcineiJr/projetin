import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProductContextProvider } from "./contexts/ProductContext";
import { AppRoutes } from "./rotas";
import Global from "./styles/global";

function App() {
  return (
    <div className="App">
      <Global />
      <PayPalScriptProvider
        options={{
          "client-id":
            "AYSMJDzOxB14_vnwc1Zf80SrqvHW7nhZX5D2GXIOr92c8oNpySOXZUT8IA0VMCbGPOmIWZ91NF5CZbtS",
          currency: "BRL",
        }}
      >
        <AuthContextProvider>
          <ProductContextProvider>
            <AppRoutes />
          </ProductContextProvider>
        </AuthContextProvider>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
