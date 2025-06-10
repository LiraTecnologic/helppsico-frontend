import "./CardSolicitacao.css";

interface CardSolicitacaoProps {
  nome: string;
  idade: number;
  crp: string;
  avaliacao: number;
  status: string;
  botao: string;
  foto: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CardSolicitacaoVinculo({
  nome,
  idade,
  crp,
  avaliacao,
  status,
  onClick,
  botao,
  foto,
}: CardSolicitacaoProps) {
  const getStatusClass = () => {
    if (status === 'Pendente') return 'card-solicitacao-vinculo__status card-solicitacao-vinculo__status--pendente';
    return 'card-solicitacao-vinculo__status card-solicitacao-vinculo__status--recusado';
  };

  const getBotaoClass = () => {
    if (status === 'Pendente') return 'card-solicitacao-vinculo__botao card-solicitacao-vinculo__botao--cancelar';
    return 'card-solicitacao-vinculo__botao card-solicitacao-vinculo__botao--ver-mais';
  };

  return (
    <div className="card-solicitacao-vinculo">
      <div className="card-solicitacao-vinculo__content">
        <img className="card-solicitacao-vinculo__foto" src={foto} alt="Foto do Psicólogo" />
        
        <div className="card-solicitacao-vinculo__info">
          <h2 className="card-solicitacao-vinculo__nome">{nome}</h2>
          <p className="card-solicitacao-vinculo__idade">{idade} anos</p>
          <p className="card-solicitacao-vinculo__crp">CRP: {crp}</p>
          <div className="card-solicitacao-vinculo__avaliacao">
            <span>{avaliacao.toFixed(1).replace('.', ',')}</span>
            <span className="card-solicitacao-vinculo__estrela">⭐</span>
          </div>
        </div>

        <div className="card-solicitacao-vinculo__acoes">
          <span className={getStatusClass()}>{status}</span>
          <button className={getBotaoClass()} onClick={onClick}>{botao}</button>
        </div>
      </div>
    </div>
  );
}