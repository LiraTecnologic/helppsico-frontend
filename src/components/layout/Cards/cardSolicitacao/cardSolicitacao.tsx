import './CardSolicitacao.css';

interface CardSolicitacaoProps {
  nome: string;
  idade: number;
  crp: string;
  avaliacao: number;
  status: string;
}

export default function CardSolicitacaoVinculo(props: CardSolicitacaoProps) {
  const { nome, idade, crp, avaliacao, status } = props;

  const getStatusClass = () => {
    if (status === 'Pendente') return 'status status-pendente';
    return 'status status-outro';
  };

  return (
    <div className="card-solicitacao">
      <div className="fotoPsico" />
      <div className="info">
        <div className="topo">
          <h2>{nome}</h2>
          <span className={getStatusClass()}>{status}</span>
        </div>
        <p>{idade} anos</p>
        <p>CRP: {crp}</p>
        <div className="avaliacao">
          <span>{avaliacao}</span>
          <span className="estrela">⭐</span>
        </div>
      </div>
      <button className="cancelar-btn">Cancelar</button>
    </div>
  );
}
