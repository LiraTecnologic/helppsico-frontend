import './meuPainel.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';

import VinculoModel from '../../models/vinculo';
import ConsultaModel from '../../models/consulta';
import DocumentoModel from '../../models/documento/documento';

import { consultaSessoesFuturasPaciente } from '../../services/consultas.service';
import { consultarVinculosPaciente } from '../../services/vinculos.service';
import { consultarDocumentosPaciente } from '../../services/documentos.service';

export default function MeuPainelPaciente() {
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);
  const [consultas, setConsultas] = useState<ConsultaModel[]>([]);
  const [documentos, setDocumentos] = useState<DocumentoModel[]>([]);

  const handleDocumentoClick = (id: string) => {
    console.log(`Documento com ID ${id} foi clicado`);
  };

  useEffect(() => {
    const idPaciente = localStorage.getItem('id-paciente');
    if (!idPaciente) return;

    async function carregarVinculo(id: string) {
      try {
        const { dado } = await consultarVinculosPaciente(id, 0);
        const vinculosAtivos = dado?.content.filter(v => v.status === 'ATIVO');
        if (vinculosAtivos?.length === 1) {
          setVinculo(vinculosAtivos[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar vínculos:', error);
      }
    }

    async function carregarConsultas(id: string) {
      try {
        const { dado } = await consultaSessoesFuturasPaciente(id, 0);
        if (dado) {
          setConsultas(dado.content);
        }
      } catch (error) {
        console.error('Erro ao carregar sessões:', error);
      }
    }

    async function carregarDocumentos(id: string) {
      try {
        const { dado } = await consultarDocumentosPaciente(id, 0);
        if (dado) {
          setDocumentos(dado.content);
        }
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
      }
    }

    carregarVinculo(idPaciente);
    carregarConsultas(idPaciente);
    carregarDocumentos(idPaciente);
  }, []);

  return (
    <div className="fundo">
      <Header fluxo="meuPainel" headerPsicologo={false} />

      {vinculo && (
        <VinculoPsicologo
          nome={vinculo.psicologo.nome}
          email={vinculo.psicologo.email}
          fotoUrl={vinculo.psicologo.fotoUrl}
        />
      )}

      {consultas.length > 0 && (
        <ProximasSessoes
          consulta={consultas[0]}
          verMais={true}
          fluxo="paciente"
        />
      )}

      <div className="listagemDocumentos">
        <h1 className="documentoTittle">Prontuário</h1>
        <button className="botaoVerMais">
          <Link to="/paciente/solicitacao-documento" className="botao-link">
            Solicitar Documento
          </Link>
        </button>
      </div>

      <ListagemDocumentos
        documentos={documentos}
        prontuarios={[]}
        onDocumentoClick={handleDocumentoClick}
      />
    </div>
  );
}