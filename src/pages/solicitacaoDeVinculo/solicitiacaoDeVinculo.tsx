import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';
import { useEffect, useState } from 'react';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';
import { StatusVinculo } from '../../models/vinculo';
import VinculoModel from '../../models/vinculo';
import { solicitarVinculosPaciente, cancelarSolicitacao } from './solicitiacaoDeVinculoService';
import calcular from '../../utils/calculoData';
import calcularMedia from '../../utils/mediaAvaliacao';
import { AvaliacaoModel } from '../../models/avaliacoes';
import { listarAvaliacoesPorPsicologo } from '../../services/listarAvaliacoesPorPsicologo';

export default function SolicitacaoDeVinculo() {
  const [popupCancelar, setPopupCancelar] = useState(false);
  const [vinculoSelecionadoId, setVinculoSelecionadoId] = useState<string | null>(null);
  const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [idPaciente, setIdPaciente] = useState('');
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>([]);


  async function carregarVinculos(idPaciente: string) {
    if (!idPaciente) {
      setErro("ID do paciente não encontrado.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {

      const dadosVinculos = await solicitarVinculosPaciente(idPaciente, 0);

      if(dadosVinculos.dado) {
        setVinculos(dadosVinculos.dado.content);
      }

      

    } catch (error) {

      console.error(`Erro ao carregar os vinculos Erro:`, error);
      setErro('Erro ao carregar os vinculos. Tente novamente mais tarde.');

    } finally {

      setCarregando(false);

    }
  };


  function filtrarAvaliacoesPorPsicologo(idPsicologo: string) {
    return avaliacoes.filter(avaliacao => avaliacao.psicologo.id = idPsicologo);
  }

  useEffect(() => {
    const id = localStorage.getItem('id-paciente');

    async function carregarAvaliacoes() {
      
    
      const avaliacoes = await listarAvaliacoesPorPsicologo(idPaciente, 0);
    
      if(avaliacoes.dado) {
        setAvaliacoes(avaliacoes.dado.content);
      }

    }

    if (id) {
      setIdPaciente(id);
      carregarVinculos(idPaciente);
      carregarAvaliacoes();
      
    } else {
      console.log('Id paciente null');
    }
  }, [])

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
      carregarVinculos(idPaciente);

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
        <Header fluxo="solicitacoesVinculo" headerPsicologo={false} />
        <div className="container">
          <h1>Solicitações</h1>
          <p>Carregando...</p>
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
                  idade={calcular(vinculo.psicologo.dataNascimento)}
                  crp={vinculo.psicologo.crp}
                  avaliacao={
                    calcularMedia(filtrarAvaliacoesPorPsicologo(vinculo.psicologo.id))
                  }
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
                  idade={calcular(vinculo.psicologo.dataNascimento)}
                  crp={vinculo.psicologo.crp}
                  avaliacao={
                    calcularMedia(filtrarAvaliacoesPorPsicologo(vinculo.psicologo.id))
                  }
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
        />
      )}
    </>
  );
}
