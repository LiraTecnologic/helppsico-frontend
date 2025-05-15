import './solicitiacaoDeVinculo.css';
import Header from '../../components/layout/header/header';
import CardSolicitacao from '../../components/layout/Cards/cardSolicitacao/cardSolicitacao';
import { useEffect, useState } from 'react';
import PopupCancelamento from '../../components/layout/PopupCancelamento/popupCancelamento';
import VinculoModel from '../../models/vinculo';
import { solicitarVinculosPaciente,cancelarSolicitacao } from './solicitiacaoDeVinculoService';
export default function SolicitacaoDeVinculo() {
  const [ popupCancelar, setPopupCancelar ] = useState(false);
  const [vinculoSelecionado, setVinculoSelecionado] = useState<string>('');
  const [vinculos,  setVinculos] = useState<VinculoModel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // const idPaciente = localStorage.getItem('idPaciente');
  const idPaciente = "1";

  useEffect(() => {
    const carregarvinculos = async () => {
      try{
        atualizarCarregando(true);
        const vinculos =  await solicitarVinculosPaciente(idPaciente);
        if (vinculos){
          atualizarVinculos(vinculos);
          atualizarErro(null);
        }


      }catch(error){
        console.error(`Erro ao carregar os vinculos :(  Erro:${error}`);
        atualizarErro('Erro ao carregar os vinculos');
      }finally {
        atualizarCarregando(false);
      }
    }
  })

  const atualizarVinculos = (vinculos: VinculoModel[]) => {
    setVinculos(vinculos);
  }
  const atualizarCarregando = (value: boolean) => {
    setCarregando(value);
  }
  const atualizarErro = (message: string | null) => {
    setErro(message);
  }

  const abrirCancelamento = (vinculoid: string) => {
    setVinculoSelecionado(vinculoid); 
    setPopupCancelar(true);
  }

  

  const fecharCancelamento = () => {
    setPopupCancelar(false);
  };

  const textBotao = (status: string) =>{
    if(status=="PENDENTE"){
      return "Cancelar";
    }
    return "Ver mais";
  }
  
  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      <div className="container">
        <h1>Solicitações</h1>

        <section>
          <h2>Pendentes</h2>
          <div className="cards-grid">
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} onClick={abrirCancelamento(idPaciente)} />
            <CardSolicitacao nome="João Victor Nascimento" idade={19} crp="xxxxxx" avaliacao={4.6} status="Pendente" botao={textBotao("Pendente")} onClick={abrirCancelamento(idPaciente)} />
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

      {popupCancelar && (
        <>
          <PopupCancelamento fechar={fecharCancelamento} />
        </>
      )}
    </>
  );
}
