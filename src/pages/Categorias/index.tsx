import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Product } from "../../contexts/ProductContext";
import { useProduct } from "../../hook/useProduct";
import Layout from "../Layout";

import { Container } from "./styles";

const Categorias: React.FC = () => {
  const { getProductsByCategory } = useProduct();
  let location = useLocation();
  let { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      const result = await getProductsByCategory(category);
      setProducts(result);
    }

    getData();
  }, [location]);

  return (
    <Layout>
      <Container>
        <h1>{category}</h1>
        <div className="wrapper">
          <div className="products">
            {products.map((item) => (
              <div className="product">
                <div className="square">
                  <img src={item.product_image} alt="" />
                </div>

                <p className="title">{item.name}</p>
                <div className="price">
                  <span>R$: 1.250,00</span>
                  <Link to={`/produto/${item.id}`}>Veja mais</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Categorias;
