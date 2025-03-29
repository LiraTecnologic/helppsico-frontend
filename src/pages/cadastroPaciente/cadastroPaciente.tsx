import './cadastroPaciente.css';
import InputMedio from '../../components/commmon/Inputs/InputMedio';
import Botao from '../../components/commmon/botao/botao';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Select from '../../components/commmon/select/Select';
import { useState } from 'react';

export default function Cadastro() {
    const [step, setStep] = useState(1);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState ('');
    const [cpf, setCpf] = useState ('');
    const [senha, setSenha] = useState ('');
    const [senhaC, setSenhaC] = useState ('');

    const [cep, setCep] = useState ('');
    const [endereco, setEndereco] = useState (''); 
    const [numero, setNumero] = useState ('');
    const [complemento, setComplemento] = useState ('');
    const [cidade, setCidade] = useState ('');
    const [estado, setEstado] = useState ('');
    const [pais, setPais] = useState ('');
    const [genero, setGenero] = useState ('');
    const [dataNascimento, setDataNascimento] = useState ('');

    const handleClick = () => {
        if (step === 1) {
            if (nome && email && cpf && senha && senhaC) {
                if(senha === senhaC){
                    setStep(2);
                } else{
                    alert('As senhas não são idênticas');
                }
            } else {
                alert('Por favor, preencha todos os campos antes de continuar.');
            }
        } else {
            alert('Segunda etapa do formulário!');
        }
    };

    return (
        <div className="login-container">
            <div className="left-content">
                <img src="../../src/assets/CadastroPaciente.svg" alt="login psicologo" className='imagem'/>
            </div>
            <div className="linha-vertical"></div>
            <div className="right-content">
                <div className='formulario'>
                    <h1 className='text-white'>Crie sua <br />Conta Agora</h1>
                    {step === 1 ? (
                        <>
                            <InputTotal label="Nome" pleaceHolder="Digite seu nome..." tipo='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                            <InputTotal label="E-mail" pleaceHolder="Digite seu email..." tipo='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <InputTotal label="CPF" pleaceHolder="Digite seu cpf..." tipo='number' value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                            <div className="input-pair">
                                <InputMedio elemento="input" label="Senha:" pleaceHolder="Digite sua senha..." value={senha} onChange={(e) => setSenha(e.target.value)} tipo='password'/>
                                <InputMedio elemento="input" label="Confirmar Senha:" pleaceHolder="Confirme sua senha..." value={senhaC} onChange={(e) => setSenhaC(e.target.value)} tipo='password'/>
                            </div>
                        </>
                    ) : (
                        <>
                            <InputTotal label="Cep" pleaceHolder="Digite seu cep..." tipo='number' value={cep} onChange={(e) => setCep(e.target.value)}/>
                            <InputTotal label="Endereço" pleaceHolder="Digite seu endereço..." tipo='text' value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                            <div className="input-pair">
                                <InputMedio elemento="input" label="Numero:" pleaceHolder="Digite o numero..." value={numero} onChange={(e) => setNumero(e.target.value)} tipo='number'/>
                                <InputMedio elemento="input" label="Complemento:" pleaceHolder="Digite o complemento..." value={complemento} onChange={(e) => setComplemento(e.target.value)} tipo='text'/>
                            </div>
                            <div className="input-pair">
                                <InputMedio elemento="input" label="Cidade:" pleaceHolder="Digite a cidade..." value={cidade} onChange={(e) => setCidade(e.target.value)} tipo='text'/>
                                <InputMedio elemento="input" label="Estado:" pleaceHolder="Digite o estado..." value={estado} onChange={(e) => setEstado(e.target.value)} tipo='text'/>
                            </div>
                            <div className="input-pair">
                                <InputMedio elemento="input" label="Pais:" pleaceHolder="Digite o pais..." value={pais} onChange={(e) => setPais(e.target.value)} tipo='text'/>
                                <div className="input-wrapper">
                                    <label>Gênero:</label>
                                    <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                                        <option value="">Selecione...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>
                            </div>
                            <InputTotal label="Data de Nascimento" pleaceHolder="Digite sua data de nascimento..." tipo='date' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                        </>
                    )}
                    <Botao texto="Continuar" onClick={handleClick} />
                    <p className='semConta'>Já tem uma conta? <br /><a href="" className='link'>Acesse</a></p>
                </div>
            </div>
        </div>
    );
}
