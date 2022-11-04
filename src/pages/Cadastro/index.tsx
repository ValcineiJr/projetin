import React from "react";
import Layout from "../Layout";

import { Container } from "./styles";

const Cadastro: React.FC = () => {
  return (
    <Layout>
      <Container>
        <form>
          <img src={require("../../assets/img/logo.png")} alt="" />
          <h1>Cadastro</h1>
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

export default Cadastro;
