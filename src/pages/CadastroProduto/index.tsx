import React, { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";

import { Container } from "./styles";

const CadastroProduto: React.FC = () => {
  const { handleCreateProduct } = useAuth();

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Categoria do produto");

  const createProduct = async (e: any) => {
    e.preventDefault();

    if (category === "Categoria do produto") {
      //message error
    } else {
      //  handleCreateProduct(name, fileImage);
    }
  };

  const categories = [
    "Categoria do produto",
    "Notebooks",
    "Consoles",
    "Monitores",
    "Cadeiras",
    "Acessórios",
    "Teclados",
    "Headsets",
    "Moueses",
    "Mouse pads",
  ];
  return (
    <Layout>
      <Container>
        <form onSubmit={createProduct}>
          <h1>Cadastrar novo produto</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do produto"
          />
          <input
            type="file"
            onChange={(e: any) => setFileImage(e.target.files[0])}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="cars"
            id="cars"
          >
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <input type="text" placeholder="Preço do produto" />
          <textarea name="" id="" placeholder="Descrição do produto"></textarea>
          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default CadastroProduto;
