import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../componentes/Editor";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import { Container } from "./styles";
import { useTheme } from "styled-components";

const CadastroProduto: React.FC = () => {
  const { handleCreateProduct, user } = useAuth();
  const navigate = useNavigate();
  const { colors } = useTheme();

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

  const createProduct = async (e: any) => {
    e.preventDefault();
    window.location.href = "#inicio";

    if (category === "Categoria do produto") {
      //message error
    } else {
      const pp = price.replace(".", "");
      const priceToDB = Number(pp.replace(",", "."));

      const result = handleCreateProduct(
        name,
        fileImage,
        category,
        priceToDB,
        quantity,
        description
      );

      if (result) {
        setMessageColor(colors.success);
        setMessage("Produto criado com sucesso");
      } else {
        setMessageColor(colors.error);
        setMessage("Erro ao criar produto, tente novamente");
      }
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
    "Mouses",
    "Mouse Pads",
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
      <Container color={messageColor} id="inicio">
        <div className="messageBox">
          <p>{message}</p>
        </div>
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

export default CadastroProduto;
