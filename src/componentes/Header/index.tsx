/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Container } from "./styles";

import { AiTwotoneHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../hook/useAuth";

const Header: React.FC = () => {
  let location = useLocation();
  const { user, handleSignOut } = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);

  const menu1 = [
    { icon: AiTwotoneHome, name: "Home", to: "/" },
    { icon: FaShoppingCart, name: "Carrinho", to: "/carrinho" },
    { icon: MdEmail, name: "Contato", to: "/contato" },

    { icon: GiPerson, name: "Criar conta", to: "/cadastro" },
    { icon: AiOutlineLogin, name: "Login", to: "/login" },
    {
      icon: FaUserCircle,
      name: user ? user.name : "Minha conta",
      to: user ? "/perfil" : "/login",
    },
  ];

  const categories = [
    { to: "/categoria/notebooks", name: "Notebooks" },
    { to: "/categoria/Consoles", name: "Consoles" },
    { to: "/categoria/Monitores", name: "Monitores" },
    { to: "/categoria/Cadeiras", name: "Cadeiras" },
    { to: "/categoria/Acessórios", name: "Acessórios" },
    { to: "/categoria/Teclados", name: "Teclados" },
    { to: "/categoria/Headsets", name: "Headsets" },
    { to: "/categoria/Mouses", name: "Mouses" },
    { to: "/categoria/MousePads", name: "Mouse Pads" },
  ];

  function toggleMenu() {
    setShowMenu((state) => !state);
  }

  useEffect(() => {
    setShowMenu(true);
  }, [location]);

  return (
    <Container showMenu={showMenu}>
      <div className="logo-mobile">ScreedGames</div>
      <button onClick={toggleMenu} className="menu">
        <FaBars />
      </button>

      <div className="wrapper">
        <div className="rowOne">
          <div className="logo">ScreedGames</div>
          <nav>
            <ul>
              {menu1.map((item) => {
                if (user) {
                  if (item.name === "Login") {
                    return (
                      <li>
                        <AiOutlineLogout />
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleSignOut();
                          }}
                          href="#"
                        >
                          Sair
                        </a>
                      </li>
                    );
                  }
                  if (item.name === "Criar conta") {
                    return null;
                  }
                }

                if (item.name === "Contato") {
                  return (
                    <li>
                      <MdEmail />
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "smooth",
                          });
                        }}
                        href="#"
                      >
                        Contato
                      </a>
                    </li>
                  );
                }
                return (
                  <li>
                    <item.icon />
                    <Link to={item.to}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="rowTwo">
          <nav>
            <ul>
              {categories.map((item) => (
                <li>
                  <Link to={item.to}>{item.name}</Link>
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
