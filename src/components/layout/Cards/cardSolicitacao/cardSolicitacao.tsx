import './cardSolicitacao.css';
import 'react';

interface CardSolicitacaoProps{
    status: string;
}

export default function cardSolicitacao(props: CardSolicitacaoProps){
    
    const validarStatus = (status: string) => {
        if (status == "Pendente"){
            return "status-pendente"
        } else {
            return "status-recusado"
        }
    }
    
    return(
        <div className="card">
            <h1 className={`${validarStatus(props.status)}`}>{props.status}</h1>
        </div>
    );
}