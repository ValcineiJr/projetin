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
  const navigate = useNavigate();
  let { id } = useParams();
  const { colors } = useTheme();
  const { getProduct } = useProduct();

  const [fileImage, setFileImage] = useState<File | null>(null);
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
  const [preview, setPreview] = useState<any>();
  const [messageColor, setMessageColor] = useState<any>(null);
  const [message, setMessage] = useState<any>("");
  const [product, setProduct] = useState<Product>();

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

  function editProduct() {}

  useEffect(() => {
    if (id) {
      getProduct(id).then((response) => setProduct(response));
    }
  }, [getProduct, id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setPreview(product.product_image);
      setCategory(product.category);
    }
  }, [product]);

  return (
    <Layout>
      <Container color={messageColor} id="inicio">
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form onSubmit={editProduct}>
          <h1>Cadastrar novo produto</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do produto"
          />

          <input
            type="file"
            id="file"
            onChange={(e: any) => setFileImage(e.target.files[0])}
          />
          <label htmlFor="file">
            <img
              style={{ cursor: "pointer" }}
              alt=""
              src={
                fileImage
                  ? preview
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
              }
            />
          </label>

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
          <Editor setDescription={setDescription} readonly={false} />

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default EditarProduto;
