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
        async function carregarProntuarios(idPsicologo: string) {
            const prontuariosConsultados = await consultaProntuariosPsicologo(idPsicologo, 0);

            if (prontuariosConsultados.dado) {
                setProntuarios(prontuariosConsultados.dado.content);
            }
        }

        // const idPsicologo = localStorage.getItem('id-psicologo');
        const idPsicologo = '0873d229-fd10-488a-b7e9-f294aa10e5db';

        if (idPsicologo) {
            carregarProntuarios(idPsicologo);
        }

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
                    <Link to="/psicologo/documentos-pendentes">
                        <BotaoPrimario texto={`Solicitações pendentes`} />
                    </Link>

                </div>

                <div className="prontuarioGrid">
                    {prontuarios.map((prontuario) => (
                        <Link
                            key={prontuario.id}
                            to={`/psicologo/detalhes-prontuario/${prontuario.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                        >
                            <Prontuario
                                nomePaciente={prontuario.paciente.nome}
                                titulo={prontuario.titulo}
                                fotoPerfilUrl={prontuario.paciente.fotoUrl}
                                idProntuario={prontuario.id}
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}