import './loginPsicologo.css';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Botao from '../../components/commmon/botoes/botao/botao';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { getUserCRP, getUserEmail, getUserId, getUserType } from '../../services/auth.service';
const Login = () => {
    const [crp, setCrp] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const validarSenha = (senha: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(senha);
    };

    const redirecionarTeste = () => {
      
        navigate("/meuPainelPsicologo");
    };

    const validarLogin = async () => {
        if (!crp || !senha) {
            alert('Por favor, preencha todos os campos antes de continuar.');
            return;
        }

        if (!validarSenha(senha)) {
            alert('A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            return;
        }

        const response = await login(crp, senha, 'PSICOLOGO');
        if (response.dado) {
            console.log('Login realizado com sucesso!, dados do usuário:', response.dado);
            
           console.log(`LocalStorage: \n 
            id: ${getUserId()}
            crp: ${getUserCRP()}
            email: ${getUserEmail()}
            userType: ${getUserType()}
            ` )

            redirecionarTeste();
        } else {
            alert(response.erro || 'Erro ao fazer login.');
        }
    };

    return (
        <div className="novo-login-container">
            <img src="../../src/assets/marcaDagua-login.png" alt="marca d'água" className="nova-marca-dagua" />
            
            <div className="novo-left-content">
                <div className='novo-formulario'>
                    <h1 className='novo-texto-titulo'>Minha Conta</h1>
                    <InputTotal label="CRP:" pleaceHolder="Digite seu crp..." tipo="text" value={crp} onChange={(e) => setCrp(e.target.value)} />
                    <InputTotal label="Senha:" pleaceHolder="Digite sua senha..." tipo="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <p className='novo-texto-sem-conta'>Não tem conta? <Link to="/cadastroPsicologo" className='novo-link'>crie agora</Link></p>
                    <Botao texto='Entrar' onClick={validarLogin} />
                </div>
            </div>

            <div className="nova-linha-vertical"></div>

            <div className="novo-right-content">
                <img src="../../src/assets/image-loginPsicologo.svg" alt="login paciente" className='nova-imagem-login'/>
            </div>
        </div>
    );
}

export default Login;