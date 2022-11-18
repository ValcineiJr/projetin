import React, { useEffect, useState } from "react";
import { Product } from "../../contexts/ProductContext";
import { useAuth } from "../../hook/useAuth";

import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { Container } from "./styles";

const History: React.FC = () => {
  const [itens, setItens] = useState<Product[]>([]);
  const { getOrders } = useAuth();

  useEffect(() => {
    async function getData() {
      const respose = await getOrders();

      if (respose !== false) {
        setItens(respose);
      }
    }

    getData();
  }, []);

  return (
    <Layout>
      <Container>
        <h1>Histórico de pedidos</h1>
        <div className="wrapper">
          {itens.map((item) => (
            <div key={item.id} className="item">
              <div className="item-img">
                <img src={item.product_image} alt="" />
              </div>
              <div className="info">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{formatter.format(item.price)}</div>
                <input
                  type="numeric"
                  readOnly
                  value={item.quantity}
                  placeholder="1"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default History;
