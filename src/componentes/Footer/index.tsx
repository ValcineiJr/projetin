import React from "react";

import { BsTelephoneFill } from "react-icons/bs";

import { Container } from "./styles";

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="wrapper">
        <p className="title">Entre em contato conosco</p>
        <div className="contacts">
          <div className="contact">
            <BsTelephoneFill />
            <p>
              <span className="bold">Ligue para:</span> (21)98904-3776
            </p>
            <p>
              <span className="bold">Horários:</span> 8:00 - 20:00
            </p>
          </div>
          <div className="contact">
            <BsTelephoneFill />
            <p className="bold">Nos envie um e-mail.</p>
            <p className="bold">Horários: 8:00 - 20:00</p>
          </div>
          <div className="contact">
            <BsTelephoneFill />
            <p className="bold">Venha nos visitar.</p>
            <p>
              <span className="bold">Endereço:</span>
              <br />
              <span> Rua Justino de Araújo 431, nº 3, Padre Miguel</span>
            </p>
          </div>
        </div>
      </div>
      <p className="credits">Desenvolvido por Thalys, Matheus e Douglas.</p>
    </Container>
  );
};

export default Footer;
