import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
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
  const [oderID, setOrderID] = useState("");
  const [emailCartList, setEmailCartList] = useState<any>();
  const form: any = React.useRef();
  const cartCopy = cart;

  async function redirect() {
    navigate("/");
  }

  async function handleApprove(order: any) {
    const created_at: string = order.create_time.substring(0, 10);
    const orderID = order.id;

    setPaidFor("success");
    setMessage(
      "Compra realizada com sucesso, agora você pode acompanhar o seu pedido indo no seu perfil e em histórico de pedidos."
    );
    sendEmail();
    await finishCheckout(created_at);
    setColor(colors.success);
    setOrderID(orderID);

    setTimeout(redirect, 3000);
  }

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_dd5zm9p",
        "template_l4v9gbm",
        form.current,
        "FyEXAKLyijk9VSCuU"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const header = `
    <header style=' width:100%;'>
      <div style='height:150px; width:100%;' > 
        <img  style='display: block; margin-left: auto; margin-right: auto; height:100%;' src='https://i.imgur.com/DswSNN2.jpg' />
      </div>
          
      <div style='padding-top:50px; height:100px; background-image: linear-gradient(90deg, #020024, #070561, #0e0eb8, #09087d); color:white; font-size:28px; text-align:center; font-family:Arial;'>
        Compra realizada com sucesso :)
      </div>
    </header>
      <p style='font-size:14px; font-family:Arial;'>Olá <span style='font-weight:bold; color:#1f1f1f;'>${user?.name}!!</span></p>
      <p style='font-size:14px; font-family:Arial; color:#1f1f1f;'>Recebemos o seu pedido <span style='font-weight:bold;'>${oderID}.</span>  </p>
        `;

    const body =
      '<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">' +
      ` <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">      
        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">  
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
        <tbody>    
        <tr>
        <td align="left" style="font-size:0px;padding:0 10px;word-break:break-word">

        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Arial;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none">
        <tbody><tr style="border-bottom:1px solid #e5e5e5">
        <th width="85%" align="left" style="padding-bottom:5px">Itens do pedido</th>
        <th width="15%" style="padding-bottom:5px">Quantidade.</th>
        </tr>
                  
  ` +
      cart
        .map(function (item) {
          return `
        <tr style="border-bottom:1px solid #e5e5e5">
        <td> 
        <table>
        <tbody>
        <tr>
        <td width="52px" height="52px" style="padding:10px 0">
        <img src='${item.product_image}' style="width:52px;height:52px;border:1px solid #e8e8e8"></img>
        </td>
        <td width="4px"></td>
        <td>
        <span style="font-weight:bold;color:#1f1f1f;text-decoration:none;line-height:1">
        ${item.name}
        </span>
        </td>
        </tr>
        </tbody></table>
        </td>
        <td align="center">${item.quantity}</td>
        </tr>
        `;
        })
        .join("") +
      `</tbody></table>

        </td>
        </tr>

        </tbody>
        </table>

        </div>


        </td>
        </tr>
        </tbody>
        </table>`;

    const footer = `
    <p style='font-size:22px; '>Informações do pagamento</p>
    <p style='font-size:14px; '>Frete: ${formatter.format(frete)}</p>
    <p style='font-size:14px; '>Total: ${formatter.format(
      totalCartValue + frete
    )}</p>
    
    Agradecemos por comprar conosco! <br />
    Recebemos o seu pedido, este é o código para que você possa acompanhar ele.  <br />

        Você também pode acompanhar o seu pedido ao efetuar o login no site <br /> <a href='https://screedgames.netlify.app' target='_blank'>https://screedgames.netlify.app</a> <br /> ir no seu perfil e em histórico de pedidos.</span>`;

    const container =
      `<div style='margin:0 auto; width:100%; max-width:600px;'>` +
      header +
      body +
      footer +
      `</div>`;
    setEmailCartList(container);
  }, []);

  // const testList = "";

  return (
    <Layout>
      <Container>
        <div className="wrapper">
          <form ref={form} onSubmit={sendEmail} style={{ display: "none" }}>
            <input type="text" value={oderID} name="order_id" />
            <input type="text" value={user?.email} name="user_email" />
            <input value={`${emailCartList}`} name="container" />
            <input type="submit" value="Send" />
          </form>
          <section>
            <div className="box">
              <span className="number">1</span>
              <span
                className="title"
                onClick={async () =>
                  await finishCheckout(
                    new Date().toISOString().substring(0, 10)
                  )
                }
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
              {cartCopy.map((item) => (
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

              <div className="frete" onClick={() => redirect()}>
                Entrega estimada: {freteDate}
              </div>
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
