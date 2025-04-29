import Prontuario from '../../components/layout/prontuario/prontuario.tsx';
import Header from '../../components/layout/header/header.tsx';
import BotaoPrimario from '../../components/commmon/botaoPrimario/botaoPrimario.tsx';
import './listagemProntuario.css'

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListagemProntuario() {

    const [prontuarios, setProntuarios] = useState([
        { id: 1, nomePaciente: 'João Maria', titulo: 'Prontuário bonito' },
        { id: 2, nomePaciente: 'Maria João', titulo: 'Prontuário legal' },
        { id: 3, nomePaciente: 'Ana Paula', titulo: 'Prontuário detalhado' },
        { id: 4, nomePaciente: 'Carlos Silva', titulo: 'Prontuário atualizado' },
        { id: 5, nomePaciente: 'Beatriz Lima', titulo: 'Prontuário completo' },
        { id: 6, nomePaciente: 'Pedro Santos', titulo: 'Prontuário breve' },
        { id: 7, nomePaciente: 'Laura Almeida', titulo: 'Prontuário resumido' },
        { id: 8, nomePaciente: 'Lucas Pereira', titulo: 'Prontuário revisado' }
    ]);

    return (
        <>
            <Header fluxo='meuPainel'/>

            <main className="listagemContainer">
                <div className="listagemHeader">
                    <h1>Prontuário ({prontuarios.length})</h1>
                    <Link to="/cadastrar-prontuario">
                        <BotaoPrimario texto="Cadastrar Prontuário" />
                    </Link>
                </div>

                <div className="prontuarioGrid">
                    {prontuarios.map((prontuario) => (
                    <Prontuario 
                        key={prontuario.id}
                        nomePaciente={prontuario.nomePaciente}
                        titulo={prontuario.titulo}
                    />
                    ))}
                </div>
            </main>
        </>
    );
}