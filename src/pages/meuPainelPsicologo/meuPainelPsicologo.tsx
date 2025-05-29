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
import { consultaSessoesFuturasPsicologo } from '../../services/consultas.service';
import { consultaVinculosPsicologo } from '../../services/vinculos.service'
import PsicologoModel from '../../models/psicologo';

export default function MeuPainelPsicologo() {

    const [consultas, setConsutas] = useState<ConsultaModel[]>([]);
    const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
    const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

    useEffect(() => {
        async function carregarProntuarios(id: string) {
            const prontuariosConsultados = await consultaProntuariosPsicologo(id, 1);
            console.log('Prontuarios: ', prontuariosConsultados);
            setProntuarios(prontuariosConsultados.content);
        }

        async function carregarConsultas(id: string) {
            const consultasConsultadas = await consultaSessoesFuturasPsicologo(id, 1);
            console.log('Consultas: ', consultasConsultadas);

            const consultasOrdenadas = consultasConsultadas.content.sort((a, b) => {
                const dataA = new Date(a.dataHora).getTime();
                const dataB = new Date(b.dataHora).getTime();
                const agora = Date.now();

                const diffA = Math.abs(dataA - agora);
                const diffB = Math.abs(dataB - agora);

                return diffA - diffB;
            });

            setConsutas(consultasOrdenadas);
        }

        async function carregarVinculos(id: string) {
            const vinculosConsultados = await consultaVinculosPsicologo(id, 1);
            console.log('Vinculos: ', vinculosConsultados);
            setVinculos(vinculosConsultados.dado.content);
        }


        const idPsicologo = localStorage.getItem('id-psicologo');

        if (idPsicologo) {
            carregarConsultas(idPsicologo);
            carregarProntuarios(idPsicologo);
            carregarVinculos(idPsicologo);
        } else {
            console.log('Id do psicologo null');
        }



    }, []);

    const sessaoMarcada = consultas.length > 0;;

    const handleDocumentoClick = (id: string) => {
        console.log(`Documento com ID ${id} foi clicado`);
        alert("clicou no documento");
    };

    return (
        <>
            <Header fluxo='meuPainel' headerPsicologo={true} />
            {consultas.length > 0 && (
                <ProximasSessoes
                    sessaoMarcada={true}
                    verMais={true}
                    fluxo='psicologo'
                    consulta={consultas[0]}
                />
            )}
            <div className="imagensPacientes">
                <ListagemDePacientes vinculos={vinculos} verMais={true} />
            </div>
            <h1 className='prontuarioTittle'>Prontuário</h1>
            <ListagemDocumentos
                documentos={prontuarios}
                onDocumentoClick={handleDocumentoClick}
            />
        </>
    )
}