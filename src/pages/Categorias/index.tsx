import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Product } from "../../contexts/ProductContext";
import { useProduct } from "../../hook/useProduct";
import { FaShoppingCart } from "react-icons/fa";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { Container } from "./styles";

const Categorias: React.FC = () => {
  const { getAllProducts, setCartToStorage } = useProduct();
  let location = useLocation();
  let { category } = useParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [message, setMessage] = React.useState<any>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      const result = await getAllProducts();
      setAllProducts(result);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((item) => item.category === category)
    );
  }, [category, location, allProducts]);

  if (allProducts.length === 0) {
    return (
      <Layout>
        <Container>
          g<h1>Carregando...</h1>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container message={message}>
        <h1>{category}</h1>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <div className="wrapper">
          <div className="products">
            {filteredProducts.map((item) => {
              const outStock = item.quantity === 0;
              return (
                <div key={item.id} className="product">
                  <div className="square">
                    <img src={item.product_image} alt="" />
                    {outStock && (
                      <img
                        className="estoque"
                        src={require("../../assets/img/estoque.png")}
                        alt=""
                      />
                    )}
                  </div>

                  <p className="title">{item.name}</p>
                  <div className="price">
                    <span>{formatter.format(item.price)}</span>
                    <Link to={`/produto/${item.id}`} state={{ prod: item }}>
                      Veja mais
                    </Link>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                        setCartToStorage(item);
                        setMessage("Item adicionado ao carrinho som sucesso.");
                      }}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Categorias;
