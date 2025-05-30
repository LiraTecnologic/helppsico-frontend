import "./agendamentoConsulta.css";
import Header from "../../components/layout/header/header";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";
import { useEffect, useState } from "react";
import PsicologoModel from "../../models/psicologo";
import { HorarioPsicologoModel } from "../../models/horarioPsicologo";
import { consultarPsicologoPeloId } from './agendamentoConsulta.service';
import { listarHorariosPsicologo } from '../../services/horarioPsicologo.service'

export default function AgendamentoConsulta() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [horarioPsicologo, setHorarioPsicologo] = useState<HorarioPsicologoModel | null>(null);

  useEffect(() => {
    async function carregarPsicologo(idPsicologo:string) {
      const psicologo = await consultarPsicologoPeloId(idPsicologo);
      setPsicologo(psicologo.dado);
    }

    async function carregarHorarios(idPsicolgo:string) {
      const horarios = await listarHorariosPsicologo(idPsicolgo, 1);
      setHorarioPsicologo(horarios.dado.content)
    }
  }, []);


  return (
    <>
      <Header fluxo="" headerPsicologo={false} />
      <main>
        <h1>Consulta</h1>
        <div className="container-psicologo">
          <div className="dados-psicologo-consulta">
            {psicologo && horarioPsicologo &&
              <CardPsicologoConsulta
                urlFoto={psicologo.fotoUrl}
                nome={psicologo.nome}
                biografia={psicologo.biografia}
                tempoSessao={horarioPsicologo.tempoSessao}
              />
            }
          </div>
          <div>
            {psicologo &&
              <DadosConsultaPsicologo
                selecionado={quantidadeSelecionada}
                valor={psicologo.valorSessao}
                valorTotal={quantidadeSelecionada * psicologo.valorSessao}
              />
            }
          </div>
        </div>
        <div className="campo-atendimento">
          <h2>Dias de Atendimento</h2>
          <div className="tabela-horario-consulta">
            {horarioPsicologo && horarioPsicologo.horarios &&
              <TabelaHorarioConsulta
                horarios={horarioPsicologo.horarios}
                onSelecionado={(qtd) => setQuantidadeSelecionada(qtd)}
              />
            }
          </div>
        </div>

        <div className="container-botao-contulta">
          <button className="botao-agendar-consulta">Agendar</button>
        </div>
      </main>
    </>
  );
}
