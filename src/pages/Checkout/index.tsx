import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";

import { Container } from "./styles";
import { useAuth } from "../../hook/useAuth";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { useTheme } from "styled-components";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { colors } = useTheme();
  const { cart, frete, totalCartValue, freteDate, finishCheckout } =
    useProduct();
  const [paidFor, setPaidFor] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  async function handleApprove(orderID: any) {
    setPaidFor("success");
    setMessage(
      "Compra realizada com sucesso, você será redirecionado para página principal"
    );
    setColor(colors.success);

    async function redirect() {
      const response = await finishCheckout();
      if (response) {
        navigate("/");
      }
    }

    setTimeout(redirect, 2000);
  }

  return (
    <Layout>
      <Container>
        <div className="wrapper">
          <section>
            <div className="box">
              <span className="number">1</span>
              <span
                className="title"
                onClick={async () => await finishCheckout()}
              >
                Endereço de entrega
              </span>
              <div className="info">
                <p>{user?.name}</p>
                <p>{user?.address}</p>
                <p>{user?.numero}</p>
                <p>{user?.bairro}</p>
                <p>
                  {user?.cidade}, {user?.estado} {user?.cep}
                </p>
              </div>
            </div>

            <div className="cart">
              <div className="header">
                <span className="number">2</span>
                <span className="title">Revisar itens e envio</span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="item">
                  <div className="item-img">
                    <img src={item.product_image} alt="" />
                  </div>
                  <div className="info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">
                      {formatter.format(item.price)}
                    </div>
                    <input
                      type="numeric"
                      readOnly
                      value={item.quantity}
                      placeholder="1"
                    />
                  </div>
                </div>
              ))}

              <div className="frete">Entrega estimada: {freteDate}</div>
            </div>
          </section>
          <aside>
            <div className="finish">
              <div className="button">
                <PayPalButtons
                  disabled={paidFor === "success" ? true : false}
                  style={{
                    color: "silver",
                    label: "buynow",
                    layout: "horizontal",

                    tagline: false,
                    shape: "pill",
                    height: 40,
                  }}
                  createOrder={async (data, actions) => {
                    return actions.order.create({
                      purchase_units: location.state.data,
                      application_context: {
                        shipping_preference: "SET_PROVIDED_ADDRESS",
                        brand_name: "ScreedGames",
                      },
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log(order);

                    handleApprove(order);
                  }}
                  onError={(err) => {
                    console.log("Checkout Error: ", err);

                    setMessage(
                      "Ocorreu um erro ao realizar o checkout. Por favor, tente novamente"
                    );
                    setColor(colors.error);
                    setPaidFor("error");
                  }}
                  onCancel={() => {
                    setMessage("Operação cancelada.");
                    setColor(colors.warning);
                    setPaidFor("cancel");
                  }}
                  onClick={(data, actions) => {
                    // actions.reject();
                    // actions.resolve();
                  }}
                />
              </div>
              <div className="resumo">
                <p>Resumo do pedido</p>
                <div className="row">
                  <span className="ligh">Itens:</span>
                  <span className="ligh">
                    {formatter.format(totalCartValue)}
                  </span>
                </div>
                <div className="row">
                  <span className="ligh">Frete:</span>
                  <span className="ligh">{formatter.format(frete)}</span>
                </div>
              </div>
              <div className="total">
                <div className="row">
                  <span className="ligh">Total do pedido:</span>
                  <span className="ligh">
                    {formatter.format(totalCartValue + frete)}
                  </span>
                </div>
              </div>
            </div>
            {message !== "" && (
              <div style={{ backgroundColor: color }} className="result">
                <p>{message}</p>
                {paidFor === "sucess" && <AiFillCheckCircle size={30} />}
                {paidFor === "error" && <AiFillCloseCircle size={30} />}
                {paidFor === "cancel" && <AiFillExclamationCircle size={30} />}
              </div>
            )}
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default Checkout;
