import './loginPaciente.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botao/botao';

const Login = () => {
    return (
        <div className="loginPaciente-container">
            <img src="../../src/assets/marcaDagua-login.png" alt="marca d'água" className="marca-dagua-1" />
            
            <div className="left-contentPaciente">
                <div className='formularioPaciente'>
                    <h1 className='text-white'>Minha Conta</h1>
                    <InputTotal label="E-mail:" pleaceHolder="Digite seu e-mail..." />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." />
                    <p className='semConta'>Não tem conta? <a href="/" className='link'>crie agora</a></p>
                    <Botao texto='Entrar' />
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