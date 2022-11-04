import React, { useState } from "react";
import Layout from "../Layout";

import { Container } from "./styles";

const Categorias: React.FC = () => {
  const [products, setProducts] = useState([1, 2, 3, 4]);

  return (
    <Layout>
      <Container>
        <h1>Notebooks</h1>
        <div className="wrapper">
          <div className="products">
            {products.map((item) => (
              <div className="product">
                <div className="square">
                  <img src={require("../../assets/img/banner1.jpg")} alt="" />
                </div>

                <p className="title">
                  Monitor Acer 19.5' LED, HD, HDMIVGA, VESA, Acer ComfyView -
                  V206HQL Abi
                </p>
                <div className="price">
                  <span>R$: 1.250,00</span>
                  <a href="">Veja mais</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Categorias;
