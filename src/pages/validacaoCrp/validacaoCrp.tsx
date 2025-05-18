
import Header from '../../components/layout/header/header';
import ValidacaoCrpModel from '../../models/validacaoCrp';
import { useState, useEffect } from 'react';
import './validacaoCrp.css'
import CardValidacaoCrp from '../../components/layout/Cards/cardValidacaoCrp/cardValidacaoCrp';
import ModalReprovar from '../../components/layout/validacaoCrp/reprovar/modalReprovar';
import ModalAprovar from '../../components/layout/validacaoCrp/aprovar/modalAprovar';

export default function ValidacaoCrp() {

    const [validacoes, setValidacoes] = useState<ValidacaoCrpModel[]>([]);
    const [mostrarModalReprovar, setMostrarModalReprovar] = useState(false);
    const [mostrarModalAprovar, setMostrarModalAprovar] = useState(false);
    const [psicologoSelecionado, setPsicologoSelecionado] = useState<string | null>(null);

    useEffect(() => {
        setValidacoes([
            {
                id: "1",
                crp: "06/123456",
                motivoReprova: "",
                psicologo: {
                    id: "psic-01",
                    nome: "Dra. Ana Lima",
                    crp: "06/123456",
                    cpf: "123.456.789-00",
                    email: "ana.lima@exemplo.com",
                    telefone: "(11) 98765-4321",
                    dataNascimento: "1985-04-12",
                    genero: "Feminino",
                    enderecoAtendimento: "Rua das Flores, 123 - São Paulo, SP",
                    biografia: "Psicóloga com 10 anos de experiência em terapia cognitivo-comportamental.",
                    status: "PENDENTE",
                    fotoUrl: "https://example.com/fotos/ana.jpg"
                }
            },
            {
                id: "2",
                crp: "05/654321",
                motivoReprova: "Número de CRP inválido",
                psicologo: {
                    id: "psic-02",
                    nome: "Dr. Carlos Souza",
                    crp: "05/654321",
                    cpf: "987.654.321-00",
                    email: "carlos.souza@exemplo.com",
                    telefone: "(21) 91234-5678",
                    dataNascimento: "1978-09-30",
                    genero: "Masculino",
                    enderecoAtendimento: "Av. Central, 456 - Rio de Janeiro, RJ",
                    biografia: "Especialista em psicologia do trabalho, com experiência em atendimento clínico.",
                    status: "REPROVADO",
                    fotoUrl: "https://example.com/fotos/carlos.jpg"
                }
            },
            {
                id: "3",
                crp: "07/111222",
                motivoReprova: "Documento ilegível",
                psicologo: {
                    id: "psic-03",
                    nome: "Dra. Julia Mendes",
                    crp: "07/111222",
                    cpf: "111.222.333-44",
                    email: "julia.mendes@exemplo.com",
                    telefone: "(31) 99876-1234",
                    dataNascimento: "1990-01-20",
                    genero: "Feminino",
                    enderecoAtendimento: "Rua da Saúde, 789 - Belo Horizonte, MG",
                    biografia: "Atuação em psicologia infantil e familiar. Atendimento presencial e online.",
                    status: "REPROVADO",
                    fotoUrl: "https://example.com/fotos/julia.jpg"
                }
            }
        ]);
    }, []);


    const abrirModalReprovar = (id: string) => {
        setPsicologoSelecionado(id);
        setMostrarModalReprovar(true);
    };

    const fecharModalReprovar = () => {
        setMostrarModalReprovar(false);
        setPsicologoSelecionado(null);
    };

    const abrirModalAprovar = (id: string) => {
        setPsicologoSelecionado(id);
        setMostrarModalAprovar(true);
    };

    const fecharModalAprovar = () => {
        setMostrarModalAprovar(false);
        setPsicologoSelecionado(null);
    };
    


    return (
        <div>
            <Header fluxo='' headerPsicologo={false}></Header>
            <main className='main-validacao-crp'>
                <h1 className='titulo-main-validacao-crp' >CRPs({validacoes.length})</h1>
                {validacoes.map((validacao) => (
                    <CardValidacaoCrp
                        key={validacao.id}
                        validacao={validacao}
                        onReprovar={() => abrirModalReprovar(validacao.id)}
                        onAprovar={() => abrirModalAprovar(validacao.id)}
                    />
                ))}

            </main>


            {mostrarModalReprovar && (
                <>
                    <div className='modal-overlay'></div>
                    <ModalReprovar
                        onClose={fecharModalReprovar}
                        idPsicologo={psicologoSelecionado}

                    />
                </>
            )}


            {mostrarModalAprovar && (
                <>
                    <div className='modal-overlay'></div>
                    <ModalAprovar
                        onClose={fecharModalAprovar}
                        idPsicologo={psicologoSelecionado}

                    />
                </>
            )}
        </div>
    );
}