import { useState, useEffect } from 'react';
import CardDocumento from '../../components/layout/Cards/cardDocumento/cardDocumento';
import CardInfoPsicologo from '../../components/layout/Cards/cardInfoPsicologo/cardInfoPsicologo';
import Header from '../../components/layout/header/header';
import PsicologoModel from '../../models/psicologo';
import { criarSolicitacaoDocumento, TipoDocumento } from './solicitacaoDocuemento.service';
import './solicitacaoDocumento.css';
import { consultarVinculosPaciente } from '../../services/vinculos.service';

export default function SolicitacaoDocumento() {
    const [documentoSelecionado, setDocumentoSelecionado] = useState<number | null>(null);
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [enviandoSolicitacao, setEnviandoSolicitacao] = useState(false);
    const [idPaciente, setIdPaciente] = useState<string | ''>('');

    const documentos = [
        {
            docId: 1,
            nome: 'ATESTADO',
            tipo: TipoDocumento.ATESTADO
        },
        {
            docId: 2,
            nome: 'LAUDO PSICOLÓGICO',
            tipo: TipoDocumento.LAUDO_PSICOLOGICO
        },
        {
            docId: 3,
            nome: 'PARECER PSICOLÓGICO',
            tipo: TipoDocumento.PARECER_PSICOLOGICO
        },
        {
            docId: 4,
            nome: 'RELATORIO PSICOLÓGICO',
            tipo: TipoDocumento.RELATORIO_PSICOLOGICO
        },
        {
            docId: 5,
            nome: 'DECLARAÇÃO',
            tipo: TipoDocumento.DECLARACAO
        }
    ];

    useEffect(() => {
        const idPacienteLocal = localStorage.getItem('id-paciente');

        async function consultarVinculoPaciente(id: string) {
            const vinculos = await consultarVinculosPaciente(id, 0);

            if (vinculos.dado) {
                setPsicologo(vinculos.dado.content[0].psicologo);
            }
        }

        if (idPacienteLocal) {
            consultarVinculoPaciente(idPacienteLocal);
            setIdPaciente(idPacienteLocal);
        }
        
    }, []);

    const handleSolicitarDocumento = async () => {
        if (!documentoSelecionado || !psicologo) return;

        const documentoSelecionadoData = documentos.find(doc => doc.docId === documentoSelecionado);
        if (!documentoSelecionadoData) return;

        setEnviandoSolicitacao(true);
        setErro(null);

        try {
            await criarSolicitacaoDocumento(
                idPaciente,
                psicologo.id,
                documentoSelecionadoData.tipo
            );

            setDocumentoSelecionado(null);
            alert('Solicitação enviada com sucesso!');

        } catch (error) {
            console.error("Erro ao solicitar documento:", error);
            setErro('Erro ao enviar solicitação. Tente novamente mais tarde.');
        } finally {
            setEnviandoSolicitacao(false);
        }
    };

    return (
        <div className='div-principal'>
            <Header fluxo='' headerPsicologo={false} />
            <main className='div-solicitao-documento'>
                <div className='div-h1'>
                    <h1>Solicitação de documentos</h1>
                    <hr />
                </div>

                {erro && (
                    <div style={{
                        color: 'red',
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#fee',
                        borderRadius: '4px'
                    }}>
                        {erro}
                    </div>
                )}

                {psicologo && (
                    <CardInfoPsicologo
                        nome={psicologo.nome}
                        crp={psicologo.crp}
                        urlFoto={psicologo.fotoUrl}
                    />
                )}

                <div className='div-documentos'>
                    <h2>Tipos de documentos</h2>
                    <div className='listagem-documentos'>
                        {documentos.map((doc) => (
                            <CardDocumento
                                key={doc.docId}
                                isSelected={documentoSelecionado === doc.docId}
                                onSelect={() =>
                                    setDocumentoSelecionado((prev) =>
                                        prev === doc.docId ? null : doc.docId
                                    )
                                }
                                nome={doc.nome}
                            />
                        ))}
                    </div>
                </div>

                <button
                    className='button-solicitar'
                    style={{
                        visibility: documentoSelecionado ? 'visible' : 'hidden',
                        opacity: enviandoSolicitacao ? 0.6 : 1,
                        cursor: enviandoSolicitacao ? 'not-allowed' : 'pointer'
                    }}
                    onClick={handleSolicitarDocumento}
                    disabled={enviandoSolicitacao || !psicologo}
                >
                    {enviandoSolicitacao ? 'Enviando...' : 'Solicitar'}
                </button>
            </main>
        </div>
    );
}