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
import { consultaVinculosPsicologo } from '../../services/vinculos.service';
import { consultaSessoesFuturasPsicologo } from '../../services/consultas.service';
import { listarHorariosPsicologo } from '../../services/horarios.service';
import BlocoHorario from '../../components/layout/blocoHorario/blocoHorario';
import { Link } from "react-router-dom";
import { HorarioModel } from '../../models/horario';

export default function MeuPainelPsicologo() {

    const [consultas, setConsutas] = useState<ConsultaModel[]>([]);
    const [vinculos, setVinculos] = useState<VinculoModel[]>([]);
    const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);
    const [horarios, setHorarios] = useState<HorarioModel[] | []>([]);

    useEffect(() => {
        async function carregarProntuarios(id: string) {
            const prontuariosConsultados = await consultaProntuariosPsicologo(id, 0);
            console.log('Prontuarios: ', prontuariosConsultados);

            if (prontuariosConsultados.dado) {
                setProntuarios(prontuariosConsultados.dado.content);
            }
        }

        async function carregarConsultas(id: string) {
            const consultasConsultadas = await consultaSessoesFuturasPsicologo(id, 0);
            console.log('Consultas: ', consultasConsultadas);

            if (consultasConsultadas.dado) {
                const consultasOrdenadas = consultasConsultadas.dado.content.sort((a, b) => {
                    const dataA = new Date(a.data).getTime();
                    const dataB = new Date(b.data).getTime();
                    const agora = Date.now();

                    const diffA = Math.abs(dataA - agora);
                    const diffB = Math.abs(dataB - agora);

                    return diffA - diffB;
                });

                setConsutas(consultasOrdenadas);
            }
        }

        async function carregarVinculos(id: string) {
            const vinculosConsultados = await consultaVinculosPsicologo(id, 0);
            console.log('Vinculos: ', vinculosConsultados);

            if (vinculosConsultados.dado) {
                setVinculos(vinculosConsultados.dado.content);
            }
        }

        async function carregarHorarios(id:string) {
            const horarios = await listarHorariosPsicologo(idPsicologo);
            if(horarios.dado) {
                setHorarios(horarios.dado);
            }
        }

        // const idPsicologo = localStorage.getItem('id-psicologo');
        const idPsicologo = '0873d229-fd10-488a-b7e9-f294aa10e5db';

        if (idPsicologo) {
            carregarConsultas(idPsicologo);
            carregarProntuarios(idPsicologo);
            carregarVinculos(idPsicologo);
            carregarHorarios(idPsicologo);
        } else {
            console.log('Id do psicologo null');
        }
    }, []);

    const handleDocumentoClick = (id: string) => {
        console.log(`Documento com ID ${id} foi clicado`);
        alert("clicou no documento");
    };

    return (
        <>
            <Header fluxo='meuPainel' headerPsicologo={true} />
            {consultas.length > 0 && (
                <ProximasSessoes
                    verMais={true}
                    fluxo='psicologo'
                    consulta={consultas[0]}
                />
            )}
            <div className="imagensPacientes">
                <ListagemDePacientes vinculos={vinculos} verMais={true} />
            </div>
            <BlocoHorario hasConfig={horarios.length > 0} />
            <div className="listagemProntuarios">
                <h1 className='prontuarioTittle'>Prontuário</h1>
                <button className="botao-verMais">
                    <Link to="/psicologo/prontuarios" className="botao-link">Ver mais</Link>
                </button>
            </div>
            <ListagemDocumentos
                documentos={[]}
                prontuarios={prontuarios}
                onDocumentoClick={handleDocumentoClick}
            />
        </>
    )
}
