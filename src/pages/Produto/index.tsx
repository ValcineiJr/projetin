import React from "react";

import Editor from "../../componentes/Editor";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";

import Layout from "../Layout";

import { Container } from "./styles";

const Produto: React.FC = () => {
  const { product, setCartToStorage } = useProduct();

  function handleAddToCart() {
    setCartToStorage(product);
  }

  // console.log(product?.description.slice(0, 5));

  return (
    <Layout>
      <Container>
        <h1>{product?.name}</h1>
        <div className="info-container">
          <img src={product?.product_image} alt="" />
          <div className="info">
            <div className="separator">
              <p className="bold">Descrição</p>
              <div className="min-desc">
                <Editor initialValue={product?.description?.slice(0, 3)} />
              </div>
            </div>

            <div className="cart">
              <p> {formatter.format(product!.price)}</p>

              <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
        <div className="bigger-desc">
          <p className="bold">Descrição do produto</p>
          <Editor initialValue={product?.description} />
        </div>
      </Container>
    </Layout>
  );
};

export default Produto;
