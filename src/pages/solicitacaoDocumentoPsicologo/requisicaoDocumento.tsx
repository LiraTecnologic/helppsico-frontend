import { useState, useEffect } from 'react';
import CardRequisicaoDocumento from '../../components/layout/Cards/cardRequisicaoDocumento/requisicaoDocumentoCard';
import Header from '../../components/layout/header/header';
import './requisicaoDocumento.css';
import SolicitacaoDocumentoModel from '../../models/solicitacaoDocumento';
import { listarSolicitacoesDocumento, rejeitarSolicitacaoDocumento } from './solicitacaoDocumento.service';
import { useNavigate } from 'react-router';
import { notificarErro } from '../../utils/notificacoes';

export default function RequisicaoDocumento() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoDocumentoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [idPsicologo, setIdPsicologo] = useState<string >('0873d229-fd10-488a-b7e9-f294aa10e5db')

  useEffect(() => {
    const idPsicologo = localStorage.getItem('id-psicologo');

    async function carregarSolicitacoes(id: string) {
      try {
        const solicitacoes = await listarSolicitacoesDocumento(id, 0);

        if (solicitacoes.dado) {
          const solicitacoesAjustadas = solicitacoes.dado.content.map(s => {
            s.status = 'PENDENTE'
            return s;
          });

          setSolicitacoes(solicitacoesAjustadas || []);
        }



      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
      } finally {
        setLoading(false);
      }
    }

    if (idPsicologo) {
      carregarSolicitacoes(idPsicologo);
    }
  }, []);

  const handleApprove = (solicitacaoId: string, tipoDocumento: string, idPaciente: string) => {
    setSolicitacoes(prev =>
      prev.map(sol =>
        sol.id === solicitacaoId
          ? { ...sol, status: 'APROVADO' }
          : sol
      )
    );
    navigate('/psicologo/documento/novo',{state: {tipoDocumento, solicitacaoId, idPsicologo, idPaciente}})
  };

  const handleReject = (solicitacaoId: string) => {
    rejeitarSolicitacaoDocumento(solicitacaoId);

    setSolicitacoes(prev =>
      prev.map(sol =>
        sol.id === solicitacaoId
          ? { ...sol, status: 'REJEITADO' }
          : sol
      )
    );
    notificarErro("Solicitação rejeitada")
    console.log('Rejeitando solicitação:', solicitacaoId);
  };

  // if (loading) {
  //   return (
  //     <div className="requisicao-documento-page">
  //       <Header fluxo="" headerPsicologo={true} />
  //       <div className="page-content">
  //         <div className="page-header">
  //           <h1>Solicitações de Documentos</h1>
  //           <hr />
  //         </div>
  //         <div className="loading-container">
  //           <div className="loading-spinner"></div>
  //           <p>Carregando solicitações...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
};