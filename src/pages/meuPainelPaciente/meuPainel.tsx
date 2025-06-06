import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';
import { Link } from "react-router-dom";
import VinculoModel from '../../models/vinculo';
import ConsultaModel from '../../models/consulta';
import DocumentoModel from '../../models/documento/documento';
import { useState, useEffect } from 'react';
import { consultaSessoesFuturasPaciente } from '../../services/consultas.service';
import { consultarVinculosPaciente } from '../../services/vinculos.service';
import { consultarDocumentosPaciente } from '../../services/documentos.service';

export default function MeuPainelPaciente() {
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);
  const [consultas, setConsultas] = useState<ConsultaModel[] | []>([]);
  const [documentos, setDocumentos] = useState<DocumentoModel[] | []>([]);

  const handleDocumentoClick = (id: string) => {
    console.log(`Documento com ID ${id} foi clicado`);
    alert("clicou no documento");
  };

  useEffect(() => {
    const idPaciente = '764e307c-3564-42cc-992c-e35ccf6bb8c8';

    async function carregarDocumentos(idPaciente: string) {
      try {
        const documentos = await consultarDocumentosPaciente(idPaciente, 0);

        if (documentos.dado) {
          setDocumentos(documentos.dado.content);
        }

      } catch (error) {
        console.error('Erro ao carregar vinculos:', error);
      }
    }

    async function carregarVinculo(id: string) {
      try {
        const vinculos = await consultarVinculosPaciente(id, 0);
        let vinculosFiltrados: VinculoModel[] = [] as VinculoModel[];

        if (vinculos.dado) {
          vinculosFiltrados = vinculos.dado.content.filter(vic => vic.status === 'ATIVO');
        }

        if (vinculosFiltrados && vinculosFiltrados.length === 1) {
          setVinculo(vinculosFiltrados[0]);
        }

      } catch (error) {
        console.error('Erro ao carregar vinculos:', error);
      }
    }

    async function carregarConsultas(id: string) {
      try {
        const consultas = await consultaSessoesFuturasPaciente(id, 0);
        

        if (consultas.dado) {
          setConsultas(consultas.dado.content);
        }

      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
      }
    }

    carregarConsultas(idPaciente);
    carregarVinculo(idPaciente);
    carregarDocumentos(idPaciente);



  }, []);

  return (
    <>
      <div className="fundo">
        <Header fluxo='meuPainel' headerPsicologo={false} />

        {vinculo &&
          <VinculoPsicologo
            nome={vinculo.psicologo.nome}
            email={vinculo.psicologo.email}
            fotoUrl={vinculo.psicologo.fotoUrl}
          />
        }


        {consultas.length > 0 &&
          <ProximasSessoes
            consulta={consultas[0]}
            verMais={true}
            fluxo="paciente"
          />
        }

        <div className="listagemDocumentos">
          <h1 className='documentoTittle'>Prontuário</h1>
          <button className="botaoVerMais">
            <Link to="/paciente/solicitacao-documento" className="botao-link">Solicitar Documento</Link>
          </button>
        </div>

        <ListagemDocumentos
          documentos={documentos}
          onDocumentoClick={handleDocumentoClick}
        />
      </div>
    </>
  );
}