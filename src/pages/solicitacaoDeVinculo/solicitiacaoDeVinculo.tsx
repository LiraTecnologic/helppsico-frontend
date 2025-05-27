import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';
import { useState } from 'react';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';

export default function SolicitacaoDeVinculo() {
  const [ popupCancelar, setPopupCancelar ] = useState(false);

  const abrirCancelamento = () => {
    setPopupCancelar(true);
  }

  const fecharCancelamento = () => {
    setPopupCancelar(false);
  };

  const textBotao = (status: string) =>{
    if(status=="Pendente"){
      return "Cancelar";
    }
    return "Ver mais";
  }
  
  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      <div className="solicitacao-vinculo__container">
        <h1 className="solicitacao-vinculo__titulo">Solicitações</h1>

        <section className="solicitacao-vinculo__section">
          <h2 className="solicitacao-vinculo__subtitulo">Pendentes</h2>
          <div className="solicitacao-vinculo__cards-grid">
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} onClick={abrirCancelamento} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} onClick={abrirCancelamento} />
          </div>
        </section>

        <section className="solicitacao-vinculo__section">
          <h2 className="solicitacao-vinculo__subtitulo">Recusados</h2>
          <div className="solicitacao-vinculo__cards-grid">
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
          </div>
        </section>
      </div>

      {popupCancelar && (
        <>
          <PopupCancelamento fechar={fecharCancelamento} />
        </>
      )}
    </>
  );
}
