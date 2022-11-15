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
  const { colors } = useTheme();

  useEffect(() => {
    getProductsByCategory(category).then((response) => setProducts(response));
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
            <th className="title">Todos os produtos</th>
            <th>
              <select onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </th>
          </tr>
          <tr>
            <th className="bold"></th>
            <th className="bold">Nome:</th>
            <th className="bold">Quantidade:</th>
            <th className="bold">Preço:</th>
          </tr>
          <tbody>
            {products?.map((item) => (
              <tr>
                <td>
                  <button>Editar</button>
                  <button
                    onClick={() => deleteItem(item.id)}
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
