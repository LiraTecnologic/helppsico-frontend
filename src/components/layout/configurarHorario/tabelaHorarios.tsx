import './tabelaHorarios.css';
import { useState } from 'react';

interface TabelaHorariosProps {
  dias: string[];
  inicio: string;
  fim: string;
  duracao: number;
  onEditar: () => void;
}

const nomesDias: Record<string, string> = {
  SEG: 'Segunda-Feira',
  TER: 'Terça-Feira',
  QUA: 'Quarta-Feira',
  QUI: 'Quinta-Feira',
  SEX: 'Sexta-Feira',
  SAB: 'Sábado',
  DOM: 'Domingo',
};

function gerarIntervalos(inicio: string, fim: string, duracao: number): string[] {
  const [startH, startM] = inicio.split(':').map(Number);
  const [endH, endM] = fim.split(':').map(Number);
  const intervalos: string[] = [];

  let start = startH * 60 + startM;
  const end = endH * 60 + endM;

  while (start + duracao <= end) {
    const hIni = String(Math.floor(start / 60)).padStart(2, '0');
    const mIni = String(start % 60).padStart(2, '0');
    const hFim = String(Math.floor((start + duracao) / 60)).padStart(2, '0');
    const mFim = String((start + duracao) % 60).padStart(2, '0');

    intervalos.push(`${hIni}:${mIni} - ${hFim}:${mFim}`);
    start += duracao;
  }

  return intervalos;
}

type StatusCard = 'Escolher para trabalhar' | 'Agendado';
type AcaoSelecionada = 'para_disponibilizar' | 'para_remover';

export default function TabelaHorarios({
  dias,
  inicio,
  fim,
  duracao,
  onEditar,
}: TabelaHorariosProps) {
  const intervalos = gerarIntervalos(inicio, fim, duracao);

  // Inicializa todos os cards como "Escolher para trabalhar"
  const [cards, setCards] = useState<Record<string, StatusCard>>(() => {
    const estadoInicial: Record<string, StatusCard> = {};
    dias.forEach((dia) => {
      intervalos.forEach((faixa) => {
        const id = `${dia}-${faixa}`;
        estadoInicial[id] = 'Escolher para trabalhar';
      });
    });
    return estadoInicial;
  });

  const [selecionados, setSelecionados] = useState<Map<string, AcaoSelecionada>>(new Map());

  const toggleSelecionado = (id: string) => {
    const novoMap = new Map(selecionados);
    const statusAtual = cards[id];

    if (novoMap.has(id)) {
      novoMap.delete(id);
    } else {
      if (statusAtual === 'Escolher para trabalhar') {
        novoMap.set(id, 'para_disponibilizar');
      } else if (statusAtual === 'Agendado') {
        novoMap.set(id, 'para_remover');
      }
    }

    setSelecionados(novoMap);
  };

  const salvarSelecionados = () => {
    const novosCards = { ...cards };

    selecionados.forEach((acao, id) => {
      if (acao === 'para_disponibilizar') {
        novosCards[id] = 'Agendado';
      } else if (acao === 'para_remover') {
        novosCards[id] = 'Escolher para trabalhar';
      }
    });

    setCards(novosCards);
    setSelecionados(new Map());
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
                    className={`th-card ${
                      selecionado
                        ? acao === 'para_disponibilizar'
                          ? 'th-card-disponibilizar'
                          : 'th-card-remover'
                        : ''
                    }`}
                    onClick={() => toggleSelecionado(id)}
                  >
                    <div
                      className={`th-status ${
                        status === 'Escolher para trabalhar' ? 'th-status-livre para trabalhar' : 'th-status-disponivel'
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

      {selecionados.size > 0 && (
        <div className="th-salvar">
          <button onClick={salvarSelecionados}>Salvar horários selecionados</button>
        </div>
      )}
    </div>
  );
}
