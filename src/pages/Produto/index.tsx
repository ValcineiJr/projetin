import { info } from "console";
import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "styled-components";

import Editor from "../../componentes/Editor";
import { Product } from "../../contexts/ProductContext";
import { useAuth } from "../../hook/useAuth";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";

import Layout from "../Layout";

import { Container } from "./styles";

const Produto: React.FC = () => {
  const { setCartToStorage, addItemsToRecents } = useProduct();
  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");
  const { user } = useAuth();
  const location = useLocation();
  const { colors } = useTheme();
  const product: Product = location.state.prod;
  const outStock = product?.quantity === 0;

  function handleAddToCart() {
    if (user) {
      setCartToStorage(product);
      setMessage("Item adicionado ao carrinho som sucesso.");
      setMessageColor(colors.success);
    } else {
      setMessage("Precisa estar logado para adicionar um item ao carrinho.");
      setMessageColor(colors.error);
    }
  }

  React.useEffect(() => {
    if (product.quantity > 0) {
      addItemsToRecents(product);
    }
  }, []);

  // console.log(product?.description.slice(0, 5));

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <div className="wrapper">
          <h1>{product?.name}</h1>
          <div className="info-container">
            <div className="img">
              <img src={product?.product_image} alt="" />
              {outStock && (
                <img
                  className="estoque"
                  src={require("../../assets/img/estoque.png")}
                  alt=""
                />
              )}
            </div>

            <div className="info">
              <div className="separator">
                <p className="bold">Descrição</p>
                <div className="min-desc">
                  <Editor initialValue={product?.description?.slice(0, 6)} />
                </div>
              </div>

              <div className="cart">
                <p> {formatter.format(product!.price)}</p>

                <button
                  disabled={outStock ? true : false}
                  onClick={handleAddToCart}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
          <div className="bigger-desc">
            <p className="bold">Descrição do produto</p>
            <Editor initialValue={product?.description} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Produto;
