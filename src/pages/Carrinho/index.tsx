import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

import { Container } from "./styles";
import { calculate_shipping } from "../../utils/calculateFrete";

const Carrinho: React.FC = () => {
  const {
    cart,
    increaseItemCartQuantity,
    decreaseItemCartQuantity,
    removeItemFromCart,
    totalCartValue,
    frete,
  } = useProduct();

  function percentage(percent: number, total: number) {
    return (percent / 100) * total;
  }

  return (
    <Layout>
      <Container>
        <div className="wrapper">
          <section>
            <div className="header">
              <h1
                onClick={() => {
                  const t = calculate_shipping(32, 2);
                  console.log(t);
                }}
              >
                Carrinho de compras
              </h1>

              <p className="preci-text">Preço</p>
            </div>
            {cart?.map((item) => {
              return (
                <div className="item">
                  <div className="separator">
                    <div className="img-product">
                      <img src={item.product_image} alt="product" />
                    </div>
                    <div className="info">
                      <p className="name-product">{item.name}</p>
                      <div className="options">
                        <label htmlFor="">Qtd: </label>
                        <button onClick={() => decreaseItemCartQuantity(item)}>
                          <HiChevronLeft className="icon" />
                        </button>
                        <input
                          type="numeric"
                          readOnly
                          value={item.quantity}
                          placeholder="1"
                        />
                        <button onClick={() => increaseItemCartQuantity(item)}>
                          <HiChevronRight className="icon" />
                        </button>
                        <button onClick={() => removeItemFromCart(item)}>
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="price">
                    {formatter.format(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </section>
          <aside>
            <div className="resumo">
              <h2>RESUMO</h2>
              <div className="row">
                <span className="light">Valor dos produtos:</span>
                <span className="bold">{formatter.format(totalCartValue)}</span>
              </div>
              <div className="row">
                <span className="light">Frete:</span>
                <span className="bold">{formatter.format(frete)}</span>
              </div>
              <div className="row">
                <span className="light">Total à prazo:</span>
                <span className="bold">
                  {formatter.format(frete + totalCartValue)}
                </span>
              </div>
              {/* <div className="row">
                <span style={{ textAlign: "center" }} className="light">
                  (em até 10x de R$ 144,44 sem juros)
                </span>
              </div> */}
              <div className="pix">
                <span style={{ fontSize: "1.2rem" }} className="light">
                  Valor a vista no <span className="bold">Pix</span>
                </span>
                <span style={{ fontSize: "3rem" }} className="bold">
                  {formatter.format(
                    totalCartValue - percentage(10, totalCartValue)
                  )}
                </span>
                <span style={{ fontSize: "1.4rem" }} className="light">
                  (Economize:{" "}
                  <span className="bold">
                    {formatter.format(percentage(10, totalCartValue))}
                  </span>
                  )
                </span>
              </div>

              <button>Fechar pedido</button>
            </div>
            <div className="itens-recentes">
              <h2>Seus itens recentes</h2>
              <div className="recent-item">
                <div className="recent-img">
                  <img
                    src="https://m.media-amazon.com/images/I/315a4xhzShL._AC_AA180_.jpg"
                    alt="product"
                  />
                </div>
                <div className="recent-info">
                  <p>
                    Bomba De Ar Encher Pneu Bike Bicicleta Moto Bola Balão Forte
                  </p>
                  <p className="bold">R$ 6,50</p>
                  <button>Adicionar ao carrinho</button>
                </div>
              </div>
              <div className="recent-item">
                <div className="recent-img">
                  <Link to="/">
                    <img
                      src="https://m.media-amazon.com/images/I/315a4xhzShL._AC_AA180_.jpg"
                      alt="product"
                    />{" "}
                  </Link>
                </div>

                <div className="recent-info">
                  <Link to="/">
                    <p>
                      Bomba De Ar Encher Pneu Bike Bicicleta Moto Bola Balão
                      Forte
                    </p>
                  </Link>
                  <p className="bold">R$ 6,50</p>

                  <button>Adicionar ao carrinho</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default Carrinho;
