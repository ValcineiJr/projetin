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
        <h1>Histórico de compras</h1>
        <div className="wrapper">
          {itens.length > 0 ? (
            itens.map((item) => (
              <div key={item.id} className="item">
                <div className="separator">
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

                <div className="status">
                  <h2>Status</h2>
                  <h3
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {item.status}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <h1 className="empty">Sem compras</h1>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default History;
