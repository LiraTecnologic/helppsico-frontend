import './CardSolicitacao.css';
import foto from '../../../../assets/imagemPaciente.jpg';

interface CardSolicitacaoProps {
  nome: string;
  idade: number;
  crp: string;
  avaliacao: number;
  status: string;
  botao: string;
}

export default function CardSolicitacaoVinculo(props: CardSolicitacaoProps) {
  const { nome, idade, crp, avaliacao, status, botao } = props;

  const getStatusClass = () => {
    if (status === 'Pendente') return 'status status-pendente';
    return 'status status-outro';
  };

  return (
    <div className="card-solicitacao">
      <img className="fotoPsico" src={foto} alt="Foto do Psicólogo" />
      
      <div className="info">
        <h2 className="nome">{nome}</h2>
        <p className="idade">{idade} anos</p>
        <p className="crp">CRP: {crp}</p>
        <div className="avaliacao">
          <span>{avaliacao.toFixed(1).replace('.', ',')}</span>
          <span className="estrela">⭐</span>
        </div>
      </div>

      <div className="acoes">
        <span className={getStatusClass()}>{status}</span>
        <button className="cancelar-btn">{botao}</button>
      </div>
    </div>
  );
}