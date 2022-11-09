import React from "react";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import InputMask from "react-input-mask";

import { Container } from "./styles";
import { useTheme } from "styled-components";

const Conta: React.FC = () => {
  const { user, handleChangeEmail, handleChangePassword, handleUpdateUser } =
    useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [birth_date, setBirthDate] = React.useState<any>();
  const [address, setAddress] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirm_password] = React.useState("");

  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");
  const [isDisable, SetIsDisable] = React.useState(true);
  const { colors } = useTheme();

  React.useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      setTelefone(user.telefone);
      setBirthDate(user.birth_date);
      setAddress(user.address);
      setCpf(user.cpf);
    }
  }, [user]);

  async function handleUpdateUserLocal(e: any) {
    e.preventDefault();

    if (password !== "" && password === confirm_password) {
      const passwordResult = await handleChangePassword(password);

      if (!passwordResult) {
        setMessage("Erro ao atualizar senha");
        setMessageColor(colors.error);
      }
    }

    if (email !== user?.email) {
      const emailResult = await handleChangeEmail(email);

      if (!emailResult) {
        setMessage("Erro ao atualizar email");
        setMessageColor(colors.error);
      }
    }

    const changeResult = await handleUpdateUser(
      username,
      address,
      telefone,
      birth_date,
      cpf
    );

    if (changeResult) {
      setMessage("Dados atualizados com sucesso!");

      setMessageColor(colors.success);
    } else {
      setMessage("Erro ao atualizar dados");
      setMessageColor(colors.error);
    }
  }

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form onSubmit={handleUpdateUserLocal}>
          <a href="/history">Histórico de pedidos</a>
          <a
            onClick={(e) => {
              e.preventDefault();
              SetIsDisable((state) => !state);
            }}
            className="update"
            href="/history"
          >
            Alterar informações
          </a>
          <h1>Minha conta</h1>
          <div className="row">
            <input
              disabled={isDisable}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
            />
            <input
              disabled={isDisable}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="row">
            <input
              disabled={isDisable}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <input
              disabled={isDisable}
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              placeholder="Confirmar senha"
            />
          </div>
          <div className="row">
            <input
              disabled={isDisable}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Endereço"
            />
          </div>
          <div className="row">
            <InputMask
              disabled={isDisable}
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              mask="(99)99999-9999"
            />
            <input
              disabled={isDisable}
              type="date"
              value={birth_date}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="data"
            />
          </div>
          <div className="row">
            <InputMask
              disabled={isDisable}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Cpf"
              mask="999.999.999-99"
            />
          </div>

          <button disabled={isDisable} type="submit">
            Salvar
          </button>
        </form>
      </Container>
    </Layout>
  );
};

export default Conta;
