import React, { useState } from 'react';
import './solicitacaoVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacaoVinculo from '../../components/layout/Cards/cardSolicitacaoPsicologo/cardSolicitacaoPsicologo';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';

const dadosMockados = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    idade: 28,
    cpf: '123.456.789-01',
    telefone: '(11) 99999-1234',
    status: 'Pendente'
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    idade: 34,
    cpf: '987.654.321-09',
    telefone: '(11) 88888-5678',
    status: 'Pendente'
  },
  {
    id: '3',
    nome: 'Ana Carolina Lima',
    idade: 22,
    cpf: '456.789.123-45',
    telefone: '(11) 77777-9012',
    status: 'Recusado'
  },
  {
    id: '4',
    nome: 'Carlos Eduardo Costa',
    idade: 41,
    cpf: '321.654.987-32',
    telefone: '(11) 66666-3456',
    status: 'Recusado'
  },
  {
    id: '5',
    nome: 'Fernanda Souza',
    idade: 26,
    cpf: '789.123.456-78',
    telefone: '(11) 55555-7890',
    status: 'Pendente'
  }
];

export default function SolicitacaoDeVinculoPsicologo() {
  const [popupCancelar, setPopupCancelar] = useState(false);
  const [vinculoSelecionadoId, setVinculoSelecionadoId] = useState<string | null>(null);
  const [vinculos, setVinculos] = useState(dadosMockados);

  const abrirPopupCancelamento = (idVinculo: string) => {
    setVinculoSelecionadoId(idVinculo);
    setPopupCancelar(true);
  };

  const fecharPopupCancelamento = () => {
    setPopupCancelar(false);
    setVinculoSelecionadoId(null);
  };

  const handleConfirmarCancelamento = () => {
    if (!vinculoSelecionadoId) return;
    
    // Remove o vínculo da lista (simulando cancelamento)
    setVinculos(prev => prev.filter(vinculo => vinculo.id !== vinculoSelecionadoId));
    fecharPopupCancelamento();
  };

  const handleAceitarSolicitacao = (idVinculo: string) => {
    // Implementar lógica para aceitar solicitação
    console.log('Aceitar solicitação:', idVinculo);
    // Aqui você pode atualizar o status ou fazer outras ações
  };

  const handleRecusarSolicitacao = (idVinculo: string) => {
    // Atualiza o status para recusado
    setVinculos(prev => 
      prev.map(vinculo => 
        vinculo.id === idVinculo 
          ? { ...vinculo, status: 'Recusado' }
          : vinculo
      )
    );
  };

  const handleVerMais = (idVinculo: string) => {
    // Implementar lógica para ver mais detalhes
    console.log('Ver mais detalhes:', idVinculo);
  };

  const vinculosPendentes = vinculos.filter(v => v.status === 'Pendente');
  const vinculosRecusados = vinculos.filter(v => v.status === 'Recusado');

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={true} />
      <div className="solicitacao-vinculo-psicologo__container">
        <h1 className="solicitacao-vinculo-psicologo__titulo">Solicitações de Vínculo</h1>
        
        {vinculosPendentes.length > 0 && (
          <section className='solicitacao-vinculo-psicologo__section'>
            <h2 className='solicitacao-vinculo-psicologo__subtitulo'>Pendentes</h2>
            <div className="solicitacao-vinculo-psicologo__cards-grid">
              {vinculosPendentes.map((vinculo) => (
                <CardSolicitacaoVinculo
                  key={vinculo.id}
                  nome={vinculo.nome}
                  idade={vinculo.idade}
                  cpf={vinculo.cpf}
                  telefone={vinculo.telefone}
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
                  nome={vinculo.nome}
                  idade={vinculo.idade}
                  cpf={vinculo.cpf}
                  telefone={vinculo.telefone}
                  status="Recusado"
                  botao="Ver mais"
                  onClick={() => handleVerMais(vinculo.id)}
                />
              ))}
            </div>
          </section>
        )}

        {(vinculosPendentes.length === 0 && vinculosRecusados.length === 0) && (
          <div className="solicitacao-vinculo-psicologo__vazio">
            <p>Nenhuma solicitação encontrada.</p>
          </div>
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