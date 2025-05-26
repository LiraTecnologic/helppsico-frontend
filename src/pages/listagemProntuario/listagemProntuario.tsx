import Prontuario from '../../components/layout/prontuario/prontuario.tsx';
import Header from '../../components/layout/header/header.tsx';
import BotaoPrimario from '../../components/commmon/botoes/botaoPrimario/botaoPrimario.tsx';
import './listagemProntuario.css'
import { consultaProntuariosPsicologo } from "../../services/prontuarios.service.ts";


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProntuarioModel from '../../models/prontuario.ts';

export default function ListagemProntuario() {

    const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

    useEffect(() => {
        async function carregarProntuarios() {
            const prontuariosConsultados = await consultaProntuariosPsicologo('', 1);
            console.log(prontuariosConsultados);
            setProntuarios(prontuariosConsultados.content);
        }

        carregarProntuarios();
    }, []);

    return (
        <>
                <Header fluxo='meuPainel' headerPsicologo={true} />

                <main className="listagemContainer">
                    <div className="listagemHeader">
                        <h1>Prontuário ({prontuarios.length})</h1>
                        <Link to="/psicologo/prontuario/novo">
                            <BotaoPrimario texto="Cadastrar Prontuário" />
                        </Link>
                    </div>

                    <div className="prontuarioGrid">
                        {prontuarios.map((prontuario) => (
                        <Prontuario 
                            key={prontuario.id}
                            nomePaciente={prontuario.paciente.nome}
                            titulo={prontuario.titulo}
                            fotoPerfilUrl={prontuario.paciente.fotoUrl}
                        />
                        ))}
                    </div>
                </main>
        </>
    );
}