import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';
import { useEffect, useState, useCallback } from 'react';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';
import VinculoModel, { StatusVinculo } from '../../models/vinculo'; 
import { solicitarVinculosPaciente, cancelarSolicitacao } from './solicitiacaoDeVinculoService';

export default function SolicitacaoDeVinculo() {
  const [popupCancelar, setPopupCancelar] = useState(false);
  const [vinculoSelecionadoId, setVinculoSelecionadoId] = useState<string | null>(null);
  const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // const idPaciente = localStorage.getItem('idPaciente');
  const idPaciente = "1"; 

  const carregarVinculos = useCallback(async () => {

    if (!idPaciente) {
      setErro("ID do paciente não encontrado.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {

      const dadosVinculos = await solicitarVinculosPaciente(idPaciente);
      setVinculos(dadosVinculos);

    } catch (error) {

      console.error(`Erro ao carregar os vinculos :(  Erro:`, error);
      setErro('Erro ao carregar os vinculos. Tente novamente mais tarde.');

    } finally {

      setCarregando(false);

    }
  }, [idPaciente]);

  useEffect(() => {
    carregarVinculos();
  }, [carregarVinculos]);

  const abrirPopupCancelamento = (idVinculo: string) => {
    setVinculoSelecionadoId(idVinculo);
    setPopupCancelar(true);
  };

  const fecharPopupCancelamento = () => {
    setPopupCancelar(false);
    setVinculoSelecionadoId(null);
  };

  const handleConfirmarCancelamento = async () => {

    if (!vinculoSelecionadoId) return;
    try {

      await cancelarSolicitacao(vinculoSelecionadoId);
      fecharPopupCancelamento();
      carregarVinculos(); 

    } catch (error) {

      console.error("Erro ao cancelar solicitação:", error);
      setErro("Falha ao cancelar a solicitação. Tente novamente.");
     
    }
  };

  const vinculosPendentes = vinculos.filter(v => v.status === StatusVinculo.PENDENTE);
  const vinculosRecusados = vinculos.filter(v => v.status === StatusVinculo.INATIVO);

  if (carregando) {
    return (
      <>
        <Header fluxo="minhasSessoes" headerPsicologo={false} />
        <div className="container">
          <h1>Solicitações</h1>
          <p>Carregando...</p>
        </div>
      </>
    );
  }

  if (erro) {
    return (
      <>
        <Header fluxo="minhasSessoes" headerPsicologo={false} />
        <div className="container">
          <h1>Solicitações</h1>
          <p style={{ color: 'red' }}>{erro}</p>
          <button onClick={carregarVinculos}>Tentar Novamente</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      <div className="solicitacao-vinculo__container">
        <h1 className="solicitacao-vinculo__titulo">Solicitações</h1>
        {vinculosPendentes.length > 0 && (
          <section className='solicitacao-vinculo__section'>
            <h2 className='solicitacao-vinculo__subtitulo'>Pendentes</h2>
            <div className="cards-grid">
              {vinculosPendentes.map((vinculo) => (
                <CardSolicitacao
                  key={vinculo.id}
                  nome={vinculo.psicologo.nome} 
                  idade={vinculo.psicologo.idade} 
                  crp={vinculo.psicologo.crp} 
                  avaliacao={vinculo.psicologo.avaliacao} 
                  status="Pendente"
                  botao="Cancelar"
                  onClick={() => abrirPopupCancelamento(vinculo.id)}
                />
              ))}
            </div>
          </section>
        )}

        {vinculosRecusados.length > 0 && (
          <section className='solicitacao-vinculo__section'>
            <h2 className='solicitacao-vinculo__subtitulo'>Recusados</h2>
            <div className="solicitacao-vinculo__cards-grid">
              {vinculosRecusados.map((vinculo) => (
                <CardSolicitacao
                  key={vinculo.id}
                  nome={vinculo.psicologo.nome}
                  idade={vinculo.psicologo.idade}
                  crp={vinculo.psicologo.crp}
                  avaliacao={vinculo.psicologo.avaliacao}
                  status="Recusado"
                  botao="Ver mais" 
                  
                />
              ))}
            </div>
          </section>
        )}

        {(vinculosPendentes.length === 0 && vinculosRecusados.length === 0 && !carregando) && (
            <p>Nenhuma solicitação encontrada.</p>
        )}
      </div>

      {popupCancelar && vinculoSelecionadoId && (
        <PopupCancelamento
          fechar={fecharPopupCancelamento}
          onConfirm={handleConfirmarCancelamento} 
          titulo='Deseja realmente cancelar a solicitação ?'
        />
      )}
    </>
  );
}
