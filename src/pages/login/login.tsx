import './login.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botao/botao';

const Login = () => {
    return (
        <div className="login-container">
            <div className="left-content">
                <div className='formulario'>
                    <h1 className='text-white'>Minha Conta</h1>
                    <InputTotal label="E-mail:" pleaceHolder="Digite seu e-mail..." />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." />
                    <p className='semConta'>Não tem conta? <a href="" className='link'>crie agora</a></p>
                    <Botao texto='Entrar' />
                </div>
            </div>

            <div className="linha-vertical"></div>

            <div className="right-content">

            </div>
        </div>
    );
}

export default Login;