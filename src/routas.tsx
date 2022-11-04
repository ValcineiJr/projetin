import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import Cadastro from "./pages/Cadastro";
import Conta from "./pages/Conta";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Conta />} />
      </Routes>
    </Router>
  );
}
