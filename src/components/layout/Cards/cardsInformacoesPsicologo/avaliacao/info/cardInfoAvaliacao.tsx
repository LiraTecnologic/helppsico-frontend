import './cardInfoAvaliacao.css';
import Estrelas from './estrelas/estrelas';

interface CardAvaliacaoProps {
    nota: number;
    quantidadeAvaliacao: String;
};

export default function CardInfoAvaliacao(props: CardAvaliacaoProps) {
    return(
        <div className="card-avaliacao">
            <p className="nota-card-avaliacao">{props.nota}</p>
            <div className="detalhes-card-avaliacao">
                <Estrelas 
                    nota={Math.floor(props.nota)}
                />
                <p>({props.quantidadeAvaliacao} avaliações)</p>
            </div>
        </div>
    );
}