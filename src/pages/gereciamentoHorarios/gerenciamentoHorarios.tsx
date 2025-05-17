import './gerenciamentoHorarios.css';
import Header from '../../components/layout/header/header';
import { useState } from 'react';
import ConfiguracaoHorario from '../../components/layout/configurarHorario/configurarHorario';

export default function GerenciamentoDeHorarios() {
    const [hasConfig, setHasConfig] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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
                    <div>
                        {/* Aqui entrará a tabela quando avançarmos */}
                    </div>
                )}
            </div>

             {openModal && (
                <ConfiguracaoHorario
                    onClose={() => setOpenModal(false)}
                    onSave={() => {
                        setHasConfig(true);
                        setOpenModal(false);
                    }}
                />
            )}
        </>
    );
}
