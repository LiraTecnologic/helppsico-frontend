import "./agendamentoConsulta.css";
import Header from "../../components/layout/header/header";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";
import { useEffect, useState } from "react";
import PsicologoModel from "../../models/psicologo";
import { consultarPsicologoPeloId, consultarVinculoPaciente } from './agendamentoConsulta.service';
import { listarHorariosPsicologo } from '../../services/horarios.service';
import { HorarioModel } from "../../models/horario";
import { cadastrarConsulta } from './agendamentoConsulta.service';
import VinculoModel from "../../models/vinculo";
import PacienteModel from "../../models/paciente";
import EnderecoModel from "../../models/endereco";
import { apresentarErro, notificarErro } from "../../utils/notificacoes";
import ConsultaModel from "../../models/consulta";

export default function AgendamentoConsulta() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [horariosPsicologo, setHorariosPsicologo] = useState<HorarioModel[]>([]);
  const [idsHorariosSelecionados, setIdsHorariosSelecionados] = useState<string[]>([]);
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);

  const idPaciente = "4a0dd9db-3b2a-4c08-8ab3-2af4f6854650";


  async function agendar() {
    if (idsHorariosSelecionados.length === 0) {
      apresentarErro("Selecione ao menos um horário para agendar!");
      return;
    }

    try {
      for (const idHorario of idsHorariosSelecionados) {

        console.log(idHorario);

        if (psicologo) {

          const horario: HorarioModel = {
            id: idHorario,
            psicologo: {} as PsicologoModel,
            diaSemana: 'DOMINGO',
            inicio: '',
            fim: '',
            intervalo: 0,
            duracao: 0,
            disponivel: true
          }

          const paciente: PacienteModel = {
            id: idPaciente,
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            dataNascimento: '',
            genero: 'MASCULINO',
            endereco: psicologo.enderecoAtendimento,
            fotoUrl: ''
          }

          const novaConsulta: ConsultaModel = {
            id: '',
            psicologo: psicologo,
            paciente: paciente,
            valor: 0,
            horario: horario,
            data: '2025-06-08',
            endereco: psicologo.enderecoAtendimento,
            finalizada: false
          }

          await cadastrarConsulta(novaConsulta);
        }
      }

      notificarErro("Consultas agendadas com sucesso!");

    } catch (error) {
      console.error("Erro ao agendar:", error);
      notificarErro("Ocorreu um erro ao agendar. Tente novamente.");
    }
  }

  useEffect(() => {
    async function carregarVinculo(idPaciente: string) {
      const vinculoResponse = await consultarVinculoPaciente(idPaciente);

      if (vinculoResponse.dado) {
        setVinculo(vinculoResponse.dado.content[0]);
      }
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

    if (vinculo && vinculo.psicologo?.id) {
      const idPsicologo = vinculo.psicologo.id;
      carregarPsicologo(idPsicologo);
    }
  }, [vinculo]);

  useEffect(() => {
    async function carregarHorarios(idPsicologo: string) {
      const horariosResponse = await listarHorariosPsicologo(idPsicologo);
      console.log(horariosResponse);
      if (horariosResponse.dado) {
        setHorariosPsicologo(horariosResponse.dado);
      }
    }

    if (vinculo && vinculo.psicologo?.id) {
      const idPsicologo = vinculo.psicologo.id;
      carregarHorarios(idPsicologo);
    }
  }, [vinculo]);


  return (
    <>
      <Header fluxo="" headerPsicologo={false} />
      <main>
        <h1 className="titulo-agendamento-consulta">Consulta</h1>
        <div className="container-psicologo">
          <div className="dados-psicologo-consulta">
            {psicologo &&
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
            {horariosPsicologo &&
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