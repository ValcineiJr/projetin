import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Product } from "../../contexts/ProductContext";
import { useProduct } from "../../hook/useProduct";
import { formatter } from "../../utils/CurrencyFormatter";
import Layout from "../Layout";

import { Container } from "./styles";

const Categorias: React.FC = () => {
  const { getProductsByCategory, setProduct } = useProduct();
  let location = useLocation();
  let { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      const result = await getProductsByCategory(category);
      setProducts(result);
    }

    getData();
  }, [category, getProductsByCategory, location]);

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
                  <span>{formatter.format(item.price)}</span>
                  <Link
                    onClick={() => setProduct(item)}
                    to={`/produto/${item.id}`}
                  >
                    Veja mais
                  </Link>
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
