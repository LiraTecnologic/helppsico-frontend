import React, { useState, useEffect, useCallback } from 'react';
import './solicitacaoVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacaoVinculo from '../../components/layout/Cards/cardSolicitacaoPsicologo/cardSolicitacaoPsicologo';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';
import VinculoModel, { StatusVinculo } from '../../models/vinculo';
import { solicitarVinculosPsicologo, aceitarSolicitacao, recusarSolicitacao } from './solicitacaoVinculoService';
import calcular from '../../utils/calculoData';

export default function SolicitacaoDeVinculoPsicologo() {
  const [popupAceitar, setPopupAceitar] = useState(false);
  const [popupRecusar, setPopupRecusar] = useState(false);
  const [vinculoSelecionadoId, setVinculoSelecionadoId] = useState<string | null>(null);
  const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // const idPsicologo = localStorage.getItem('idPsicologo');
  const idPsicologo = "1";

  const carregarVinculos = useCallback(async () => {
    if (!idPsicologo) {
      setErro("ID do psicólogo não encontrado.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      const dadosVinculos = await solicitarVinculosPsicologo(idPsicologo);
      setVinculos(dadosVinculos);
    } catch (error) {
      console.error(`Erro ao carregar os vinculos :(  Erro:`, error);
      setErro('Erro ao carregar os vinculos. Tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  }, [idPsicologo]);

  useEffect(() => {
    window.scrollTo(0, 0);
    carregarVinculos();
  }, [carregarVinculos]);

  const abrirPopupAceitacao = (idVinculo: string) => {
    setVinculoSelecionadoId(idVinculo);
    setPopupAceitar(true);
  };

  const abrirPopupRecusa = (idVinculo: string) => {
    setVinculoSelecionadoId(idVinculo);
    setPopupRecusar(true);
  };

  const fecharPopups = () => {
    setPopupAceitar(false);
    setPopupRecusar(false);
    setVinculoSelecionadoId(null);
  };

  const handleConfirmarAceitacao = async () => {
    if (!vinculoSelecionadoId) return;
    
    try {
      await aceitarSolicitacao(vinculoSelecionadoId);
      fecharPopups();
      carregarVinculos();
    } catch (error) {
      console.error("Erro ao aceitar solicitação:", error);
      setErro("Falha ao aceitar a solicitação. Tente novamente.");
    }
  };

  const handleConfirmarRecusa = async () => {
    if (!vinculoSelecionadoId) return;
    
    try {
      await recusarSolicitacao(vinculoSelecionadoId);
      fecharPopups();
      carregarVinculos();
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
      setErro("Falha ao recusar a solicitação. Tente novamente.");
    }
  };

  const handleAceitarSolicitacao = (idVinculo: string) => {
    abrirPopupAceitacao(idVinculo);
  };

  const handleRecusarSolicitacao = (idVinculo: string) => {
    abrirPopupRecusa(idVinculo);
  };

  const vinculosPendentes = vinculos.filter(v => v.status === StatusVinculo.PENDENTE);
  const vinculosRecusados = vinculos.filter(v => v.status === StatusVinculo.INATIVO);

  if (carregando) {
    return (
      <>
        <Header fluxo="" headerPsicologo={true} />
        <div className="solicitacao-vinculo-psicologo__container">
          <h1 className="solicitacao-vinculo-psicologo__titulo">Solicitações de Pacientes</h1>
          <p>Carregando...</p>
        </div>
      </>
    );
  }

  if (erro) {
    return (
      <>
        <Header fluxo="" headerPsicologo={true} />
        <div className="solicitacao-vinculo-psicologo__container">
          <h1 className="solicitacao-vinculo-psicologo__titulo">Solicitações de Pacientes</h1>
          <p style={{ color: 'red' }}>{erro}</p>
          <button onClick={carregarVinculos}>Tentar Novamente</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header fluxo="" headerPsicologo={true} />
      <div className="solicitacao-vinculo-psicologo__container">
        <h1 className="solicitacao-vinculo-psicologo__titulo">Solicitações de Pacientes</h1>
        
        {vinculosPendentes.length > 0 && (
          <section className='solicitacao-vinculo-psicologo__section'>
            <h2 className='solicitacao-vinculo-psicologo__subtitulo'>Pendentes</h2>
            <div className="solicitacao-vinculo-psicologo__cards-grid">
              {vinculosPendentes.map((vinculo) => (
                <CardSolicitacaoVinculo
                  key={vinculo.id}
                  nome={vinculo.paciente.nome}
                  idade={calcular(vinculo.paciente.dataNascimento)}
                  cpf={vinculo.paciente.cpf}
                  telefone={vinculo.paciente.telefone}
                  status="Pendente"
                  botao="Aceitar"
                  onClick={() => handleAceitarSolicitacao(vinculo.id)}
                  onSecondaryAction={() => handleRecusarSolicitacao(vinculo.id)}
                />
              ))}
            </div>
          </section>
        )}

        {vinculosRecusados.length > 0 && (
          <section className='solicitacao-vinculo-psicologo__section'>
            <h2 className='solicitacao-vinculo-psicologo__subtitulo'>Recusados</h2>
            <div className="solicitacao-vinculo-psicologo__cards-grid">
              {vinculosRecusados.map((vinculo) => (
                <CardSolicitacaoVinculo
                  key={vinculo.id}
                  nome={vinculo.paciente.nome}
                  idade={calcular(vinculo.paciente.dataNascimento)}
                  cpf={vinculo.paciente.cpf}
                  telefone={vinculo.paciente.telefone}
                  status="Recusado"
                />
              ))}
            </div>
          </section>
        )}

        {(vinculosPendentes.length === 0 && vinculosRecusados.length === 0 && !carregando) && (
          <div className="solicitacao-vinculo-psicologo__vazio">
            <p>Nenhuma solicitação encontrada.</p>
          </div>
        )}
      </div>

      {popupAceitar && vinculoSelecionadoId && (
        <PopupCancelamento
          fechar={fecharPopups}
          onConfirm={handleConfirmarAceitacao}
          titulo="Deseja aceitar esse paciente?"
        />
      )}

      {popupRecusar && vinculoSelecionadoId && (
        <PopupCancelamento
          fechar={fecharPopups}
          onConfirm={handleConfirmarRecusa}
          titulo="Deseja recusar esse paciente?"
        />
      )}
    </>
  );
}