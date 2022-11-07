import React from "react";
import { useTheme } from "styled-components";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";

import { Container } from "./styles";

const EsqueciASenha: React.FC = () => {
  const { handleResetPassword } = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [messageColor, setMessageColor] = React.useState<any>(null);
  const { colors } = useTheme();

  async function sendMail(e: any) {
    e.preventDefault();
    const result = await handleResetPassword(email);

    if (!result) {
      setMessageColor(colors.error);
      setMessage("Email não encontrado.");
    } else {
      setMessageColor(colors.success);
      setMessage("Email enviado com sucesso!");
    }
  }

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form>
          <h1>Encontre sua conta</h1>
          <p>
            Insira seu email ou número de celular para procurar a sua conta.
          </p>
          <input
            value={email}
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <button type="submit" onClick={sendMail}>
            Enviar
          </button>
        </form>
      </Container>
    </Layout>
  );
};

export default EsqueciASenha;
