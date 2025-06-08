import './loginPsicologo.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botoes/botao/botao';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { apresentarErro } from '../../utils/notificacoes';
import PsicologoModel from '../../models/psicologo';

export default function Login (){
  const [crp, setCrp] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const redirecionarTeste = () => {
    navigate("/meuPainelPsicologo");
  };

  const validarLogin = async () => {
    if (!crp || !senha) {
      apresentarErro('Por favor, preencha todos os campos antes de continuar.');
      return;
    }

    try {
      const response = await login(crp, senha, 'PSICOLOGO');

      if (response.dado) {
        console.log('Login realizado com sucesso! Dados do usuário:', response.dado);

        console.log(`LocalStorage: 
          id: ${getUserId()}
          crp: ${getUserCRP()}
          email: ${getUserEmail()}
          userType: ${getUserType()}
        `);

  //       redirecionarTeste();
  //     } else {
  //       apresentarErro(response.erro || 'Erro ao fazer login.');
  //     }
  //   } catch (err) {
  //     apresentarErro('Erro ao tentar logar');
  //   }
  // };
        //Parte que recebe o retorno do login
        const psicologo: PsicologoModel = {} as PsicologoModel
        localStorage.setItem('id-psicologo', '0873d229-fd10-488a-b7e9-f294aa10e5db');
        navigate('/psicologo/painel');
    };

  return (
    <div className="novo-login-container">
      <img
        src="../../src/assets/marcaDagua-login.png"
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
            Não tem conta?{" "}
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
          src="../../src/assets/image-loginPsicologo.svg"
          alt="login paciente"
          className="nova-imagem-login"
        />
      </div>
    </div>
  );
};