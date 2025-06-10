import './loginPsicologo.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botoes/botao/botao';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { apresentarErro } from '../../utils/notificacoes';
import PsicologoModel from '../../models/psicologo';
import imagemLogin from '../../assets/image-loginPsicologo.svg';
import marcaDagua from '../../assets/marcaDagua-login.png';

export default function Login() {
  const [crp, setCrp] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const validarLogin = async () => {
    if (!crp || !senha) {
      apresentarErro('Por favor, preencha todos os campos antes de continuar.');
      return;
    }

    try {
      // const response = await login(crp, senha, 'PSICOLOGO');

      // if (response.dado) {
        // const psicologo: PsicologoModel = response.dado;

        localStorage.setItem('id-psicologo', 'c6e4b2ea-e65f-4f1b-a987-86580ebbda56');

        navigate('/psicologo/painel');
      // } else {
      //   apresentarErro(response.erro || 'Erro ao fazer login.');
      // }
    } catch (err) {
      apresentarErro('Erro ao tentar logar.');
    }
  };

  return (
    <div className="novo-login-container">
      <img
        src={marcaDagua}
        alt="marca d'água"
        className="nova-marca-dagua"
      />

      <div className="novo-left-content">
        <div className="novo-formulario">
          <h1 className="novo-texto-titulo">Minha Conta</h1>

          <InputTotal
            label="CRP:"
            pleaceHolder="Digite seu crp..."
            tipo="text"
            value={crp}
            onChange={(e) => setCrp(e.target.value)}
          />
          <InputTotal
            label="Senha:"
            pleaceHolder="Digite sua senha..."
            tipo="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className="novo-texto-sem-conta">
            Não tem conta?{' '}
            <Link to="/psicologo/cadastro" className="novo-link">
              crie agora
            </Link>
          </p>

          <Botao texto="Entrar" onClick={validarLogin} />
        </div>
      </div>

      <div className="nova-linha-vertical"></div>

      <div className="novo-right-content">
        <img
          src={imagemLogin}
          alt="login paciente"
          className="nova-imagem-login"
        />
      </div>
    </div>
  );
}