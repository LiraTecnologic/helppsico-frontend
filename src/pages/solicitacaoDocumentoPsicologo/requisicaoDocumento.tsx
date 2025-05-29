import React from 'react';
import { useState, useEffect } from 'react';
import CardRequisicaoDocumento from '../../components/layout/Cards/cardRequisicaoDocumento/requisicaoDocumentoCard';
import Header from '../../components/layout/header/header';
import './requisicaoDocumento.css';


enum TipoDocumento {
  ATESTADO = 'ATESTADO',
  DECLARACAO = 'DECLARACAO',
  RELATORIO_PSICOLOGICO = 'RELATORIO_PSICOLOGICO',
  RELATORIO_MULTIPROFISSIONAL = 'RELATORIO_MULTIPROFISSIONAL',
  LAUDO_PSICOLOGICO = 'LAUDO_PSICOLOGICO',
  PARECER_PSICOLOGICO = 'PARECER_PSICOLOGICO'
}


type Solicitacao = {
  id: string;
  documento: {
    id: string;
    paciente: {
      id: string;
      nome: string;
      email: string;
      telefone: string;
    };
    psicologo: {
      id: string;
      nome: string;
      crp: string;
      email: string;
    };
    tipoDocumento: TipoDocumento; 
    dataEmissao: string;
    dataValidade: string;
    assinaturaPsicologo: string;
    status: string;
    dataSolicitacao: string;
  };
  status: string;
  dataSolicitacao: string;
};


const mockData: Solicitacao[] = [
  {
    id: '1',
    documento: {
      id: '1',
      paciente: {
        id: '1',
        nome: 'Nome do Paciente',
        email: 'paciente@email.com',
        telefone: '(00) 00000-0000',
      },
      psicologo: {
        id: '1',
        nome: 'Nome do Psicólogo',
        crp: '12345',
        email: 'psicologo@email.com',
      },
      tipoDocumento: TipoDocumento.ATESTADO,
      dataEmissao: '2024-01-01',
      dataValidade: '2024-12-31',
      assinaturaPsicologo: 'Assinatura Digital',
      status: 'PENDENTE',
      dataSolicitacao: '2024-01-01',
    },
    status: 'PENDENTE',
    dataSolicitacao: '2024-01-01'
  }
];

const RequisicaoDocumento: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSolicitacoes(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (solicitacaoId: string) => {
    setSolicitacoes(prev => 
      prev.map(sol => 
        sol.id === solicitacaoId 
          ? { ...sol, status: 'APROVADO' }
          : sol
      )
    );
    console.log('Aprovando solicitação:', solicitacaoId);
  };

  const handleReject = (solicitacaoId: string) => {
    setSolicitacoes(prev => 
      prev.map(sol => 
        sol.id === solicitacaoId 
          ? { ...sol, status: 'REJEITADO' }
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
            <h1>Solicitações de Documentos</h1>
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
          <h1>Solicitações de Documentos</h1>
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

export default RequisicaoDocumento;