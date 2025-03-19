import './login.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';

const Login = () => {
    return (
        <div className="login-container">
            <div className="left-content">
                <h1 className='text-white'>Minha Conta</h1>
                <InputTotal label="E-mail:" pleaceHolder="Digite seu e-mail..." />
                <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." />
            </div>

            <div className="linha-vertical"></div>

            <div className="right-content">

            </div>
        </div>
    );
}

export default Login;