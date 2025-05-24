import "./tabelaHorarioConsulta.css";
import { useEffect, useState } from "react";

interface TabelaHorariosProps {
  dias: string[];
  inicio: string;
  fim: string;
  duracao: number;
  intervalo: number;
  onEditar?: () => void;
  agendamento?: boolean;
  onSelecionado?: (quantidade: number) => void;
}

const nomesDias: Record<string, string> = {
  SEG: "Segunda-Feira",
  TER: "Terça-Feira",
  QUA: "Quarta-Feira",
  QUI: "Quinta-Feira",
  SEX: "Sexta-Feira",
  SAB: "Sábado",
  DOM: "Domingo",
};

function gerarIntervalos(
  inicio: string,
  fim: string,
  duracao: number,
  intervalo: number
): string[] {
  const [startH, startM] = inicio.split(":").map(Number);
  const [endH, endM] = fim.split(":").map(Number);
  const intervalos: string[] = [];

  let start = startH * 60 + startM;
  const end = endH * 60 + endM;

  while (start + duracao <= end) {
    const hIni = String(Math.floor(start / 60)).padStart(2, "0");
    const mIni = String(start % 60).padStart(2, "0");
    const hFim = String(Math.floor((start + duracao) / 60)).padStart(2, "0");
    const mFim = String((start + duracao) % 60).padStart(2, "0");

    intervalos.push(`${hIni}:${mIni} - ${hFim}:${mFim}`);
    start += duracao + intervalo;
  }

  return intervalos;
}

export default function TabelaHorarioConsulta({
  dias,
  inicio,
  fim,
  duracao,
  intervalo,
  onEditar,
  agendamento,
  onSelecionado
}: TabelaHorariosProps) {
  const intervalos = gerarIntervalos(inicio, fim, duracao, intervalo);

  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  const toggleSelecionado = (id: string) => {
    const novoSet = new Set(selecionados);
    if (novoSet.has(id)) {
      novoSet.delete(id);
    } else {
      novoSet.add(id);
    }
    setSelecionados(novoSet);
    onSelecionado?.(novoSet.size);
  };

  useEffect(() => {
  if (onSelecionado) {
    onSelecionado(selecionados.size);
  }
}, [selecionados, onSelecionado]);

  return (
    <div className="th-container">
      {!agendamento && (
        <>
          <div className="th-header">
            <h1>Horários</h1>
            <button onClick={onEditar}>Editar configurações</button>
          </div>

          <div className="th-config">
            <div className="th-config-item">
              <p>Dias de atendimento:</p>
              <div className="th-dias">
                {dias.map((dia) => (
                  <span key={dia} className="th-dia">
                    {dia}
                  </span>
                ))}
              </div>
            </div>
            <div className="th-config-item">
              <p>Tempo de sessão:</p>
              <div className="th-duracao">{duracao} m</div>
            </div>
            <div className="th-config-item">
              <p>Intervalo entre sessões:</p>
              <div className="th-duracao">{intervalo} m</div>
            </div>
            <div className="th-config-item">
              <p>Começo e fim do expediente:</p>
              <div className="th-expediente">
                {inicio} h às {fim} h
              </div>
            </div>
          </div>
        </>
      )}

      <div className="th-tabela-scroll">
        <div className="th-tabela">
          {dias.map((dia) => (
            <div key={dia} className="th-dia-coluna">
              <h3 className="th-dia-titulo">{nomesDias[dia]}</h3>
              {intervalos.map((faixa) => {
                const id = `${dia}-${faixa}`;
                const selecionado = selecionados.has(id);

                return (
                  <div
                    key={id}
                    className={`th-card ${
                      selecionado ? "th-card-disponibilizar" : ""
                    }`}
                    onClick={() => toggleSelecionado(id)}
                  >
                    <div
                      className={`th-status ${
                        selecionado ? "th-status-disponivel" : "th-status-livre"
                      }`}
                    >
                      {selecionado ? "Selecionado" : "Disponível"}
                    </div>
                    <div className="th-horario">{faixa}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {!agendamento && (
        <div className="th-botao-area">
          {selecionados.size > 0 && (
            <div className="th-salvar">
              <button onClick={() => alert("Horários salvos!")}>
                Salvar horários selecionados
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
