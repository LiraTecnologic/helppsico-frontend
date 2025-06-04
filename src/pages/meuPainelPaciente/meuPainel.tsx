import { useEffect, useState } from 'react';
import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';

import ConsultaModel from '../../models/consulta';
import VinculoModel from '../../models/vinculo';
import ProntuarioModel from '../../models/prontuario';

import { consultaSessoesFuturas } from '../../services/consultas.service';
import { consultaVinculosPaciente } from '../../services/vinculos.service';
import { consultaProntuariosPaciente } from '../../services/prontuarios.service';

export default function MeuPainelPaciente() {
  const [vinculo, setVinculo] = useState<VinculoModel | null>(null);
  const [consulta, setConsulta] = useState<ConsultaModel | null>(null);
  const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

  useEffect(() => {
    async function carregarDadosPaciente(idPaciente: string) {
      const vinculoConsultado = await consultaVinculosPaciente(idPaciente, 1);
      setVinculo(vinculoConsultado.content.length > 0 ? vinculoConsultado.content[0] : null);

      const sessoesConsultadas = await consultaSessoesFuturas(idPaciente, 1);
      if (sessoesConsultadas.content.length > 0) {
        setConsulta(sessoesConsultadas.content[0]);
      }

      const prontuariosConsultados = await consultaProntuariosPaciente(idPaciente, 1);
      setProntuarios(prontuariosConsultados.content);
    }

    // Pegar o paciente logado da mesma forma que psicologo (ajustar conforme o app)
    const pacienteId = 'id-fixo-ou-pegar-localstorage'; 
    carregarDadosPaciente(pacienteId);
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