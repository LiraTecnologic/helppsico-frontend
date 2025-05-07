import Estrela from "../../../../../../assets/estrela.svg"
import './cardInfoAvaliacao.css';

interface CardAvaliacaoProps {
    nota: String;
    quantidadeAvaliacao: String;
};

export default function CardInfoAvaliacao(props: CardAvaliacaoProps) {
    return(
        <div className="card-avaliacao">
            <p className="nota-card-avaliacao">{props.nota}</p>
            <div className="detalhes-card-avaliacao">
                <div>
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                </div>
                <p>({props.quantidadeAvaliacao} avaliações)</p>
            </div>
        </div>
    );
}