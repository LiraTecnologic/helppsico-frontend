import { HorarioModel } from "../../../models/horario";
import "./tabelaHorarioConsulta.css";
import { useEffect, useState } from "react";

interface TabelaHorariosProps {
  horarios: HorarioModel[];
  onSelecionado?: (quantidade: number) => void;
  onSelecionadosChange?: (ids: string[]) => void;
  alterar: boolean;
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
  alterar,
}: TabelaHorariosProps) {
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const horariosPorDia = horarios.reduce((acc, horario) => {
    const dias = Array.isArray(horario.diaSemana)
      ? horario.diaSemana
      : [horario.diaSemana];

    for (const dia of dias) {
      if (!acc[dia]) {
        acc[dia] = [];
      }
      acc[dia].push(horario);
    }
    return acc;
  }, {} as Record<string, HorarioModel[]>);

  const horarioParaMinutos = (horario: string) => {
    const [horas, minutos] = horario.split(":").map((num) => parseInt(num));
    return horas * 60 + minutos;
  };

  Object.keys(horariosPorDia).forEach((dia) => {
    horariosPorDia[dia].sort(
      (a, b) => horarioParaMinutos(a.inicio) - horarioParaMinutos(b.inicio)
    );
  });

  const diasOrdenados = Object.keys(horariosPorDia).sort((a, b) => {
    const indexA = ordemDias.indexOf(a);
    const indexB = ordemDias.indexOf(b);
    return indexA - indexB;
  });

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
    if (onSelecionadosChange) {
      onSelecionadosChange(Array.from(selecionados));
    }
  }, [selecionados]);

  return (
    <div className="agenda-tabela">
      {diasOrdenados.map((dia) => (
        <div key={dia} className="agenda-dia-coluna">
          <h3 className="agenda-dia-titulo">{nomesDias[dia] || dia}</h3>
          {horariosPorDia[dia].map((horario) => {
            const selecionado = selecionados.has(horario.id);

            return (
              <div
                key={horario.id}
                className={`agenda-card ${
                  selecionado ? "agenda-card-selecionado" : ""
                } ${!horario.disponivel ? "agenda-card-indisponivel" : ""}`}
                onClick={
                  alterar && horario.disponivel
                    ? () => toggleSelecionado(horario.id)
                    : undefined
                }
              >
                <div
                  className={`agenda-status ${
                    selecionado
                      ? "agenda-status-selecionado"
                      : "agenda-status-disponivel"
                  }`}
                >
                  <div
                    className={`agenda-status ${
                      selecionado
                        ? "agenda-status-selecionado"
                        : "agenda-status-disponivel"
                    }`}
                  >
                    {alterar === true
                      ? selecionado
                        ? "Selecionado"
                        : horario.disponivel
                        ? "Disponível"
                        : "Indisponível"
                      : null}
                  </div>
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
