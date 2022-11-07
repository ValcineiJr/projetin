import React from "react";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import InputMask from "react-input-mask";

import { Container } from "./styles";
import { useTheme } from "styled-components";

const Conta: React.FC = () => {
  const { user, handleChangeEmail, handleChangePassword } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [birt_date, setBirthDate] = React.useState<any>();
  const [address, setAddress] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirm_password] = React.useState("");

  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");
  const { colors } = useTheme();

  React.useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      setTelefone(user.telefone);
      setBirthDate(user.birth_date);
      setAddress(user.adress);
      setCpf(user.cpf);
    }
  }, []);

  async function handleUpdateUser(e: any) {
    e.preventDefault();

    const passwordResult = await handleChangePassword(password);
    // const emailResult = await handleChangeEmail(email);

    // if (!emailResult) {
    //   setMessage("Erro ao atualizar email");
    //   setMessageColor(colors.error);
    // }
    if (!passwordResult) {
      setMessage("Erro ao atualizar senha");
      setMessageColor(colors.error);
    }
  }

  return (
    <Layout>
      <Container>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form onSubmit={handleUpdateUser}>
          <a href="#">Histórico de pedidos</a>
          <h1>Minha conta</h1>
          <div className="row">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="row">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <input
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              placeholder="Confirmar senha"
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Endereço"
            />
          </div>
          <div className="row">
            <InputMask
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              mask="(99)99999-9999"
            />
            <input
              type="date"
              value={birt_date}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="data"
            />
          </div>
          <div className="row">
            <InputMask
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Cpf"
              mask="999.999.999-99"
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default Conta;
