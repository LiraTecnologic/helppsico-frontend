import { useEffect, useState } from 'react';
import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';

import { getVinculo, getSessoes, getProntuarios } from './meuPainelService';
import VinculoModel from '../../models/vinculo';
import ConsultaModel from '../../models/consulta';
import ProntuarioModel from '../../models/prontuario';

export default function MeuPainelPaciente() {
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);
  const [consulta, setConsulta] = useState<ConsultaModel | null>(null);
  const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

  useEffect(() => {
    getVinculo().then(setVinculo);
    getSessoes().then(sessoes => {
      if (sessoes.length > 0) {
        setConsulta(sessoes[0]);
      }
    });
    getProntuarios().then(setProntuarios);
  }, []);

  const handleDocumentoClick = (id: string) => {
    console.log(`Documento com ID ${id} foi clicado`);
    alert("Clicou no documento");
  };

  return (
    <div className="fundo">
      <Header fluxo="meuPainel" headerPsicologo={false} />

      {vinculo?.psicologo && (
        <VinculoPsicologo
          nome={vinculo.psicologo.nome}
          email={vinculo.psicologo.email}
          fotoUrl={vinculo.psicologo.fotoUrl}
        />
      )}

      <ProximasSessoes
        fluxo="paciente"
        sessaoMarcada={!!consulta}
        consulta={consulta ?? {} as ConsultaModel}
        verMais={true}
      />

      <h1 className="tittleDocumentos">Documentos</h1>

      <ListagemDocumentos
        documentos={prontuarios.map(p => ({ id: p.id, titulo: p.titulo }))}
        onDocumentoClick={handleDocumentoClick}
      />
    </div>
  );
}