import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../componentes/Input";
import { useAuth } from "../../../hook/useAuth";

import { Container } from "./styles";

const PainelLogin: React.FC = () => {
  const { handleLogin, handleSignOut, user } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = React.useState<any>("");

  React.useEffect(() => {
    if (user && user.level === "user") {
      setMessage("Credenciais inválidas");
    }

    if (user?.level === "admin" || user?.level === "employee") {
      navigate("/painel");
    } else {
      handleSignOut();
    }
  }, [user]);

  return (
    <Container message={message}>
      <div className="messageBox">
        <p>{message}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
        <h1>Login</h1>
        <h2>Bem-vindo ao painel de controle.</h2>
        <div className="inputs">
          <Input
            value={email}
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </div>
      </form>
    </Container>
  );
};

export default PainelLogin;
