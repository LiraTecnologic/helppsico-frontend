import './cadastroPaciente.css';
import InputMedio from '../../components/commmon/Inputs/InputMedio';
import Botao from '../../components/commmon/botoes/botao/botao';
import InputTotal from '../../components/commmon/Inputs/InputTotal';
import Select from '../../components/commmon/select/Select';
import EtapasCadastro from '../../components/commmon/marcadores/etapasCadastro';
import { useState, useEffect } from 'react';
import { formatarCPF, validarCPF, buscarEnderecoPorCEP } from './cadastroPaciente.service';
import { Link } from 'react-router-dom';

export default function Cadastro() {
    const [step, setStep] = useState(1);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfValue, setCpfValue] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaC, setSenhaC] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [genero, setGenero] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const generos = ['Masculino', 'Feminino', 'Outros'];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenero(e.target.value);
    };

    const validarEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validandoSenha = () => {
        if (senha !== senhaC) {
            alert("Senhas não são iguais!");
            return;
        }

        const senhaValida = senha.length >= 6 &&
            /[A-Z]/.test(senha) &&
            /[a-z]/.test(senha) &&
            /[0-9]/.test(senha) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        if (!senhaValida) {
            alert("Senha fraca! A senha precisa ter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.");
            return;
        }

        setStep(2);
    };

    const textBotao = () => step === 1 ? "Continuar" : "Criar Conta";

    const handleClick = () => {
        if (step === 1) {
            if (!nome || !email || !cpfValue || !senha || !senhaC) {
                alert('Por favor, preencha todos os campos antes de continuar.');
                return;
            }

            if (!validarEmail(email)) {
                alert('E-mail inválido. Verifique e tente novamente.');
                return;
            }

            if (!validarCPF(cpfValue)) {
                alert('CPF inválido, verifique e tente novamente');
                return;
            }

            validandoSenha();
        } else {
            alert('Cadastro finalizado!');
        }
    };

    useEffect(() => {
        if (cep.length === 8) {
            buscarEnderecoPorCEP(cep)
                .then(dados => {
                    setEndereco(dados.endereco);
                    setCidade(dados.cidade);
                    setEstado(dados.estado);
                    setPais(dados.pais);
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    }, [cep]);

    return (
        <div className="login-container">
            <div className="left-content">
                <img src="../../src/assets/CadastroPaciente.svg" alt="login psicologo" className='imagem'/>
            </div>
            <div className="linha-vertical"></div>
            <div className="right-content">
            
                <div className='formulario' style={{ position: 'relative' }}>
                    <h1 className='text-white'>Crie sua <br />Conta Agora</h1>
                    {step === 1 ? (
                        <>
                            <InputTotal label="Nome" pleaceHolder="Digite seu nome..." tipo='text' value={nome} onChange={(e) => setNome(e.target.value)} />
                            <InputTotal label="E-mail" pleaceHolder="Digite seu email..." tipo='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputTotal 
                                label="CPF" 
                                pleaceHolder="Digite seu cpf..." 
                                tipo='text' 
                                value={cpfValue} 
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, '');
                                    if (valor.length <= 11) setCpfValue(valor);
                                }}
                                onBlur={() => {
                                    if (cpfValue.length === 11) {
                                        setCpfValue(formatarCPF(cpfValue));
                                    }
                                }}
                            />
                            <div className="input-pair">
                                <InputMedio label="Senha:" pleaceHolder="Digite sua senha..." value={senha} onChange={(e) => setSenha(e.target.value)} tipo='password' />
                                <InputMedio label="Confirmar Senha:" pleaceHolder="Confirme sua senha..." value={senhaC} onChange={(e) => setSenhaC(e.target.value)} tipo='password' />
                            </div>
                        </>
                    ) : (
                        <>
                            <InputTotal
                                label="Cep"
                                pleaceHolder="Digite seu cep..."
                                tipo='text'
                                value={cep}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, '');
                                    if (valor.length <= 8) setCep(valor);
                                }}
                            />
                            <InputTotal label="Endereço" pleaceHolder="Endereço" tipo='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                            <div className="input-pair">
                                <InputMedio label="Numero:" pleaceHolder="Digite o numero..." value={numero} onChange={(e) => setNumero(e.target.value)} tipo='number' />
                                <InputMedio label="Complemento:" pleaceHolder="Digite complemento..." value={complemento} onChange={(e) => setComplemento(e.target.value)} tipo='text' />
                            </div>
                            <div className="input-pair">
                                <InputMedio label="Cidade:" pleaceHolder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} tipo='text' disabled />
                                <InputMedio label="Estado:" pleaceHolder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} tipo='text' disabled />
                            </div>
                            <div className="input-pair">
                                <InputMedio label="País:" pleaceHolder="País" value={pais} onChange={(e) => setPais(e.target.value)} tipo='text' disabled />
                                <div className="input-wrapper">
                                    <Select label='Gênero: ' value={genero} options={generos} onChange={handleSelectChange} />
                                </div>
                            </div>
                            <InputTotal label="Data de Nascimento" pleaceHolder="Digite sua data de nascimento..." tipo='date' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                        </>
                    )}
                    <Botao texto={textBotao()} onClick={handleClick} />
                    <p className='semConta'>Já tem uma conta? <br /><Link to="/" className='link'>Acesse</Link></p>
                </div>
                <EtapasCadastro etapaAtual={step} />
            </div>
        </div>
    );
}
