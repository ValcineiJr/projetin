import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import { AiTwotoneHome, AiOutlineLogin } from "react-icons/ai";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

const Header: React.FC = () => {
  const menu1 = [
    { icon: AiTwotoneHome, name: "Home", to: "/" },
    { icon: GiPerson, name: "Criar conta", to: "/cadastro" },
    { icon: AiOutlineLogin, name: "Login", to: "/login" },
    { icon: MdEmail, name: "Contato", to: "/contato" },
    { icon: FaShoppingCart, name: "Carrinho", to: "/carrinho" },
    { icon: FaUserCircle, name: "Minha conta", to: "/perfil" },
  ];

  const categories = [
    { name: "Notebooks" },
    { name: "Consoles" },
    { name: "Monitores" },
    { name: "Cadeiras" },
    { name: "Acessórios" },
    { name: "Teclados" },
    { name: "Headsets" },
    { name: "Mouses" },
    { name: "Mouse Pads" },
  ];
  return (
    <Container>
      <div className="wrapper">
        <div className="rowOne">
          <div className="logo">ScreedGames</div>
          <nav>
            <ul>
              {menu1.map((item) => (
                <li>
                  <item.icon />
                  <Link to={item.to}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="rowTwo">
          <nav>
            <ul>
              {categories.map((item) => (
                <li>
                  <Link to={item.name}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Container>
  );
};

export default Header;
