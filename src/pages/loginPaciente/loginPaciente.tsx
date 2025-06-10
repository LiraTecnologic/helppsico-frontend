import "./loginPaciente.css";
import InputTotal from "../../components/commmon/Inputs/InputTotal";
import Botao from "../../components/commmon/botoes/botao/botao";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { apresentarErro } from "../../utils/notificacoes";
import imagemLogin from "../../assets/image-loginPaciente.svg";
import marcaDagua from "../../assets/marcaDagua-login.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const validarLogin = async () => {
    if (!email || !senha) {
      apresentarErro("Por favor, preencha todos os campos antes de continuar");
      return;
    }

    try {
      // const resposta = await login(email, senha, "PACIENTE");

      // if (resposta.dado) {
        localStorage.setItem("id-paciente", "4a0dd9db-3b2a-4c08-8ab3-2af4f6854650"); //ID alterar
        navigate("/paciente/painel");
      // } else {
      //   apresentarErro(resposta.erro || "Erro ao fazer login");
      // }
    } catch (err) {
      apresentarErro("Erro ao tentar logar");
    }
  };

  return (
    <div className="login-container-paciente">
      <img
        src={marcaDagua}
        alt="marca d'água"
        className="nova-marca-dagua"
      />

      <div className="left-content-paciente">
        <div className="formulario-paciente">
          <h1 className="texto-titulo-paciente">Minha Conta</h1>

          <InputTotal
            label="E-mail:"
            pleaceHolder="Digite seu e-mail..."
            tipo="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTotal
            label="Senha:"
            pleaceHolder="Digite sua senha..."
            tipo="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className="novo-texto-sem-conta">
            Não tem conta?{" "}
            <Link to="/paciente/cadastro" className="link-paciente">
              crie agora
            </Link>
          </p>

          <Botao texto="Entrar" onClick={validarLogin} />
        </div>
      </div>

      <div className="nova-linha-vertical"></div>

      <div className="right-content-paciente">
        <img
          src={imagemLogin}
          alt="login paciente"
          className="imagem-login-paciente"
        />
      </div>
    </div>
  );
}