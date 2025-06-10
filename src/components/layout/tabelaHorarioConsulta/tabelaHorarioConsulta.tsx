import { useEffect, useState, useMemo, useCallback } from "react";
import { HorarioModel } from "../../../models/horario";
import "./tabelaHorarioConsulta.css";

interface TabelaHorariosProps {
  horarios: HorarioModel[];
  onSelecionado?: (quantidade: number) => void;
  onSelecionadosChange?: (ids: string[]) => void;
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

const ordemDias = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

export default function TabelaHorarioConsulta({
  horarios,
  onSelecionado,
  onSelecionadosChange,
}: TabelaHorariosProps) {
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  const horarioParaMinutos = (horario: string): number => {
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
  };

  const horariosPorDia = useMemo(() => {
    const agrupado: Record<string, HorarioModel[]> = {};

    for (const horario of horarios) {
      const dias = Array.isArray(horario.diaSemana)
        ? horario.diaSemana
        : [horario.diaSemana];

      for (const dia of dias) {
        if (!agrupado[dia]) agrupado[dia] = [];
        agrupado[dia].push(horario);
      }
    }

    for (const dia in agrupado) {
      agrupado[dia].sort((a, b) => horarioParaMinutos(a.inicio) - horarioParaMinutos(b.inicio));
    }

    return agrupado;
  }, [horarios]);

  const diasOrdenados = useMemo(() => {
    return Object.keys(horariosPorDia).sort(
      (a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b)
    );
  }, [horariosPorDia]);

  const toggleSelecionado = useCallback((id: string) => {
    setSelecionados((prev) => {
      const novoSet = new Set(prev);
      novoSet.has(id) ? novoSet.delete(id) : novoSet.add(id);
      return novoSet;
    });
  }, []);

  useEffect(() => {
    onSelecionado?.(selecionados.size);
    onSelecionadosChange?.(Array.from(selecionados));
  }, [selecionados, onSelecionado, onSelecionadosChange]);

  return (
    <div className="agenda-tabela">
      {diasOrdenados.map((dia) => (
        <div key={dia} className="agenda-dia-coluna">
          <h3 className="agenda-dia-titulo">{nomesDias[dia] || dia}</h3>
          {horariosPorDia[dia].map((horario) => {
            const selecionado = selecionados.has(horario.id);
            const isDisponivel = horario.disponivel;

            return (
              <div
                key={horario.id}
                className={`agenda-card 
                  ${selecionado ? "agenda-card-selecionado" : ""} 
                  ${!isDisponivel ? "agenda-card-indisponivel" : ""}`}
                onClick={() => {
                  if (!isDisponivel) return;
                  toggleSelecionado(horario.id);
                }}
              >
                <div
                  className={`agenda-status 
                    ${selecionado ? "agenda-status-selecionado" : "agenda-status-disponivel"}`}
                >
                  {selecionado
                    ? "Selecionado"
                    : isDisponivel
                    ? "Disponível"
                    : "Indisponível"}
                </div>
                <div className="agenda-horario">
                  {horario.inicio} - {horario.fim}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
