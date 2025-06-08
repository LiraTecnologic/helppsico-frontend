import { HorarioModel } from "../../../models/horario";
import "./tabelaHorarios.css";
import { useEffect, useState } from "react";

interface TabelaHorariosProps {
  dias: string[];
  inicio: string;
  fim: string;
  duracao: number;
  intervalo: number;
  onEditar: () => void;
  horarios: HorarioModel[];
  onSalvar: (horariosParaSalvar: string[]) => void;
  onDeletar: (horariosParaDeletar: string[]) => void;
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

function formatarHora(hora: string): string {
  return hora.slice(0, 5);
}

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

function converterDiaParaAbreviado(diaCompleto: string): string {
  const conversao: Record<string, string> = {
    "SEGUNDA_FEIRA": "SEG",
    "TERCA_FEIRA": "TER",
    "QUARTA_FEIRA": "QUA",
    "QUINTA_FEIRA": "QUI",
    "SEXTA_FEIRA": "SEX",
    "SABADO": "SAB",
    "DOMINGO": "DOM",
  };
  return conversao[diaCompleto] || diaCompleto;
}

type StatusCard = "Disponibilizar Agendamento" | "Disponivel para Agendamento" | "Reseservado";
type AcaoSelecionada = "para_disponibilizar" | "para_remover";

export default function TabelaHorarios({
  dias,
  inicio,
  fim,
  duracao,
  intervalo,
  onEditar,
  horarios,
  onSalvar,
  onDeletar
}: TabelaHorariosProps) {
  const intervalos = gerarIntervalos(inicio, fim, duracao, intervalo);
  const [idsMapping, setIdsMapping] = useState<Record<string, string>>({});

  const inicialCards = () => {
    const cards: Record<string, StatusCard> = {};
    const mapping: Record<string, string> = {}; 

    dias.forEach((dia) => {
      intervalos.forEach((faixa) => {
        const id = `${dia}-${faixa}`;
        const horarioEncontrado = horarios.find(
          (h) => {
            const diaAbreviado = converterDiaParaAbreviado(h.diaSemana);
            const faixaHorario = `${formatarHora(h.inicio)} - ${formatarHora(h.fim)}`;

            console.log(`Comparando: ${diaAbreviado} === ${dia} && ${faixaHorario} === ${faixa}`);

            return diaAbreviado === dia && faixaHorario === faixa;
          }
        );

        if (horarioEncontrado) {
          mapping[id] = horarioEncontrado.id; // Mapeia o ID interno para o ID do banco
          if (horarioEncontrado.disponivel) {
            cards[id] = "Disponivel para Agendamento";
          } else {
            cards[id] = "Reseservado";
          }
        } else {
          cards[id] = "Disponibilizar Agendamento";
        }
      });
    });

    return { cards, mapping };
  };

  
  const [cards, setCards] = useState<Record<string, StatusCard>>({});
  const [selecionados, setSelecionados] = useState<Map<string, AcaoSelecionada>>(new Map());

  useEffect(() => {
    const { cards: novosCards, mapping } = inicialCards();
    setCards(novosCards);
    setIdsMapping(mapping);
    console.log("Horários carregados:", horarios);
    console.log("Cards gerados:", novosCards);
    console.log("Mapeamento de IDs:", mapping);
  }, [dias, inicio, fim, duracao, intervalo, horarios]);

  const toggleSelecionado = (id: string) => {
    const novoMap = new Map(selecionados);
    const statusAtual = cards[id];

    if (novoMap.has(id)) {
      novoMap.delete(id);
    } else {
      if (statusAtual === "Disponibilizar Agendamento") {
        novoMap.set(id, "para_disponibilizar");
      } else if (statusAtual === "Disponivel para Agendamento") {
        novoMap.set(id, "para_remover");
      }
    }

    setSelecionados(novoMap);
  };

  const salvarSelecionados = () => {
    const novosCards = { ...cards };
    const horariosParaSalvar: string[] = [];
    const horariosParaRemover: string[] = []; // IDs do banco de dados

    selecionados.forEach((acao, id) => {
      if (acao === "para_disponibilizar") {
        novosCards[id] = "Disponivel para Agendamento";
        horariosParaSalvar.push(id);
      } else if (acao === "para_remover") {
        novosCards[id] = "Disponibilizar Agendamento";
        // Usar o ID do banco de dados em vez do ID interno
        const idDoBanco = idsMapping[id];
        if (idDoBanco) {
          horariosParaRemover.push(idDoBanco);
        }
      }
    });

    setCards(novosCards);
    setSelecionados(new Map());

    if (horariosParaSalvar.length > 0 || horariosParaRemover.length > 0) {
      console.log("Horários para salvar:", horariosParaSalvar);
      console.log("Horários para remover (IDs do banco):", horariosParaRemover);

      if (horariosParaSalvar.length > 0) {
        onSalvar(horariosParaSalvar);
      }

      if (horariosParaRemover.length > 0) {
        onDeletar(horariosParaRemover);
      }
    }
  };

  return (
    <div className="th-container">
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

      <div className="th-tabela-scroll">
        <div className="th-tabela">
          {dias.map((dia) => (
            <div key={dia} className="th-dia-coluna">
              <h3 className="th-dia-titulo">{nomesDias[dia]}</h3>
              {intervalos.map((faixa) => {
                const id = `${dia}-${faixa}`;
                const status = cards[id];
                const acao = selecionados.get(id);
                const selecionado = selecionados.has(id);

                return (
                  <div
                    key={id}
                    className={`th-card ${selecionado
                      ? acao === "para_disponibilizar"
                        ? "th-card-disponibilizar"
                        : "th-card-remover"
                      : status === "Disponivel para Agendamento"
                        ? "th-card-disponivel"
                        : ""
                      }`}
                    onClick={() => toggleSelecionado(id)}
                  >
                    <div
                      className={`th-status ${status === "Disponibilizar Agendamento"
                        ? "th-status-livre"
                        : "th-status-disponivel"
                        }`}
                    >
                      {status}
                    </div>
                    <div className="th-horario">{faixa}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="th-botao-area">
        {selecionados.size > 0 && (
          <div className="th-salvar">
            <button onClick={salvarSelecionados}>Salvar Selecionados</button>
          </div>
        )}
      </div>
    </div>
  );
}