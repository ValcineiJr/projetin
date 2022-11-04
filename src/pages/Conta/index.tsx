import React from "react";
import Layout from "../Layout";

import { Container } from "./styles";

const Conta: React.FC = () => {
  return (
    <Layout>
      <Container>
        <form>
          <a type="submit">Histórico de pedidos</a>
          <h1>Minha conta</h1>
          <div className="row">
            <input type="text" placeholder="Usuário" />
            <input type="text" placeholder="Email" />
          </div>
          <div className="row">
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirmar senha" />
          </div>
          <div className="row">
            <input type="text" placeholder="Endereço" />
          </div>
          <div className="row">
            <input type="number" placeholder="Telefone" />
            <input type="date" placeholder="data" />
          </div>
          <div className="row">
            <input type="text" placeholder="Cpf" />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default Conta;
