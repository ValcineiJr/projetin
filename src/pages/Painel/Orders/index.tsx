import React, { useEffect, useState } from "react";

import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Product } from "../../../contexts/ProductContext";
import { useAdmin } from "../../../hook/useAdmin";
import { formatter } from "../../../utils/CurrencyFormatter";

import { Container } from "./styles";

const Orders: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState<Product[]>([]);

  const [randomKey, setRandomKey] = useState("1");
  const { getOrders, updateOrders, deleteOrder } = useAdmin();

  async function toggleMenu() {
    setVisible((state) => !state);
  }

  useEffect(() => {
    async function getData() {
      const response = await getOrders();
      setOrders(response);
    }

    getData();
  }, []);

  return (
    <Container visible={visible}>
      <div className="menu">
        <button onClick={toggleMenu}>
          <FaBars />
        </button>
        <nav>
          <Link to="/painel">Dashboard</Link>
          <Link to="/painel/orders">Pedidos</Link>
        </nav>
      </div>
      <div className="content">
        <table key={randomKey}>
          <thead>
            <tr>
              <th
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                className="title"
              >
                Todos os pedidos
              </th>
            </tr>
            <tr>
              <th className="bold">ID:</th>
              <th className="bold">Nome:</th>
              <th className="bold">Quantidade:</th>
              <th className="bold">Preço:</th>
              <th className="bold">Status:</th>
              <th className="bold">Ações:</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#eee",
                  borderBottom:
                    index === orders.length - 1 ? `5px solid #009ddc` : "none",
                }}
              >
                <td>{item?.orderID}</td>
                <td style={{ padding: 16 }}>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatter.format(item.price)}</td>
                <td style={{ fontWeight: "bold" }}>{item?.status}</td>
                <td>
                  <button
                    onClick={async () => {
                      const copy = orders;
                      if (copy[index].status === "Pedido recebido") {
                        copy[index].status = "Pedido enviado";
                      } else if (copy[index].status === "Pedido enviado") {
                        copy[index].status = "Pedido entregue";
                      }

                      // setOrders(copy);

                      setRandomKey((state) => (state += "1"));
                      console.log(
                        await updateOrders(copy[index].status, item.uid)
                      );
                    }}
                  >
                    Alterar
                  </button>
                  <button
                    onClick={async () => {
                      const ind = orders.filter((i) => item.name !== i.name);
                      setOrders(ind);

                      await deleteOrder(item.uid);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Orders;
