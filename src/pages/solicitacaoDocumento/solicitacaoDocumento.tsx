import CardDocumento from '../../components/layout/Cards/cardDocumento/cardDocumento';
import CardInfoPsicologo from '../../components/layout/Cards/cardInfoPsicologo/cardInfoPsicologo';
import Header from '../../components/layout/header/header';
import './solicitacaoDocumento.css';

export default function SolicitacaoDocumento() {
    return (
        <div className='div-solicitao-documento'>
            <Header fluxo='' headerPsicologo={false}/>
            <div className='div-h1'>
                <h1>Solicitação de documentos</h1>
                <hr/>
            </div>
            <CardInfoPsicologo/>
            <div>
                <h2>Tipos de documentos</h2>
                <CardDocumento/>
            </div>
            <button>Solicitar</button>
        </div>
    )
}