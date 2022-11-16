import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { useTheme } from "styled-components";
import Editor from "../../componentes/Editor";
import { Product } from "../../contexts/ProductContext";
import { useAuth } from "../../hook/useAuth";
import { useProduct } from "../../hook/useProduct";
import Layout from "../Layout";

import { Container } from "./styles";

const EditarProduto: React.FC = () => {
  const { handleCreateProduct, user } = useAuth();

  let { id } = useParams();
  const { colors } = useTheme();
  const { getProduct, updateProduct } = useProduct();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "Escreva a descrição do ",
        },
        {
          text: "produto",
          bold: true,
        },
        {
          text: ". ",
        },
      ],
    },
  ]);
  const [quantity, setQuantity] = useState<any>();
  const [category, setCategory] = useState("Categoria do produto");

  const [messageColor, setMessageColor] = useState<any>(null);
  const [message, setMessage] = useState<any>("");
  const [product, setProduct] = useState<Product>();
  const [change, setChange] = useState(false);

  const categories = [
    "Categoria do produto",
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

  const decimalMaskOpt = ({
    thousandsSeparatorSymbol = ".",
    decimalSymbol = ",",
    decimalPlaces = 2,
  } = {}) => {
    return (input: any) => {
      var digits = (input.match(/\d/gi) || []).length;

      if (digits <= decimalPlaces) return Array(decimalPlaces).fill(/\d/);

      if (digits === decimalPlaces + 1) {
        return [/\d/, /\d/, decimalSymbol, ...Array(decimalPlaces).fill(/\d/)];
      }

      var mask = [];
      for (var i = digits - 1; i >= 0; i--) {
        mask.push(/\d/);

        if (i === digits - decimalPlaces) {
          mask.push(decimalSymbol);
        }

        const r = digits - i;
        if (r >= decimalPlaces + 2 && (r - decimalPlaces) % 3 === 0 && i > 0) {
          mask.push(thousandsSeparatorSymbol);
        }
      }

      return mask.reverse();
    };
  };

  useEffect(() => {
    if (id) {
      getProduct(id).then((response) => setProduct(response));
    }
  }, [getProduct, id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setQuantity(product.quantity);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  useEffect(() => {
    if (description.length > 1) {
      setChange(true);
    }
  }, [description]);

  async function handleUpdateProduct(e: any) {
    e.preventDefault();
    window.location.href = "#inicio";

    if (id) {
      const pp = price.replace(".", "");
      const priceToDB = Number(pp.replace(",", "."));

      const result = await updateProduct(
        id,
        name,
        category,
        priceToDB,
        quantity,
        description
      );

      if (result) {
        setMessageColor(colors.success);
        setMessage("Produto alterado com sucesso.");
      } else {
        setMessageColor(colors.error);
        setMessage("Erro ao alterar o produto.");
      }
    }
  }

  return (
    <Layout>
      <Container color={messageColor} id="inicio">
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form onSubmit={handleUpdateProduct}>
          <h1>Edição de produto</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do produto"
          />

          <select
            onChange={(e) => setCategory(e.target.value)}
            name="cars"
            id="cars"
            value={category}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <MaskedInput
            maxLength={9}
            mask={decimalMaskOpt({ decimalPlaces: 2 })}
            guide={false}
            value={price}
            placeholder="Digite o preço do produto"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="numeric"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantidade"
          />
          {change && (
            <Editor
              initialValue={description}
              setDescription={setDescription}
              readonly={false}
            />
          )}

          <button type="submit">Alterar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default EditarProduto;
