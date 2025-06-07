import React, { useState, useEffect, useCallback } from 'react';
import CardDocumento from '../../components/layout/Cards/cardDocumento/cardDocumento';
import CardInfoPsicologo from '../../components/layout/Cards/cardInfoPsicologo/cardInfoPsicologo';
import Header from '../../components/layout/header/header';
import PsicologoModel from '../../models/psicologo';
import { buscarPsicologoVinculado, criarSolicitacaoDocumento, TipoDocumento } from './solicitacaoDocuemnto';
import './solicitacaoDocumento.css';

export default function SolicitacaoDocumento() {
    const [documentoSelecionado, setDocumentoSelecionado] = useState<number | null>(null);
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [enviandoSolicitacao, setEnviandoSolicitacao] = useState(false);

    const idPaciente = "1";

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

    const carregarPsicologo = useCallback(async () => {
        if (!idPaciente) {
            setErro("ID do paciente não encontrado.");
            setCarregando(false);
            return;
        }

        setCarregando(true);
        setErro(null);

        try {
            const psicologoVinculado = await buscarPsicologoVinculado(idPaciente);
            
            if (!psicologoVinculado) {
                setErro("Você não possui um psicólogo vinculado. Entre em contato com o suporte.");
            } else {
                setPsicologo(psicologoVinculado);
            }
        } catch (error) {
            console.error("Erro ao carregar psicólogo:", error);
            setErro('Erro ao carregar dados do psicólogo. Tente novamente mais tarde.');
        } finally {
            setCarregando(false);
        }
    }, [idPaciente]);

    useEffect(() => {
        window.scrollTo(0, 0);
        carregarPsicologo();
    }, [carregarPsicologo]);

    const handleSolicitarDocumento = async () => {
        if (!documentoSelecionado || !psicologo || !idPaciente) return;

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

    if (carregando) {
        return (
            <div className='div-principal'>
                <Header fluxo='' headerPsicologo={false} />
                <main className='div-solicitao-documento'>
                    <div className='div-h1'>
                        <h1>Solicitação de documentos</h1>
                        <hr />
                    </div>
                    <p>Carregando...</p>
                </main>
            </div>
        );
    }

    if (erro && !psicologo) {
        return (
            <div className='div-principal'>
                <Header fluxo='' headerPsicologo={false} />
                <main className='div-solicitao-documento'>
                    <div className='div-h1'>
                        <h1>Solicitação de documentos</h1>
                        <hr />
                    </div>
                    <p style={{ color: 'red' }}>{erro}</p>
                    <button onClick={carregarPsicologo}>Tentar Novamente</button>
                </main>
            </div>
        );
    }

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