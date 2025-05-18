import './gerenciamentoHorarios.css';
import Header from '../../components/layout/header/header';
import { useState } from 'react';
import ConfiguracaoHorario from '../../components/layout/configurarHorario/configurarHorario';
import TabelaHorarios from '../../components/layout/configurarHorario/tabelaHorarios';

export default function GerenciamentoDeHorarios() {
    const [hasConfig, setHasConfig] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // Estados que serão preenchidos após salvar a configuração
    const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
    const [tempoSessao, setTempoSessao] = useState<number>(30);
    const [horaInicio, setHoraInicio] = useState<string>('07:00');
    const [horaFim, setHoraFim] = useState<string>('18:00');

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
            <div className="container-gerenciamento">
                {!hasConfig ? (
                    <div className="sem-config">
                        <h1>Nenhum horário configurado ainda</h1>
                        <h2>Clique para configurar agora</h2>
                        <button onClick={() => setOpenModal(true)}>
                            Configurar
                        </button>
                    </div>
                ) : (
                    <TabelaHorarios
                        dias={diasSelecionados}
                        inicio={horaInicio}
                        fim={horaFim}
                        duracao={tempoSessao}
                        onEditar={() => setOpenModal(true)}
                    />
                )}
            </div>

            {openModal && (
                <ConfiguracaoHorario
                    onClose={() => setOpenModal(false)}
                    onSave={(dias, tempo, inicio, fim) => {
                        setDiasSelecionados(dias);
                        setTempoSessao(tempo);
                        setHoraInicio(inicio);
                        setHoraFim(fim);
                        setHasConfig(true);
                        setOpenModal(false);
                    }}
                />
            )}
        </>
    );
}
