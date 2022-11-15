import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { Product } from "../../contexts/ProductContext";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { Container } from "./styles";

const Estoque: React.FC = () => {
  const { getProductsByCategory, deleteItem } = useProduct();
  const [category, setCategory] = useState("Notebooks");
  const [products, setProducts] = useState<Product[]>();
  const [originalProducts, setOriginalProducts] = useState<Product[]>();
  const [change, setChange] = useState(false);
  const { colors } = useTheme();

  const getData = () => {
    getProductsByCategory(category).then((response) => {
      setOriginalProducts(response);
      setProducts(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setProducts(originalProducts?.filter((item) => item.category === category));
  }, [category]);

  const categories = [
    "Notebooks",
    "Consoles",
    "Monitores",
    "Cadeiras",
    "Acessórios",
    "Teclados",
    "Headsets",
    "Mouses",
    "Mouse Pads",
  ];
  return (
    <Layout>
      <Container>
        <table>
          <tr>
            <th style={{ borderTopLeftRadius: 10 }} className="title">
              Todos os produtos
            </th>
            <th style={{ borderTopRightRadius: 10 }}>
              <select onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </th>
          </tr>
          <tr>
            <th className="bold">Ações:</th>
            <th className="bold">Nome:</th>
            <th className="bold">Quantidade:</th>
            <th className="bold">Preço:</th>
          </tr>
          <tbody>
            {products?.map((item, index) => (
              <tr
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#eee",
                  borderBottom:
                    index === products.length - 1
                      ? `5px solid ${colors.success}`
                      : "none",
                }}
              >
                <td>
                  <a href={`/editar/produto/${item.id}`} className="button">
                    Editar
                  </a>
                  <button
                    onClick={() => {
                      deleteItem(item.id);
                      setProducts(products.filter((r) => r.name !== item.name));
                      setOriginalProducts(
                        products.filter((r) => r.name !== item.name)
                      );
                    }}
                    style={{ backgroundColor: colors.error }}
                  >
                    Excluir
                  </button>
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatter.format(item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Layout>
  );
};

export default Estoque;
