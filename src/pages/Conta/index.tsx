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
import { cpf as c } from "cpf-cnpj-validator";
import { Link } from "react-router-dom";

const Conta: React.FC = () => {
  const { user, handleChangeEmail, handleChangePassword, handleUpdateUser } =
    useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [birth_date, setBirth_date] = React.useState<any>();
  const [cpf, setCpf] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [actualPassword, setActualPassword] = React.useState("");
  const [confirm_password, setConfirm_password] = React.useState("");

  const [cep, setCep] = React.useState<string>("");
  const [bairro, setBairro] = React.useState<string>("");
  const [numero, setNumero] = React.useState<any>();
  const [cidade, setCidade] = React.useState<string>("");
  const [estado, setEstado] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");

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
      setBirth_date(user.birth_date);
      setAddress(user.address);
      setCpf(user.cpf);
      setCep(user.cep);
      setBairro(user.bairro);
      setNumero(user.numero);
      setCidade(user.cidade);
      setEstado(user.estado);
    }
  }, [user]);

  async function handleUpdateUserLocal(e: any) {
    e.preventDefault();

    if (email !== user?.email) {
      const emailResult = await handleChangeEmail(email);

      if (!emailResult) {
        setMessage("Erro ao atualizar email");
        setMessageColor(colors.error);
        return;
      }
    }

    if (!c.isValid(cpf)) {
      setMessage("CPF inválido ou incorreto");
      setMessageColor(colors.error);
      return;
    }

    const changeResult = await handleUpdateUser(
      username,
      address,
      telefone,
      birth_date,
      cpf,
      cep,
      bairro,
      numero,
      cidade,
      estado
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

  function buscarCep() {
    if (cep.length < 8) {
      return;
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty("erro")) {
            alert("Cep não existente");
          } else {
            setBairro(data.bairro);
            setCidade(data.localidade);
            setEstado(data.uf);
            setAddress(data.logradouro);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function isInTheFuture(date: Date) {
    const today = new Date();

    // 👇️ OPTIONAL!
    // This line sets the time of the current date to the
    // last millisecond, so the comparison returns `true` only if
    // date is at least tomorrow
    today.setHours(23, 59, 59, 998);

    return date > today;
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
          {user?.level === "user" ? (
            <Link to="/history">Histórico de compras</Link>
          ) : (
            <Link style={{ textAlign: "right" }} to="/estoque">
              Estoque
            </Link>
          )}

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
            <InputMask
              mask="99999-999"
              disabled={isDisable}
              type="text"
              required
              value={cep}
              onChange={(e) => {
                setCep(e.target.value);
              }}
              onBlur={buscarCep}
              placeholder="Cep"
            />
          </div>
          <div className="row">
            <input
              type="text"
              required
              disabled={isDisable}
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
            />
            <input
              type="text"
              required
              disabled={isDisable}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Endereço"
            />
            <input
              type="number"
              required
              disabled={isDisable}
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value))}
              placeholder="Número"
            />
          </div>
          <div className="row">
            <input
              type="text"
              required
              disabled={isDisable}
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
              }}
              placeholder="Cidade"
            />
            <input
              type="text"
              required
              disabled={isDisable}
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Estado"
            />
          </div>
          <div className="row">
            <InputMask
              type="text"
              required
              disabled={isDisable}
              value={telefone}
              onChange={(e: any) => setTelefone(e.target.value)}
              placeholder="Telefone"
              mask="(99)99999-9999"
            />

            <input
              type="date"
              required
              disabled={isDisable}
              value={birth_date}
              onChange={(e) => setBirth_date(e.target.value)}
              placeholder="data"
              onBlur={() => {
                console.log(isInTheFuture(new Date(birth_date)));
              }}
            />
          </div>
          <div className="row">
            <input
              maxLength={14}
              type="text"
              required
              disabled={isDisable}
              // mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(c.format(e.target.value))}
              placeholder="Cpf"
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
