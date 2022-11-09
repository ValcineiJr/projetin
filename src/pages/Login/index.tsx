import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";

import { Container } from "./styles";

const Login: React.FC = () => {
  const { handleLogin, user } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageColor, setMessageColor] = React.useState<any>(null);
  const { colors } = useTheme();
  const navigate = useNavigate();

  async function logIn(e: any) {
    e.preventDefault();
    if (email !== "" || password !== "") {
      const result = await handleLogin(email, password);

      if (!result) {
        setMessage("Email e/ou senha incorreto.");
        setMessageColor(colors.error);
      } else {
        navigate("/");
      }
    }
  }

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form>
          <h1>Login</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button onClick={logIn} type="submit">
            Entrar
          </button>
          <Link to="/esqueci-a-senha">Esqueceu a senha?</Link>
        </form>
      </Container>
    </Layout>
  );
};

export default Login;
