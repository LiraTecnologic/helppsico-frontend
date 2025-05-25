import CardDocumento from '../../components/layout/Cards/cardDocumento/cardDocumento';
import CardInfoPsicologo from '../../components/layout/Cards/cardInfoPsicologo/cardInfoPsicologo';
import Header from '../../components/layout/header/header';
import { useState } from 'react';
import './solicitacaoDocumento.css';

export default function SolicitacaoDocumento() {
    const [documentoSelecionado, setDocumentoSelecionado] = useState<number | null>(null);

    const documentos = [
        {
            docId: 1,
            nome: 'ATESTADO'
        },
        {
            docId: 2,
            nome: 'LAUDO PSICOLÓGICO'
        },
        {
            docId: 3,
            nome: 'PARECER PSICOLÓGICO'
        },
        {
            docId: 4,
            nome: 'RELATORIO PSICOLÓGICO'
        },
        {
            docId: 5,
            nome: 'DECLARAÇÃO'
        }
    ]

    const psicologoTeste = {
        nome: "Dr. Marco Aurélio",
        crp: "XXX-XXX-XX",
        urlFoto: "https://randomuser.me/api/portraits/women/32.jpg"
    }

    return (
        <div className='div-principal'>
            <Header fluxo='' headerPsicologo={false} />
            <main className='div-solicitao-documento'>
                <div className='div-h1'>
                    <h1>Solicitação de documentos</h1>
                    <hr />
                </div>
                <CardInfoPsicologo 
                    nome={psicologoTeste.nome}
                    crp={psicologoTeste.crp}
                    urlFoto={psicologoTeste.urlFoto}
                />
                <div className='div-documentos'>
                    <h2>Tipos de documentos</h2>
                    <div className='listagem-documentos'            >
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
                    style={{ visibility: documentoSelecionado ? 'visible' : 'hidden' }}
                >
                    Solicitar
                </button>
            </main>
        </div>
    )
}