import CardDocumento from '../../components/layout/Cards/cardDocumento/cardDocumento';
import CardInfoPsicologo from '../../components/layout/Cards/cardInfoPsicologo/cardInfoPsicologo';
import Header from '../../components/layout/header/header';
import { useState } from 'react';
import './solicitacaoDocumento.css';

export default function SolicitacaoDocumento() {
    const [documentoSelecionado, setDocumentoSelecionado] = useState<number | null>(null);

    return (
        <div className='div-principal'>
            <Header fluxo='' headerPsicologo={false} />
            <main className='div-solicitao-documento'>
                <div className='div-h1'>
                    <h1>Solicitação de documentos</h1>
                    <hr />
                </div>
                <CardInfoPsicologo />
                <div className='div-documentos'>
                    <h2>Tipos de documentos</h2>
                    <div className='listagem-documentos'            >
                        {[1, 2, 3, 4, 5].map((docId) => (
                            <CardDocumento
                                key={docId}
                                isSelected={documentoSelecionado === docId}
                                onSelect={() =>
                                    setDocumentoSelecionado((prev) =>
                                        prev === docId ? null : docId 
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
                {documentoSelecionado && (
                    <button className='button-solicitar'>Solicitar</button>
                )}
            </main>
        </div>
    )
}