import React from "react";
import Layout from "../Layout";

import { Container } from "./styles";

const Produto: React.FC = () => {
  return (
    <Layout>
      <Container>
        <h1>Cadeira Gamer Terabyte razor, Reclinável</h1>
        <div className="info-container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diplomado-30e12.appspot.com/o/images%2FCadeira%20MaxRacer%201000x1000.jpg?alt=media&token=f47c3507-ff43-4d82-9b8b-fd6e10bfceee"
            alt=""
          />
          <div className="info">
            <div>
              <p className="bold">Descrição</p>
              <p>
                Aproveite o máximo de tempo nas suas jogatinas, ou no seu
                trabalho com esta cadeira da Terabyte, uma cadeira extremamente
                confortável de qualidade e preço inigualável. Torne-se o melhor
                em seus jogos usufruindo do conforto da cadeira gamer Terabyte.
              </p>
            </div>

            <div className="cart">
              <p> R$: 1.5999,99</p>

              <button>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
        <div className="bigger-desc">
          <p className="bold">Descrição</p>
          <textarea
            value="Aproveite o máximo de tempo nas suas jogatinas, ou no seu trabalho
              com esta cadeira da Terabyte, uma cadeira extremamente confortável
              de qualidade e preço inigualável. Torne-se o melhor em seus jogos
              usufruindo do conforto da cadeira gamer Terabyte."
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Produto;
