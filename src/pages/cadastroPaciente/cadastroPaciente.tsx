import './cadastroPaciente.css';
import InputMedio from '../../components/commmon/Inputs/InputMedio';
import Botao from '../../components/commmon/botao/botao';
import InputTotal from '../../components/commmon/Inputs/InputTotal';

export default function Cadatro (){
    const handleClik = () => {
        alert('Deu Certo');
    }


    return (
        <div className="login-container">
            <div className="left-content">
                <img src="../../src/assets/CadastroPaciente.svg" alt="login psicologo" className='imagem'/>
            </div>

            <div className="linha-vertical"></div>

            <div className="right-content">
                
                <div className='formulario'>
                    <h1 className='text-white'>Crie sua <br />Conta Agora</h1>
                    <InputTotal pleaceHolder="Digite seu nome..." label="Nome" />
                    <InputMedio label="CRP:" pleaceHolder="Digite seu CRP..." />
                    <InputMedio label="Senha:" pleaceHolder="Digite sua senha..." />
                    <Botao texto="Continuar" onClick={handleClik} />
                    <p className='semConta'>Já tem uma conta? <br /><a href="" className='link'>Acesse</a></p>
                </div>
                
            </div>
        </div>
    );
}