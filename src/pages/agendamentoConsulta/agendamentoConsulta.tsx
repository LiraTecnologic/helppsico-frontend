import "./agendamentoConsulta.css";
import Header from "../../components/layout/header/header";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";

import { useEffect, useState } from "react";
import { consultarPsicologoPeloId, consultarVinculoPaciente, cadastrarConsulta } from './agendamentoConsulta.service';
import { listarHorariosPsicologo } from '../../services/horarios.service';

import PsicologoModel from "../../models/psicologo";
import { HorarioModel } from "../../models/horario";
import VinculoModel from "../../models/vinculo";
import PacienteModel from "../../models/paciente";
import ConsultaModel from "../../models/consulta";

import { apresentarErro, notificarErro, notificarSucesso } from "../../utils/notificacoes";

export default function AgendamentoConsulta() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [horariosPsicologo, setHorariosPsicologo] = useState<HorarioModel[]>([]);
  const [idsHorariosSelecionados, setIdsHorariosSelecionados] = useState<string[]>([]);
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);

  const idPaciente = localStorage.getItem("id-paciente");

  async function agendar() {
    if (!idPaciente) {
      apresentarErro("Paciente não identificado. Faça login novamente.");
      return;
    }

    if (idsHorariosSelecionados.length === 0) {
      apresentarErro("Selecione ao menos um horário para agendar!");
      return;
    }

    if (!psicologo || !vinculo) return;

    try {
      for (const idHorario of idsHorariosSelecionados) {
        const horarioSelecionado = horariosPsicologo.find(h => h.id === idHorario);
        if (!horarioSelecionado) continue;

        const paciente: PacienteModel = {
          id: idPaciente,
          nome: "",
          cpf: "",
          email: "",
          telefone: "",
          dataNascimento: "",
          genero: "MASCULINO",
          endereco: psicologo.enderecoAtendimento,
          fotoUrl: ""
        };

        const novaConsulta: ConsultaModel = {
          id: "",
          psicologo,
          paciente,
          valor: psicologo.valorSessao,
          horario: horarioSelecionado,
          data: new Date().toISOString().split("T")[0],
          endereco: psicologo.enderecoAtendimento,
          finalizada: false
        };

        await cadastrarConsulta(novaConsulta);
      }

      notificarSucesso("Consultas agendadas com sucesso!");
      setIdsHorariosSelecionados([]);
      setQuantidadeSelecionada(0);

    } catch (error) {
      console.error("Erro ao agendar:", error);
      notificarErro("Ocorreu um erro ao agendar. Tente novamente.");
    }
  }

  useEffect(() => {
    if (!idPaciente) return;

    async function carregarVinculo() {
      const resposta = await consultarVinculoPaciente(idPaciente);
      if (resposta.dado?.content?.[0]) {
        setVinculo(resposta.dado.content[0]);
      }
    }

    carregarVinculo();
  }, [idPaciente]);

  useEffect(() => {
    async function carregarPsicologo(id: string) {
      const resposta = await consultarPsicologoPeloId(id);
      if (resposta.dado) {
        setPsicologo(resposta.dado);
      }
    }

    if (vinculo?.psicologo?.id) {
      carregarPsicologo(vinculo.psicologo.id);
    }
  }, [vinculo]);

  useEffect(() => {
    async function carregarHorarios(id: string) {
      const resposta = await listarHorariosPsicologo(id);
      if (resposta.dado) {
        setHorariosPsicologo(resposta.dado);
      }
    }

    if (vinculo?.psicologo?.id) {
      carregarHorarios(vinculo.psicologo.id);
    }
  }, [vinculo]);

  return (
    <>
      <Header fluxo="horario" headerPsicologo={false} />
      <main>
        <h1>Consulta</h1>

        <div className="container-psicologo">
          {psicologo && (
            <>
              <div className="dados-psicologo-consulta">
                <CardPsicologoConsulta
                  urlFoto={psicologo.fotoUrl}
                  nome={psicologo.nome}
                  biografia={psicologo.biografia}
                  tempoSessao={psicologo.tempoSessao}
                />
              </div>

              <DadosConsultaPsicologo
                selecionado={quantidadeSelecionada}
                valor={psicologo.valorSessao}
                valorTotal={quantidadeSelecionada * psicologo.valorSessao}
              />
            </>
          )}
        </div>

        <div className="campo-atendimento">
          <h2>Dias de Atendimento</h2>
          <div className="tabela-horario-consulta">
            {horariosPsicologo.length > 0 && (
              <TabelaHorarioConsulta
                horarios={horariosPsicologo}
                onSelecionado={setQuantidadeSelecionada}
                onSelecionadosChange={setIdsHorariosSelecionados}
                alterar={true}
              />
            )}
          </div>
        </div>

        <div className="container-botao-contulta">
          <button className="botao-agendar-consulta" onClick={agendar}>
            Agendar
          </button>
        </div>
      </main>
    </>
  );
}