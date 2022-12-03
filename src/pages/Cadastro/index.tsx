import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { useAuth } from "../../hook/useAuth";
import Layout from "../Layout";
import InputMask from "react-input-mask";
import { cpf as c } from "cpf-cnpj-validator";
import { Container } from "./styles";

const Cadastro: React.FC = () => {
  const { colors } = useTheme();

  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm_password, setConfirm_password] = React.useState<string>("");
  const [telefone, setTelefone] = React.useState<string>("");
  const [birth_date, setBirth_date] = React.useState<any>("");
  const [cpf, setCpf] = React.useState<string>("");

  const [cep, setCep] = React.useState<string>("");
  const [cepIsValid, setCepIsValid] = React.useState(false);
  const [bairro, setBairro] = React.useState<string>("");
  const [numero, setNumero] = React.useState<any>("");
  const [cidade, setCidade] = React.useState<string>("");
  const [estado, setEstado] = React.useState<string>("");
  const [address, setaddress] = React.useState<string>("");

  const [messageColor, setMessageColor] = React.useState<any>(null);
  const [message, setMessage] = React.useState<any>("");

  const { handleRegisterClient } = useAuth();
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
      cpf === "" ||
      !cepIsValid
    ) {
      setMessageColor(colors.error);
      setMessage("Todos os campos devem ser preenchidos corretamente!");
    } else if (password !== confirm_password) {
      setMessageColor(colors.error);
      setMessage("As senhas devem combinar");
    } else if (isInTheFuture(new Date(birth_date))) {
      setMessageColor(colors.error);
      setMessage("Forneça uma data de nascimento válida");
    } else if (!c.isValid(cpf)) {
      setMessageColor(colors.error);
      setMessage("CPF inválido ou incorreto");
    } else {
      const result = await handleRegisterClient(
        username,
        email,
        password,
        address,
        estado,
        cidade,
        bairro,
        telefone,
        birth_date,
        cpf,
        cep,
        "user",
        numero
      );
      if (result === "Conta criada com sucesso") {
        setMessageColor(colors.success);
        setMessage(result);
        // navigate(`/`);
      } else {
        setMessageColor(colors.error);
        setMessage(result);
      }
    }
  }

  function buscarCep() {
    fetch(`https://viacep.com.br/ws/${cep}/json/`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("erro")) {
          alert("Cep não existente");
          setCepIsValid(false);
        } else {
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
          setaddress(data.logradouro);
          setCepIsValid(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setCepIsValid(false);
      });
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
        <form onSubmit={handleSubmitForm}>
          {/* <img src={require("../../assets/img/logo.png")} alt="" /> */}
          <h1>Cadastro</h1>
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
            <InputMask
              mask="99999-999"
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
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
            />
            <input
              type="text"
              required
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              placeholder="Endereço"
            />
            <input
              type="number"
              required
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value))}
              placeholder="Número"
            />
          </div>
          <div className="row">
            <input
              type="text"
              required
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
              }}
              placeholder="Cidade"
            />
            <input
              type="text"
              required
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Estado"
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
            <input
              maxLength={14}
              type="text"
              required
              // mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(c.format(e.target.value))}
              placeholder="Cpf"
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Layout>
  );
};

export default Cadastro;
