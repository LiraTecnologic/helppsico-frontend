import './loginPaciente.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botoes/botao/botao';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacienteModel from '../../models/paciente';


import { login } from '../../services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');  
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const validarSenha = (senha: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(senha);
  };


  const validarLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos antes de continuar.');
      return;
    }

<<<<<<< HEAD

        return(navigate("/paciente/painel"))

        // colocar o retorno da requisição
        const paciente : PacienteModel = {} as PacienteModel;
        localStorage.setItem('id-paciente', paciente.id);
    };
=======
    if (!validarSenha(senha)) {
      alert(
        'A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
      );
      return;
    }
>>>>>>> d0648e6d1018ce6504134543c12cb7cef64943b6

    try {
    
      const resposta = await login(email, senha, 'PACIENTE');

      if (resposta.dado) {
      
        navigate('/paciente/painel');
      } else {
       
        alert(`Falha na autenticação: ${resposta.erro}`);
      }
    } catch (err) {
     
      alert(`Ocorreu um erro ao tentar logar: ${err}`);
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
            Não tem conta?{' '}
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
};

export default Login;
