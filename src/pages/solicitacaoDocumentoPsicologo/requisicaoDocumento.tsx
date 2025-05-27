import { useState, useEffect } from 'react';
import CardRequisicaoDocumento from '../../components/layout/Cards/cardRequisicaoDocumento/requisicaoDocumentoCard';
import { SolicitacaoDocumento, TipoDocumento } from '../../models/documento';
import Header from '../../components/layout/header/header';
import './requisicaoDocumento.css';

export default function RequisicaoDocumento() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoDocumento[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const mockData: SolicitacaoDocumento[] = [
      {
        id: '1',
        documento: {
          id: '1',
          paciente: {
            id: '1',
            nome: 'Pedro Silva',
            email: 'pedro@email.com',
            telefone: '(11) 99999-9999'
          },
          psicologo: {
            id: '1',
            nome: 'Dr. Maria Santos',
            crp: 'CRP 06/123456',
            email: 'maria@psi.com'
          },
          tipoDocumento: TipoDocumento.ATESTADO,
          dataEmissao: '2025-05-13',
          dataValidade: '2025-06-13',
          assinaturaPsicologo: 'Dr. Maria Santos - CRP 06/123456',
          status: 'PENDENTE',
          dataSolicitacao: '2025-05-13'
        },
        status: 'PENDENTE',
        dataSolicitacao: '2025-05-13'
      },
      {
        id: '2',
        documento: {
          id: '2',
          paciente: {
            id: '1',
            nome: 'Pedro Silva',
            email: 'pedro@email.com',
            telefone: '(11) 99999-9999'
          },
          psicologo: {
            id: '1',
            nome: 'Dr. Maria Santos',
            crp: 'CRP 06/123456',
            email: 'maria@psi.com'
          },
          tipoDocumento: TipoDocumento.ATESTADO,
          dataEmissao: '2025-05-13',
          dataValidade: '2025-06-13',
          assinaturaPsicologo: 'Dr. Maria Santos - CRP 06/123456',
          status: 'PENDENTE',
          dataSolicitacao: '2025-05-13'
        },
        status: 'PENDENTE',
        dataSolicitacao: '2025-05-13'
      },
      {
        id: '3',
        documento: {
          id: '3',
          paciente: {
            id: '1',
            nome: 'Pedro Silva',
            email: 'pedro@email.com',
            telefone: '(11) 99999-9999'
          },
          psicologo: {
            id: '1',
            nome: 'Dr. Maria Santos',
            crp: 'CRP 06/123456',
            email: 'maria@psi.com'
          },
          tipoDocumento: TipoDocumento.ATESTADO,
          dataEmissao: '2025-05-13',
          dataValidade: '2025-06-13',
          assinaturaPsicologo: 'Dr. Maria Santos - CRP 06/123456',
          status: 'PENDENTE',
          dataSolicitacao: '2025-05-13'
        },
        status: 'PENDENTE',
        dataSolicitacao: '2025-05-13'
      },
      {
        id: '4',
        documento: {
          id: '4',
          paciente: {
            id: '1',
            nome: 'Pedro Silva',
            email: 'pedro@email.com',
            telefone: '(11) 99999-9999'
          },
          psicologo: {
            id: '1',
            nome: 'Dr. Maria Santos',
            crp: 'CRP 06/123456',
            email: 'maria@psi.com'
          },
          tipoDocumento: TipoDocumento.LAUDO_PSICOLOGICO,
          dataEmissao: '2025-05-13',
          dataValidade: '2025-06-13',
          assinaturaPsicologo: 'Dr. Maria Santos - CRP 06/123456',
          status: 'PENDENTE',
          dataSolicitacao: '2025-05-13'
        },
        status: 'PENDENTE',
        dataSolicitacao: '2025-05-13'
      }
    ];

    
    setTimeout(() => {
      setSolicitacoes(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (solicitacaoId: string) => {
    setSolicitacoes(prev => 
      prev.map(sol => 
        sol.id === solicitacaoId 
          ? { ...sol, status: 'APROVADO' as const }
          : sol
      )
    );
    console.log('Aprovando solicitação:', solicitacaoId);
  };

  const handleReject = (solicitacaoId: string) => {
    setSolicitacoes(prev => 
      prev.map(sol => 
        sol.id === solicitacaoId 
          ? { ...sol, status: 'REJEITADO' as const }
          : sol
      )
    );
    console.log('Rejeitando solicitação:', solicitacaoId);
  };

  if (loading) {
    return (
      <div className="requisicao-documento-page">
        <Header fluxo="" headerPsicologo={true} />
        <div className="page-content">
          <div className="page-header">
            <h1>Pedido de documentos</h1>
            <hr />
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando solicitações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="requisicao-documento-page">
      <Header fluxo="" headerPsicologo={true} />
      <div className="page-content">
        <div className="page-header">
          <h1>Pedido de documentos</h1>
          <hr />
        </div>
        
        <div className="requisicoes-container">
        {solicitacoes.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma solicitação de documento encontrada.</p>
          </div>
        ) : (
          solicitacoes.map(solicitacao => (
            <CardRequisicaoDocumento
              key={solicitacao.id}
              solicitacao={solicitacao}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
    </div>
  );
}