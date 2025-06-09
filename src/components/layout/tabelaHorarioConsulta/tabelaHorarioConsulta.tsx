import { HorarioModel } from "../../../models/horario";
import "./tabelaHorarioConsulta.css";
import { useEffect, useState } from "react";

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


const ordemDias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

export default function TabelaHorarioConsulta({
  horarios,
  onSelecionado,
  onSelecionadosChange
}: TabelaHorariosProps) {
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  

  const horariosPorDia = horarios.reduce((acc, horario) => {
    if (!acc[horario.diaSemana]) {
      acc[horario.diaSemana] = [];
    }
    acc[horario.diaSemana].push(horario);
    return acc;
  }, {} as Record<string, HorarioModel[]>);


  Object.keys(horariosPorDia).forEach(dia => {
    horariosPorDia[dia].sort((a, b) => a.inicio.localeCompare(b.inicio));
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
  }, [selecionados, onSelecionado, onSelecionadosChange]);


  const diasComHorarios = ordemDias.filter(dia => horariosPorDia[dia]?.length > 0);

  return (
    <div className="agenda-container">
      <div className="agenda-tabela-scroll">
        <div className="agenda-tabela">
          {diasComHorarios.map((dia) => (
            <div key={dia} className="agenda-dia-coluna">
              <h3 className="agenda-dia-titulo">{nomesDias[dia]}</h3>
              {horariosPorDia[dia].map((horario) => {
                const id = horario.id;
                const selecionado = selecionados.has(id);

                return (
                  <div
                    key={id}
                    className={`agenda-card ${
                      selecionado ? "agenda-card-selecionado" : ""
                    } ${
                      !horario.disponivel ? "agenda-card-indisponivel" : ""
                    }`}
                    onClick={() => {
                      if (!horario.disponivel) return;
                      toggleSelecionado(id);
                    }}
                    role="button"
                    tabIndex={horario.disponivel ? 0 : -1}
                    aria-pressed={selecionado}
                    aria-label={`${nomesDias[dia]} das ${horario.inicio} às ${horario.fim} - ${
                      selecionado 
                        ? "Selecionado" 
                        : horario.disponivel 
                        ? "Disponível" 
                        : "Indisponível"
                    }`}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && horario.disponivel) {
                        e.preventDefault();
                        toggleSelecionado(id);
                      }
                    }}
                  >
                    <div
                      className={`agenda-status ${
                        selecionado 
                          ? "agenda-status-selecionado" 
                          : "agenda-status-disponivel"
                      }`}
                    >
                      {selecionado 
                        ? "Selecionado" 
                        : horario.disponivel 
                        ? "Disponível" 
                        : "Indisponível"
                      }
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
      </div>
    </div>
  );
}