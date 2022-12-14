import React, { useState, useEffect } from "react";
import Layout from "../Layout";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Container } from "./styles";
import { FaShoppingCart } from "react-icons/fa";
import { useProduct } from "../../hook/useProduct";
import { Product } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { formatter } from "../../utils/CurrencyFormatter";

const Home: React.FC = () => {
  const { getAllProducts, setCartToStorage } = useProduct();
  const [itens, setItens] = useState<Product[]>([]);
  const [message, setMessage] = React.useState<any>("");

  useEffect(() => {
    async function getData() {
      const result = await getAllProducts();
      setItens(result);
    }
    getData();
  }, []);

  return (
    <Layout>
      <Container message={message}>
        <div className="carossel">
          <Swiper
            loop={true}
            navigation={true}
            pagination={true}
            autoplay
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="img-container">
                <img src={require("../../assets/img/banner1.jpg")} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img-container">
                {" "}
                <img src={require("../../assets/img/banner2.jpg")} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img-container">
                {" "}
                <img src={require("../../assets/img/banner3.jpg")} />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <h1>Produtos mais vendidos</h1>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <div className="wrapper">
          <section>
            {itens.slice(0, 3).map((item) => (
              <div key={item.name} className="section-item">
                <img src={item.product_image} alt="" />
                <div className="info">
                  <p className="title">{item.name}</p>

                  <div className="separator">
                    <span>{formatter.format(item.price)}</span>
                    <div>
                      <Link to={`/produto/${item.id}`} state={{ prod: item }}>
                        Veja mais!
                      </Link>
                      <button
                        onClick={() => {
                          setCartToStorage(item);
                          setMessage(
                            "Item adicionado ao carrinho com sucesso."
                          );
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
