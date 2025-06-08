import "./loginPaciente.css";
import InputTotal from "../../components/commmon/Inputs/InputTotal";
import Botao from "../../components/commmon/botoes/botao/botao";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { apresentarErro } from "../../utils/notificacoes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const validarLogin = async () => {
    if (!email || !senha) {
      apresentarErro("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    try {
      const resposta = await login(email, senha, "PACIENTE");

      if (resposta.dado) {
        navigate("/paciente/painel");
      } else {
        apresentarErro(resposta.erro || 'Erro ao fazer login.');
      }
    } catch (err) {
      apresentarErro(`Erro ao tentar logar`)
    }
  };

  return (
    <div className="login-container-paciente">
      <img
        src="../../src/assets/marcaDagua-login.png"
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
            <Link to="/cadastroPaciente" className="link-paciente">
              crie agora
            </Link>
          </p>

          <Botao texto="Entrar" onClick={validarLogin} />
        </div>
      </div>

      <div className="nova-linha-vertical"></div>

      <div className="right-content-paciente">
        <img
          src="../../src/assets/image-loginPaciente.svg"
          alt="login paciente"
          className="imagem-login-paciente"
        />
      </div>
    </div>
  );
}