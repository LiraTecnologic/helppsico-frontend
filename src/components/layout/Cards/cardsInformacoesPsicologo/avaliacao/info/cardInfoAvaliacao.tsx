import "./cardInfoAvaliacao.css";
import Estrelas from "./estrelas/estrelas";

interface CardAvaliacaoProps {
  nota: number;
  quantidadeAvaliacao: String;
}

export default function CardInfoAvaliacao({
  nota,
  quantidadeAvaliacao,
}: CardAvaliacaoProps) {
  return (
    <div className="card-avaliacao">
      <p className="nota-card-avaliacao">{nota}</p>
      <div className="detalhes-card-avaliacao">
        <Estrelas nota={Math.floor(nota)} />
        <p>({quantidadeAvaliacao} avaliações)</p>
      </div>
    </div>
  );
}