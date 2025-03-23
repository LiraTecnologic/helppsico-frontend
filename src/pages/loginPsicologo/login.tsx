import './login.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botao/botao';

const Login = () => {
    return (
        <div className="login-container">
            <img src="../../src/assets/marcaDagua-login.png" alt="marca d'água" className="marca-dagua" />
            
            <div className="left-content">
                <div className='formulario'>
                    <h1 className='text-white'>Minha Conta</h1>
                    <InputTotal label="CRP:" pleaceHolder="Digite seu CRP..." />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." />
                    <p className='semConta'>Não tem conta? <a href="" className='link'>crie agora</a></p>
                    <Botao texto='Entrar' />
                </div>
            </div>

            <div className="linha-vertical"></div>

            <div className="right-content">
                <img src="../../src/assets/imageLogin-psicologo.png" alt="login psicologo" className='imagem'/>
            </div>
        </div>
    );
}

export default Login;