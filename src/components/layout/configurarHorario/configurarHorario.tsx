import { useState } from "react";
import "./configurarHorario.css";

interface ConfiguracaoHorarioProps {
  onClose: () => void;
  onSave: (
    diasSelecionados: string[],
    tempoSessao: number,
    intervaloSessao: number,
    horaInicio: string,
    horaFim: string
  ) => void;
  dias?: string[];
  tempo?: number;
  intervalo?: number;
  inicio?: string;
  fim?: string;
}

export default function ConfiguracaoHorario({
  onClose,
  onSave,
  dias,
  tempo,
  intervalo,
  inicio,
  fim,
}: ConfiguracaoHorarioProps) {
  const diasSemana: string[] = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  const [diasSelecionados, setDiasSelecionados] = useState<string[]>(dias ?? []);
  const [tempoSessao, setTempoSessao] = useState<number | undefined>(tempo ?? 50);
  const [intervaloSessao, setIntervaloSessao] = useState<number | undefined>(intervalo ?? 10);
  const [horaInicio, setHoraInicio] = useState<string>(inicio ?? "07:00");
  const [horaFim, setHoraFim] = useState<string>(fim ?? "18:00");
  const [erro, setErro] = useState<string>("");

  const toggleDia = (dia: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const validarESalvar = () => {
    if (diasSelecionados.length === 0) {
      setErro("Selecione pelo menos um dia de atendimento.");
      return;
    }

    if (tempoSessao === undefined || isNaN(tempoSessao) || tempoSessao < 30) {
      setErro("O tempo de sessão deve ser de no mínimo 30 minutos.");
      return;
    }

    if (intervaloSessao === undefined || isNaN(intervaloSessao) || intervaloSessao < 0) {
      setErro("O tempo de intervalo deve ser maior ou igual a 0.");
      return;
    }

    const [inicioH, inicioM] = horaInicio.split(":").map(Number);
    const [fimH, fimM] = horaFim.split(":").map(Number);

    const inicioEmMinutos = inicioH * 60 + inicioM;
    const fimEmMinutos = fimH * 60 + fimM;

    if (fimEmMinutos <= inicioEmMinutos) {
      setErro("O horário de fim deve ser maior que o de início.");
      return;
    }

    if (fimEmMinutos - inicioEmMinutos < tempoSessao) {
      setErro("O expediente deve permitir pelo menos uma sessão completa.");
      return;
    }

    const body = JSON.stringify({
      diasSelecionados,
      tempoSessao,
      intervaloSessao,
      horaInicio,
      horaFim,
    });

    localStorage.setItem("infoConfigHorarios", body);
    setErro("");
    onSave(diasSelecionados, tempoSessao, intervaloSessao, horaInicio, horaFim);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Configuração de horários</h2>

        {erro && <div className="erro">{erro}</div>}

        <div className="dias-atendimento">
          <label>Dias de atendimento</label>
          <div className="dias-botoes">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                className={diasSelecionados.includes(dia) ? "ativo" : ""}
                onClick={() => toggleDia(dia)}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="tempo-sessao">
          <label>Tempo de sessão (mínimo 30 minutos)</label>
          <input
            type="number"
            value={tempoSessao === undefined ? "" : tempoSessao}
            onFocus={() => {
              if (tempoSessao === 0) setTempoSessao(undefined);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setTempoSessao(value === "" ? undefined : Number(value));
            }}
            min={1}
          />
        </div>

        <div className="tempo-sessao">
          <label>Tempo de intervalo entre sessões (em minutos)</label>
          <input
            type="number"
            value={intervaloSessao === undefined ? "" : intervaloSessao}
            onFocus={() => {
              if (intervaloSessao === 0) setIntervaloSessao(undefined);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setIntervaloSessao(value === "" ? undefined : Number(value));
            }}
            min={0}
          />
        </div>

        <div className="horario-expediente">
          <label>Começo e fim do expediente</label>
          <div className="horarios">
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
            <span>às</span>
            <input
              type="time"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
            />
          </div>
        </div>

        <div className="botoes-acao">
          <button className="cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="salvar" onClick={validarESalvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}