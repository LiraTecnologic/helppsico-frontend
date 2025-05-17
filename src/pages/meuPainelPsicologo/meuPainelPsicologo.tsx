import './meuPainelPsicologo.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';
import ListagemDePacientes from '../../components/layout/listagemDePacientes/listagemDePacientes';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import VinculoModel from '../../models/vinculo';
import ProntuarioModel from '../../models/prontuario';
import { consultaProntuariosPsicologo } from "../../services/prontuarios.service";
import { consultaSessoesFuturas } from '../../services/consultas.service';
import { consultaVinculosPsicologo } from '../../services/vinculos.service'
import PsicologoModel from '../../models/psicologo';

export default function MeuPainelPsicologo() {

    const [consultas, setConsutas] = useState<ConsultaModel[]>([]);
    const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
    const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);
    const [psicologoLogado, setPsicologoLogado] = useState<PsicologoModel>();

    useEffect(() => {
        async function carregarProntuarios(id: string) {
            const prontuariosConsultados = await consultaProntuariosPsicologo(id, 1);
            setProntuarios(prontuariosConsultados.content);
        }

        async function carregarConsultasFuturas(id: string) {
            const consultasConsultadas = await consultaSessoesFuturas(id, 1);
            setConsutas(consultasConsultadas.content);
        }

        async function carregarVinculos(id: string) {
            const vinculosConsultados = await consultaVinculosPsicologo(id, 1);
            setVinculos(vinculosConsultados.content);
        }

        const psicologoString = localStorage.getItem('psicologoLogado');
        if (psicologoString) {
            const psicologo: PsicologoModel = JSON.parse(psicologoString);
            setPsicologoLogado(psicologo);

            carregarConsultasFuturas(psicologo.id);
            carregarProntuarios(psicologo.id);
            carregarVinculos(psicologo.id);
        }
    }, []);

    const handleDocumentoClick = (id: string) => {
        console.log(`Documento com ID ${id} foi clicado`);
        alert("clicou no documento");
    };

    return (
        <>
            <Header fluxo='meuPainel' headerPsicologo={true} />
            <ProximasSessoes sessaoMarcada={false} verMais={true} fluxo='psicologo' />
            <div className="imagensPacientes">
                <ListagemDePacientes pacientes={pacientes} verMais={true} />
            </div>
            <h1 className='prontuarioTittle'>Prontuário</h1>
            <ListagemDocumentos
                documentos={documentos}
                onDocumentoClick={handleDocumentoClick}
            />
        </>
    )
}