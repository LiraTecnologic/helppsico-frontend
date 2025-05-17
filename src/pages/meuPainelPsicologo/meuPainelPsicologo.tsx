import './meuPainelPsicologo.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';
import ListagemDePacientes from '../../components/layout/listagemDePacientes/listagemDePacientes';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import VinculoModel from '../../models/vinculo';
import ProntuarioModel from '../../models/prontuario';
import { consultaProntuarios } from "../listagemProntuario/listagemProntuario.service";

export default function MeuPainelPsicologo() {

    const [consultas, setConsutas] = useState<ConsultaModel[]>([]);
    const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
    const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

    useEffect(() => {
        async function carregarProntuarios() {
            const prontuariosConsultados = await consultaProntuarios();
            setProntuarios(prontuariosConsultados);
        }

        async function carregarConsultasFuturas() {
            const consultasConsultadas = await consultarConsultas();
            setConsutas(consultasConsultadas);
        }

        async function carregarVinculos() {
            const vinculosConsultados = await consultarVinculos();
            setVinculos(vinculosConsultados);
        }

        carregarProntuarios();
        carregarConsultasFuturas();
        carregarVinculos();
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