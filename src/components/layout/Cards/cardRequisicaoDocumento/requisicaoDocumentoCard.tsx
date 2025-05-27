import { Check, X } from 'lucide-react';
import { SolicitacaoDocumento } from '../../../../models/documento';
import './requisicaoDocumentoCard.css';

interface CardRequisicaoDocumentoProps {
  solicitacao: SolicitacaoDocumento;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function CardRequisicaoDocumento({
  solicitacao,
  onApprove,
  onReject
}: CardRequisicaoDocumentoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APROVADO':
        return '#28a745';
      case 'REJEITADO':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="card-requisicao-documento">
      <div className="card-content">
        <div className="paciente-info">
          <div className="paciente-avatar">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${solicitacao.documento.paciente.nome}`}
              alt={solicitacao.documento.paciente.nome}
            />
          </div>
          <div className="paciente-detalhes">
            <h3 className="paciente-nome">{solicitacao.documento.paciente.nome}</h3>
            <div className="documento-info">
              <span className="documento-tipo">
                <strong>Documento solicitado:</strong> {solicitacao.documento.tipoDocumento}
              </span>
              <span className="data-solicitacao">
                <strong>Data da solicitação:</strong> {formatDate(solicitacao.dataSolicitacao)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="card-acoes">
          <button 
            className="acao-btn aprovar-btn"
            onClick={() => onApprove(solicitacao.id)}
            disabled={solicitacao.status !== 'PENDENTE'}
          >
            <Check size={20} />
          </button>
          <button 
            className="acao-btn rejeitar-btn"
            onClick={() => onReject(solicitacao.id)}
            disabled={solicitacao.status !== 'PENDENTE'}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {solicitacao.status !== 'PENDENTE' && (
        <div className="indicador-status" style={{ backgroundColor: getStatusColor(solicitacao.status) }}>
          {solicitacao.status}
        </div>
      )}
    </div>
  );
}