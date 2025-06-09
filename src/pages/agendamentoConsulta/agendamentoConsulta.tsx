import "./agendamentoConsulta.css";
import Header from "../../components/layout/header/header";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";
import { useEffect, useState } from "react";
import PsicologoModel from "../../models/psicologo";
import { consultarPsicologoPeloId, cadastrarConsulta, consultarVinculoPaciente } from './agendamentoConsulta.service';
import { listarHorariosPsicologo } from '../../services/horarioPsicologo.service'
import { HorarioModel } from "../../models/horario";
import ConsultaModel from "../../models/consulta";
import PacienteModel from "../../models/paciente";
import EnderecoModel from "../../models/endereco";
import VinculoModel from "../../models/vinculo";

export default function AgendamentoConsulta() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [horariosPsicologo, setHorariosPsicologo] = useState<HorarioModel[]>([]);
  const [idsHorariosSelecionados, setIdsHorariosSelecionados] = useState<string[]>([]);
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);

  // const idPaciente = localStorage.getItem('id-paciente');
  const idPaciente = 'teste';

  async function agendar() {
    if (idsHorariosSelecionados.length === 0) {
      alert("Selecione ao menos um horário para agendar!");
      return;
    }

    try {
      for (const idHorario of idsHorariosSelecionados) {

        if (psicologo) {


          let paciente: PacienteModel = {} as PacienteModel;

          if (idPaciente) {
            paciente = {
              id: idPaciente,
              nome: '',
              cpf: '',
              email: '',
              telefone: '',
              dataNascimento: '',
              genero: 'MASCULINO',
              endereco: {} as EnderecoModel,
              fotoUrl: ''
            }
          }
          const horario: HorarioModel = {
            id: idHorario,
            diaSemana: [], 
            inicio: '',
            fim: '',
            disponivel: true,
            psicologo: psicologo,
            intervalo: 0, 
            duracao: 0    
          }


          const novaConsulta: ConsultaModel = {
            id: '',
            psicologo: psicologo,
            paciente: paciente,
            valor: psicologo.valorSessao,
            dataHora: horario,
            endereco: psicologo.enderecoAtendimento,
            finalizada: false
          }

          await cadastrarConsulta(novaConsulta);
        }
      }

      alert("Consultas agendadas com sucesso!");

    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Ocorreu um erro ao agendar. Tente novamente.");
    }
  }

  useEffect(() => {
    async function carregarVinculo(idPaciente: string) {
      const vinculoResponse = await consultarVinculoPaciente(idPaciente);
      setVinculo(vinculoResponse.dado);
    }

    if (idPaciente) {
      carregarVinculo(idPaciente);
    }
  }, [idPaciente]);

  useEffect(() => {
    async function carregarPsicologo(idPsicologo: string) {
      const psicologoResponse = await consultarPsicologoPeloId(idPsicologo);
      setPsicologo(psicologoResponse.dado);
    }

    async function carregarHorarios(idPsicologo: string) {
      const horariosResponse = await listarHorariosPsicologo(idPsicologo, 1);
      setHorariosPsicologo(horariosResponse.dado.content);
    }

    if (vinculo && vinculo.psicologo?.id) {
      const idPsicologo = vinculo.psicologo.id;
      carregarPsicologo(idPsicologo);
      carregarHorarios(idPsicologo);
    }
  }, [vinculo]);

  return (
    <>
      <Header fluxo="" headerPsicologo={false} />
      <main>
        <h1>Consulta</h1>
        <div className="container-psicologo">
          <div className="dados-psicologo-consulta">
            {psicologo && horariosPsicologo &&
              <CardPsicologoConsulta
                urlFoto={psicologo.fotoUrl}
                nome={psicologo.nome}
                biografia={psicologo.biografia}
                tempoSessao={psicologo.tempoSessao}
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
            {horariosPsicologo && horariosPsicologo &&
              <TabelaHorarioConsulta
                horarios={horariosPsicologo}
                onSelecionado={(qtd) => setQuantidadeSelecionada(qtd)}
                onSelecionadosChange={(ids) => setIdsHorariosSelecionados(ids)} 
              />
            }
          </div>
        </div>

        <div className="container-botao-contulta">
          <button className="botao-agendar-consulta" onClick={agendar}>Agendar</button>
        </div>
      </main>
    </>
  );
}