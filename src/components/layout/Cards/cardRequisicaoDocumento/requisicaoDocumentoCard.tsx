import { Check, X } from 'lucide-react';
import SolicitacaoDocumentoModel from '../../../../models/solicitacaoDocumento';
import './requisicaoDocumentoCard.css';

interface CardRequisicaoDocumentoProps {
  solicitacao: SolicitacaoDocumentoModel;
  onApprove: (id: string, tipoDocumento: string) => void;
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

  const gerarNome = (tipoDocumento: string) => {
    switch (tipoDocumento){
      case "ATESTADO": return "Atestado";
      case "DECLARACAO": return "Declaração";
      case "RELATORIO_PSICOLOGICO": return "Relatório Psicológico";
      case "LAUDO_PSICOLOGICO": return "Laudo Psicológico";
      case "PARECER_PSICOLOGICO": return "Parecer Psicológico";
      default: return "Documento";
    }
  }

  return (
    <div className="card-requisicao-documento">
      <div className="card-content">
        <div className="paciente-info">
          <div className="paciente-avatar">
            <img 
              src={solicitacao.paciente.fotoUrl}
              alt={solicitacao.paciente.nome}
            />
          </div>
          <div className="paciente-detalhes">
            <h3 className="paciente-nome">{solicitacao.paciente.nome}</h3>
            <div className="documento-info">
              <span className="documento-tipo">
                <strong>Documento solicitado:</strong> {gerarNome(solicitacao.tipoDocumento)}
              </span>
              <span className="data-solicitacao">
                <strong>Data da solicitação:</strong> {formatDate(solicitacao.data)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="card-acoes">
          <button 
            className="acao-btn aprovar-btn"
            onClick={() => onApprove(solicitacao.id, solicitacao.tipoDocumento)}
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