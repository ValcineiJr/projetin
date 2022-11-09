/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import InputMask from "react-input-mask";

import { Container } from "./styles";
import { useTheme } from "styled-components";
import Modal from "../../componentes/Modal";

import { AiFillCloseCircle } from "react-icons/ai";
import Input from "../../componentes/Input";

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
  const [actualPassword, setActualPassword] = React.useState("");
  const [confirm_password, setConfirm_password] = React.useState("");

  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");
  const [isDisable, SetIsDisable] = React.useState(true);
  const [isVisible, SetIsVisible] = React.useState(false);

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

  async function changePassword(e: any) {
    e.preventDefault();

    const passwordResult = await handleChangePassword(password);

    if (!passwordResult) {
      setMessage("Erro ao atualizar senha");
      setMessageColor(colors.error);
    } else {
      setMessage("Senha alterada com sucesso");
      closeModal();
      setMessageColor(colors.success);
    }
  }

  function closeModal() {
    SetIsVisible(false);
    setPassword("");
    setActualPassword("");
    setConfirm_password("");
  }

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>

        <Modal isVisible={isVisible} onClickBlackPanel={closeModal}>
          <AiFillCloseCircle className="close" onClick={closeModal} />
          <div className="row">
            <h1>Troca de senha</h1>
            <Input
              type="password"
              value={actualPassword}
              onChange={(e) => setActualPassword(e.target.value)}
              placeholder="Senha atual"
            />
            {actualPassword !== user!.password && actualPassword !== "" && (
              <p className="error message">Senha incorreta.</p>
            )}
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova senha"
              showError={password !== confirm_password}
            />
            {password.length < 6 && password !== "" && (
              <p className="error message">
                Sua senha deve ter mais de 5 caracteres.
              </p>
            )}
            {password === user!.password && (
              <p className="error message">
                Senha deve ser diferente da anterior.
              </p>
            )}

            <Input
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              placeholder="Confirmar senha"
              showError={password !== confirm_password}
            />
            {password !== confirm_password && password !== "" && (
              <p className="error message">As senhas devem ser iguais..</p>
            )}

            <button
              disabled={
                actualPassword !== "" &&
                password === confirm_password &&
                actualPassword === user!.password
                  ? false
                  : true
              }
              onClick={changePassword}
              type="submit"
            >
              Trocar
            </button>
          </div>
        </Modal>
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
          <a
            onClick={(e) => {
              e.preventDefault();
              SetIsVisible(true);
            }}
            className="password"
            href="#"
          >
            Trocar senha
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
