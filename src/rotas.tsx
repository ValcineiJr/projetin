import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Cadastro from "./pages/Cadastro";
import Conta from "./pages/Conta";
import Login from "./pages/Login";
import EsqueciASenha from "./pages/EsqueciASenha";
import CadastroProduto from "./pages/CadastroProduto";
import CadastroFuncionario from "./pages/CadastroFuncionario";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Estoque from "./pages/Estoque";
import EditarProduto from "./pages/EditarProduto";
import Checkout from "./pages/Checkout";
import History from "./pages/History";

import Painel from "./pages/Painel/Home";
import PainelLogin from "./pages/Painel/Login";
import PainelOrders from "./pages/Painel/Orders";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:category" element={<Categorias />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/perfil" element={<Conta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-a-senha" element={<EsqueciASenha />} />
        <Route path="/cadastro/produto" element={<CadastroProduto />} />
        <Route path="/cadastro/funcionario" element={<CadastroFuncionario />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/editar/produto/:id" element={<EditarProduto />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<History />} />

        <Route path="/painel" element={<Painel />} />
        <Route path="/painel/login" element={<PainelLogin />} />
        <Route path="/painel/orders" element={<PainelOrders />} />
      </Routes>
    </Router>
  );
}
