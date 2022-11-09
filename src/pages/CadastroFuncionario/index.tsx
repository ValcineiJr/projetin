import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import InputMask from "react-input-mask";
import { Container } from "./styles";

const CadastroFuncioario: React.FC = () => {
  const { colors } = useTheme();

  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm_password, setConfirm_password] = React.useState<string>("");
  const [address, setaddress] = React.useState<string>("");
  const [telefone, setTelefone] = React.useState<string>("");
  const [birth_date, setBirth_date] = React.useState<any>("");
  const [cpf, setCpf] = React.useState<string>("");

  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");

  const { handleRegisterClient, user } = useAuth();
  let navigate = useNavigate();

  async function handleSubmitForm(e: any) {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirm_password === "" ||
      address === "" ||
      telefone === "" ||
      birth_date === "" ||
      cpf === ""
    ) {
      setMessageColor(colors.error);
      setMessage("Todos os campos devem ser preenchidos corretamente!");
    } else if (password !== confirm_password) {
      setMessageColor(colors.error);
      setMessage("As senhas devem combinar");
    } else {
      const result = await handleRegisterClient(
        username,
        email,
        password,
        address,
        telefone,
        birth_date,
        cpf,
        "employee"
      );
      if (result) {
        setMessageColor(colors.success);
        setMessage("Conta criada com sucesso");
        navigate(`/`);
      } else {
        setMessageColor(colors.error);
        setMessage("Erro ao criar conta");
      }
    }
  }

  React.useEffect(() => {
    if (user?.level !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Layout>
      <Container color={messageColor}>
        <div className="messageBox">
          <p>{message}</p>
        </div>
        <form onSubmit={handleSubmitForm}>
          <img src={require("../../assets/img/logo.png")} alt="" />
          <h1>Cadastrar funcionário</h1>
          <div className="row">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="row">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <input
              type="password"
              required
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
              placeholder="Confirmar senha"
            />
          </div>
          <div className="row">
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Endereço"
            />
          </div>
          <div className="row">
            <InputMask
              type="text"
              required
              value={telefone}
              onChange={(e: any) => setTelefone(e.target.value)}
              placeholder="Telefone"
              mask="(99)99999-9999"
            />

            <input
              type="date"
              required
              value={birth_date}
              onChange={(e) => setBirth_date(e.target.value)}
              placeholder="data"
            />
          </div>
          <div className="row">
            <InputMask
              type="text"
              required
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Cpf"
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default CadastroFuncioario;
