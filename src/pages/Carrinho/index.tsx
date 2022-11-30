import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

import { Container } from "./styles";
import { calculate_shipping } from "../../utils/calculateFrete";
import { useAuth } from "../../hook/useAuth";

const Carrinho: React.FC = () => {
  const {
    cart,
    increaseItemCartQuantity,
    decreaseItemCartQuantity,
    removeItemFromCart,
    totalCartValue,
    frete,
    recentItems,
    setCartToStorage,
    finishCheckout,
  } = useProduct();
  const { user } = useAuth();

  const navigate = useNavigate();

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
                <div key={item.id} className="item">
                  <div className="separator">
                    <div className="img-product">
                      <img src={item.product_image} alt="product" />
                    </div>
                    <div className="info">
                      <p className="name-product">{item.name}</p>
                      <div className="options">
                        <div className="separator">
                          <label htmlFor="">Quantidade: </label>
                          <button
                            onClick={() => decreaseItemCartQuantity(item)}
                          >
                            <HiChevronLeft className="icon" />
                          </button>
                          <input
                            type="numeric"
                            readOnly
                            value={item.quantity}
                            placeholder="1"
                          />
                          <button
                            onClick={() => increaseItemCartQuantity(item)}
                          >
                            <HiChevronRight className="icon" />
                          </button>
                        </div>

                        <button
                          className="exclude"
                          onClick={() => removeItemFromCart(item)}
                        >
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
                <span className="bold">
                  {totalCartValue === 0 ? 0 : formatter.format(frete)}
                </span>
              </div>
              <div className="row">
                <span className="light">Total:</span>
                <span className="bold">
                  {totalCartValue === 0
                    ? 0
                    : formatter.format(frete + totalCartValue)}
                </span>
              </div>
              {/* <div className="row">
                <span style={{ textAlign: "center" }} className="light">
                  (em até 10x de R$ 144,44 sem juros)
                </span>
              </div> */}
              {/* <div className="pix">
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
              </div> */}

              <button
                onClick={() => {
                  const itemsCompra = cart.map((item, index) => {
                    const n =
                      item.name.length >= 100
                        ? item.name.substring(1, 80)
                        : item.name;
                    return {
                      name: n,
                      unit_amount: {
                        value: String(item.price.toFixed(2)),
                        currency_code: "BRL",
                      },
                      quantity: String(item.quantity),
                    };
                  });

                  itemsCompra.push({
                    name: "frete",
                    unit_amount: {
                      value: String(frete),
                      currency_code: "BRL",
                    },
                    quantity: String(1),
                  });

                  let value = 0;
                  const discount = 0;
                  itemsCompra.map(
                    (item) =>
                      (value +=
                        Number(item.unit_amount.value) * Number(item.quantity))
                  );

                  const pc = [
                    {
                      shipping: {
                        address: {
                          address_line_1: `${user?.address} ${user?.numero}`,
                          address_line_2: user?.bairro,
                          admin_area_2: user?.cidade,
                          admin_area_1: user?.estado,
                          postal_code: user?.cep,
                          country_code: "BR",
                        },
                      },
                      amount: {
                        value: String((value - discount).toFixed(2)),

                        currency_code: "BRL",
                        breakdown: {
                          item_total: {
                            value: String(value.toFixed(2)),
                            currency_code: "BRL",
                          },
                          discount: {
                            value: String(discount.toFixed(2)),
                            currency_code: "BRL",
                          },
                        },
                      },
                      items: itemsCompra,
                    },
                  ];

                  navigate("/checkout", { state: { data: pc } });
                }}
                disabled={totalCartValue === 0 ? true : false}
              >
                Fechar pedido
              </button>
            </div>
            <div className="itens-recentes">
              <h2>Seus itens recentes</h2>
              {recentItems.map((item) => (
                <div className="recent-item">
                  <div className="recent-img">
                    <Link to={`/produto/${item.id}`} state={{ prod: item }}>
                      <img src={item.product_image} alt="product" />
                    </Link>
                  </div>
                  <div className="recent-info">
                    <p className="name">{item.name}</p>
                    <p className="bold">{formatter.format(item.price)}</p>
                    <button
                      onClick={() => {
                        if (user) {
                          setCartToStorage(item);
                        }
                      }}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default Carrinho;
