import './loginPaciente.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botao/botao';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const validarLogin = () => {
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }
        
    };

    return (
        <div className="loginPaciente-container">
            <img src="../../src/assets/marcaDagua-login.png" alt="marca d'água" className="marcaDagua-loginPaciente" />
            
            <div className="left-contentPaciente">
                <div className='formularioPaciente'>
                    <h1 className='text-white'>Minha Conta</h1>
                    <InputTotal label="E-mail:" pleaceHolder="Digite seu e-mail..." tipo="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." tipo="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <p className='semConta'>Não tem conta? <a href="/" className='link'>crie agora</a></p>
                    <Botao texto='Entrar' onClick={validarLogin} />
                </div>
            </div>

            <div className="linha-vertical"></div>

            <div className="right-contentPaciente">
                <img src="../../src/assets/image-loginPaciente.svg" alt="login psicologo" className='imagePaciente'/>
            </div>
        </div>
    );
}

export default Login;
