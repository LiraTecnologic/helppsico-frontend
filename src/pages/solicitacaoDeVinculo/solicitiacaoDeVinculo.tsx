import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao  from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';


export default function solicitiacaoDeVinculo () {

    return(
        <>
            <Header fluxo="minhasSessoes"/>
            <CardSolicitacao nome="João Victor" idade={19} crp="2313-1" avaliacao={3} status="Recusado" />
        </>
    );
}