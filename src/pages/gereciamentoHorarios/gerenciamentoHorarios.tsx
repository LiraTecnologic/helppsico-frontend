import "./gerenciamentoHorarios.css";
import Header from "../../components/layout/header/header";
import { useEffect, useState } from "react";
import ConfiguracaoHorario from "../../components/layout/configurarHorario/configurarHorario";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";
import { buscarHorarios } from "./gerenciamentoHorariosService";
import HorarioModel from "../../models/horario";

export default function GerenciamentoDeHorarios() {
  const [hasConfig, setHasConfig] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("18:00");
  const [tempoSessao, setTempoSessao] = useState<number>(50);
  const [intervaloSessao, setIntervaloSessao] = useState<number>(10);

  const ordemDias = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  useEffect(() => {
    async function carregarHorarios() {
      try {
        const data = await buscarHorarios();
        if (data.length === 0) {
          setHasConfig(false);
        } else {
          setHasConfig(true);
          setHorarios(data);
          const diasUnicos = [...new Set(data.map(h => h.diaSemana))];
          setDiasSelecionados(diasUnicos);
          setHoraInicio(data[0].inicio);
          setHoraFim(data[0].fim);
        }
      } catch (err) {
        console.error("Erro ao carregar horários:", err);
      }
    }

    carregarHorarios();
  }, []);

  return (
    <>
      <Header fluxo="" headerPsicologo={true} />
      <div className="container-gerenciamento">
        {!hasConfig ? (
          <div className="sem-config">
            <h1>Nenhum horário configurado ainda</h1>
            <h2>Clique para configurar agora</h2>
            <button onClick={() => setOpenModal(true)}>Configurar</button>
          </div>
        ) : (
          <TabelaHorarios
            dias={diasSelecionados}
            inicio={horaInicio}
            fim={horaFim}
            duracao={tempoSessao}
            intervalo={intervaloSessao}
            onEditar={() => setOpenModal(true)}
            horarios={horarios} // novo prop
          />
        )}
      </div>

      {openModal && (
        <ConfiguracaoHorario
          onClose={() => setOpenModal(false)}
          onSave={(dias, tempo, intervalo, inicio, fim) => {
            const diasOrdenados = [...dias].sort(
              (a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b)
            );
            setDiasSelecionados(diasOrdenados);
            setTempoSessao(tempo);
            setIntervaloSessao(intervalo);
            setHoraInicio(inicio);
            setHoraFim(fim);
            setHasConfig(true);
            setOpenModal(false);
          }}
          dias={diasSelecionados}
          tempo={tempoSessao}
          intervalo={intervaloSessao}
          inicio={horaInicio}
          fim={horaFim}
        />
      )}
    </>
  );
}
