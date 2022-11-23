/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Container } from "./styles";

import { AiTwotoneHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../hook/useAuth";
import { useProduct } from "../../hook/useProduct";

const Header: React.FC = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const { user, handleSignOut } = useAuth();
  const { cart } = useProduct();
  const [showMenu, setShowMenu] = React.useState(false);

  const menu1 = [
    { icon: AiTwotoneHome, name: "Home", to: "/" },
    { icon: MdEmail, name: "Contato", to: "/contato" },

    {
      icon: FaUserCircle,
      name: user ? user.name : "Minha conta",
      to: user ? "/perfil" : "/login",
    },
    {
      icon: FaShoppingCart,
      name: cart.length > 0 ? `Carrinho (${cart.length})` : "Carrinho",
      to: "/carrinho",
    },
    { icon: GiPerson, name: "Criar conta", to: "/cadastro" },
    { icon: AiOutlineLogin, name: "Login", to: "/login" },
  ];

  const categories = [
    { to: "/categoria/Notebooks", name: "Notebooks" },
    { to: "/categoria/Consoles", name: "Consoles" },
    { to: "/categoria/Monitores", name: "Monitores" },
    { to: "/categoria/Cadeiras", name: "Cadeiras" },
    { to: "/categoria/Acessórios", name: "Acessórios" },
    { to: "/categoria/Teclados", name: "Teclados" },
    { to: "/categoria/Headsets", name: "Headsets" },
    { to: "/categoria/Mouses", name: "Mouses" },
    { to: "/categoria/Mouse Pads", name: "Mouse Pads" },
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
              {menu1.map((item, index) => {
                if (user) {
                  if (item.name === "Login") {
                    return (
                      <li key={String(index)}>
                        <AiOutlineLogout />
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                            handleSignOut();
                          }}
                          href="#"
                        >
                          Sair
                        </a>
                      </li>
                    );
                  }

                  if (user.level === "employee") {
                    if (item.to === "/carrinho") {
                      return (
                        <li key={String(index)}>
                          <FaShoppingCart />
                          <Link to="/cadastro/produto">Cadastrar produto</Link>
                        </li>
                      );
                    }
                  }

                  if (user.level === "admin") {
                    if (item.name === "Criar conta") {
                      return (
                        <li key={String(index)}>
                          <AiOutlineLogin />
                          <Link to="/cadastro/funcionario">
                            Cadastrar funcionário
                          </Link>
                        </li>
                      );
                    }
                    if (item.to === "/carrinho") {
                      return (
                        <li key={String(index)}>
                          <FaShoppingCart />
                          <Link to="/cadastro/produto">Cadastrar produto</Link>
                        </li>
                      );
                    }
                  } else {
                    if (item.name === "Criar conta") {
                      return null;
                    }
                  }
                } else {
                  if (item.to === "/carrinho") {
                    return null;
                  }
                  if (item.name === "Minha conta") {
                    return null;
                  }
                }

                if (item.name === "Contato") {
                  return (
                    <li key={String(index)}>
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
                  <li key={String(index)}>
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
              {categories.map((item, index) => (
                <li key={String(index)}>
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
