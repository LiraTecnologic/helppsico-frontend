import "./tabelaHorarioConsulta.css";
import { useEffect, useState } from "react";

interface TabelaHorariosProps {
  dias: string[];
  inicio: string;
  fim: string;
  duracao: number;
  intervalo: number;
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
  };

  useEffect(() => {
    if (onSelecionado) {
      onSelecionado(selecionados.size);
    }
  }, [selecionados, onSelecionado]);

  return (
    <div className="agenda-container">
      <div className="agenda-tabela-scroll">
        <div className="agenda-tabela">
          {dias.map((dia) => (
            <div key={dia} className="agenda-dia-coluna">
              <h3 className="agenda-dia-titulo">{nomesDias[dia]}</h3>
              {intervalos.map((faixa) => {
                const id = `${dia}-${faixa}`;
                const selecionado = selecionados.has(id);

                return (
                  <div
                    key={id}
                    className={`agenda-card ${
                      selecionado ? "agenda-card-selecionado" : ""
                    }`}
                    onClick={() => toggleSelecionado(id)}
                  >
                    <div
                      className={`agenda-status ${
                        selecionado
                          ? "agenda-status-selecionado"
                          : "agenda-status-disponivel"
                      }`}
                    >
                      {selecionado ? "Selecionado" : "Disponível"}
                    </div>
                    <div className="agenda-horario">{faixa}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}