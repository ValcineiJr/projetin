import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";

import { Container } from "./styles";

const CadastroProduto: React.FC = () => {
  const { handleCreateProduct, user } = useAuth();
  const navigate = useNavigate();

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<any>();
  const [category, setCategory] = useState("Categoria do produto");
  const [preview, setPreview] = useState<any>();

  const createProduct = async (e: any) => {
    e.preventDefault();

    if (category === "Categoria do produto") {
      //message error
    } else {
      handleCreateProduct(
        name,
        fileImage,
        category,
        price,
        quantity,
        description
      );
    }
  };

  function mreais(v: any) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})$/, ",$1"); //Coloca a virgula
    v = v.replace(/(\d+)(\d{3},\d{2})$/g, "$1.$2"); //Coloca o primeiro ponto

    setPrice(v);
  }

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

  React.useEffect(() => {
    if (!fileImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(fileImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileImage]);

  React.useEffect(() => {
    if (user?.level !== "admin" && user?.level !== "employee") {
      navigate("/");
    }
  }, [navigate, user?.level]);

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
          {fileImage && <img src={preview} />}
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="cars"
            id="cars"
          >
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <input
            type=""
            value={price}
            onChange={(e) => mreais(e.target.value)}
            placeholder="Preço do produto"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantidade"
          />
          <textarea
            name=""
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do produto"
          ></textarea>
          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default CadastroProduto;
