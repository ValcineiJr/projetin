import React from "react";
import Layout from "../Layout";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Container } from "./styles";

const Home: React.FC = () => {
  const sectionItem = [
    {
      name: "Cadeira MaxRacer Blue Agressive",
      description: [
        "Gamer profissional ou não, você precisa de uma cadeira focada em    oferecer mais conforto para horas de jogo.",
        "    Ajuste braços, encosto, altura e esteja pronto para o jogo.",
        "A cadeira gamer MaxRacer Aggressive é para aquelas pessoas        ousadas e modernas que têm - ou quer em ter - um setup        aggressivo! E essa cadeira conta com um design que resume tudo        isso e muito mais.",
      ],
    },
    {
      name: "Headset havit HV",
      description: [
        "Gamer profissional ou não, você precisa de uma cadeira focada em    oferecer mais conforto para horas de jogo.",
        "    Ajuste braços, encosto, altura e esteja pronto para o jogo.",
        "A cadeira gamer MaxRacer Aggressive é para aquelas pessoas        ousadas e modernas que têm - ou quer em ter - um setup        aggressivo! E essa cadeira conta com um design que resume tudo        isso e muito mais.",
      ],
    },
    {
      name: "Teclado Redragon Shiva RBG",
      description: [
        "Gamer profissional ou não, você precisa de uma cadeira focada em    oferecer mais conforto para horas de jogo.",
        "    Ajuste braços, encosto, altura e esteja pronto para o jogo.",
        "A cadeira gamer MaxRacer Aggressive é para aquelas pessoas        ousadas e modernas que têm - ou quer em ter - um setup        aggressivo! E essa cadeira conta com um design que resume tudo        isso e muito mais.",
      ],
    },
  ];
  return (
    <Layout>
      <Container>
        <div className="carossel">
          <Swiper
            loop={true}
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
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

        <div className="wrapper">
          <section>
            {sectionItem.map((item) => (
              <div className="section-item">
                <img
                  src={require("../../assets/img/produtos/cadeira.jpg")}
                  alt=""
                />
                <p className="title">{item.name}</p>
                {item.description.map((item) => (
                  <p className="description">{item}</p>
                ))}

                <a href="#">Veja mais!</a>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
