import './detalhesSessao.css';
import Header from '.././../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';

export default function DetalhesSessao(){
    return(
        <>
            <Header fluxo="minhasSessoes" />
            <h1 className='text-tittle'>Histórico de sessões</h1>
            <ProximasSessoes sessaoMarcada={true} />
            <SessoesAntigas />
        </>
    )
}