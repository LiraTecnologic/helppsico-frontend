import "./gerenciamentoHorarios.css";
import Header from "../../components/layout/header/header";
import { useState } from "react";
import ConfiguracaoHorario from "../../components/layout/configurarHorario/configurarHorario";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";

export default function GerenciamentoDeHorarios() {
  const [hasConfig, setHasConfig] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [tempoSessao, setTempoSessao] = useState<number>(50);
  const [intervaloSessao, setIntervaloSessao] = useState<number>(10);
  const [horaInicio, setHoraInicio] = useState<string>("08:00");
  const [horaFim, setHoraFim] = useState<string>("18:00");

  const ordemDias = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

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
