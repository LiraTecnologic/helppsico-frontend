import './loginPsicologo.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botao/botao';
import { useState } from 'react';

const Login = () => {
    const [crp, setCrp] = useState('');
    const [senha, setSenha] = useState('');

    const validarLogin = () => {
        if (!crp || !senha) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }
        
    };

    return (
        <div className="login-containerPsicologo">
            <img src="../../src/assets/marcaDagua-login.png" alt="marca d'água" className="marcaDaguaPsicologo" />
            
            <div className="left-contentPsicologo">
                <div className='formularioPsicologo'>
                    <h1 className='text-white'>Minha Conta</h1>
                    <InputTotal label="CRP:" pleaceHolder="Digite seu crp..." tipo="text" value={crp} onChange={(e) => setCrp(e.target.value)} />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." tipo="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <p className='semConta'>Não tem conta? <a href="" className='link'>crie agora</a></p>
                    <Botao texto='Entrar' onClick={validarLogin} />
                </div>
            </div>

            <div className="linha-vertical"></div>

            <div className="right-contentPsicologo">
                <img src="../../src/assets/image-loginPsicologo.svg" alt="login paciente" className='image-loginPsicologo'/>
            </div>
        </div>
    );
}

export default Login;