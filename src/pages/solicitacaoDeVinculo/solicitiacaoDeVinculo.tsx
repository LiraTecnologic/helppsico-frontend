import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao  from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';


export default function solicitiacaoDeVinculo () {

    return(
        <>
            <Header fluxo="minhasSessoes"/>
            <CardSolicitacao status="Pendente" />
        </>
    );
}