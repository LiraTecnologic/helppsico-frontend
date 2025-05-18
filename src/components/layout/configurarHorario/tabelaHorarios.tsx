import './tabelaHorarios.css';

interface TabelaHorariosProps {
    dias: string[];
    inicio: string;
    fim: string;
    duracao: number;
    onEditar: () => void;
}

const nomesDias: Record<string, string> = {
    'SEG': 'Segunda-Feira',
    'TER': 'Terça-Feira',
    'QUA': 'Quarta-Feira',
    'QUI': 'Quinta-Feira',
    'SEX': 'Sexta-Feira',
    'SAB': 'Sábado',
    'DOM': 'Domingo',
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

export default function TabelaHorarios({ dias, inicio, fim, duracao, onEditar }: TabelaHorariosProps) {
    const intervalos = gerarIntervalos(inicio, fim, duracao);

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
                        {dias.map(dia => (
                            <span key={dia} className="th-dia">{dia}</span>
                        ))}
                    </div>
                </div>
                <div className="th-config-item">
                    <p>Tempo de sessão:</p>
                    <div className="th-duracao">{duracao} m</div>
                </div>
                <div className="th-config-item">
                    <p>Começo e fim do expediente:</p>
                    <div className="th-expediente">{inicio} h às {fim} h</div>
                </div>
            </div>

            <div className="th-tabela-scroll">
                <div className="th-tabela">
                    {dias.map((dia) => (
                        <div key={dia} className="th-dia-coluna">
                            <h3 className="th-dia-titulo">{nomesDias[dia]}</h3>
                            <div className="th-scroll-cards">
                                {intervalos.map((faixa, i) => (
                                    <div key={i} className="th-card">
                                        <div className="th-status-livre">Livre</div>
                                        <div className="th-horario">{faixa}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}