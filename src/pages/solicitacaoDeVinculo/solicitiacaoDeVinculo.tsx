import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';

export default function SolicitacaoDeVinculo() {
  const textBotao = (status: string) =>{
    if(status=="Pendente"){
      return "Cancelar";
    }
    return "Ver mais";
  }
  
  return (
    <>
      <Header fluxo="minhasSessoes" />
      <div className="container">
        <h1>Solicitações</h1>

        <section>
          <h2>Pendentes</h2>
          <div className="cards-grid">
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} />
          </div>
        </section>

        <section>
          <h2>Recusados</h2>
          <div className="cards-grid">
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Recusado" botao={textBotao("Recusado")} />
          </div>
        </section>
      </div>
    </>
  );
}
