import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { Product } from "../../contexts/ProductContext";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { Container } from "./styles";

const Estoque: React.FC = () => {
  const { deleteItem, getAllProducts } = useProduct();
  const [category, setCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>();
  const [originalProducts, setOriginalProducts] = useState<Product[]>();
  const [change, setChange] = useState(false);
  const { colors } = useTheme();

  const getData = () => {
    getAllProducts().then((response) => {
      setOriginalProducts(response);
      setProducts(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (category !== "Todos") {
      setProducts(
        originalProducts?.filter((item) => item.category === category)
      );
    } else {
      setProducts(originalProducts);
    }
  }, [category, originalProducts]);

  const categories = [
    "Todos",
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
          <thead>
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
          </thead>

          <tbody>
            {products?.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#eee",
                  borderBottom:
                    index === products.length - 1
                      ? `5px solid #009ddc`
                      : "none",
                }}
              >
                <td>
                  <Link to={`/editar/produto/${item.id}`} className="button">
                    Editar
                  </Link>
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
