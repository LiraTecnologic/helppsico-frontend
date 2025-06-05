import { useState } from 'react';
import CamposComuns from './CamposComuns';
import AtestadoForm from './TipoDocumentoForm/AtestadoForm';
import LaudoPsicologicoForm from './TipoDocumentoForm/LaudoPsicologicoForm';
import ParecerPsicologicoForm from './TipoDocumentoForm/ParecerPsicologicoForm';
import RelatorioPsicologicoForm from './TipoDocumentoForm/RelatorioPsicologicoForm';
import DeclaracaoForm from './TipoDocumentoForm/DeclaracaoForm';
import './DocumentoForm.css';

import DadosGeraisDocumentoModel from '../../models/dadosGeraisDocumento';
import PacienteModel from '../../models/paciente';
import PsicologoModel from '../../models/psicologo';
import EnderecoModel from '../../models/endereco';

interface DocumentoFormProps {
  tipoDocumento: string;
  pacientes: PacienteModel[];
  onSubmit: (dados: DadosGeraisDocumentoModel) => void;
}

export default function DocumentoForm({ tipoDocumento, pacientes, onSubmit }: DocumentoFormProps) {
  const [camposComuns, setCamposComuns] = useState({
    paciente: '',
    dataEmissao: '',
    assinaturaPsicologo: ''
  });

  const renderFormularioEspecifico = () => {
    switch (tipoDocumento) {
      case 'ATESTADO':
        return <AtestadoForm />;
      case 'LAUDO_PSICOLOGICO':
        return <LaudoPsicologicoForm />;
      case 'PARECER_PSICOLOGICO':
        return <ParecerPsicologicoForm />;
      case 'RELATORIO_PSICOLOGICO':
        return <RelatorioPsicologicoForm />;
      case 'DECLARACAO':
        return <DeclaracaoForm />;
      default:
        return <div className="tipo-nao-suportado">Tipo de documento não suportado!</div>;
    }
  };

  const handleSalvar = () => {
    const dadosDocumento: DadosGeraisDocumentoModel = {
      paciente: { id: camposComuns.paciente } as PacienteModel,
      psicologo: { id: "456e1234-e89b-12d3-a456-426614174000" } as PsicologoModel,
      dataEmissao: camposComuns.dataEmissao,
      assinaturaPsicologo: camposComuns.assinaturaPsicologo,
      dataValidade: "",
      motivo: "",
      descricao: "",
      finalidade: "",
      solicitante: "",
      objetivo: "",
      historico: "",
      procedimentosUtilizados: "",
      descricaoResultados: "",
      conclusao: "",
      recomendacoes: "",
      sigilo: "",
      contextualizacao: "",
      fundamentacao: "",
      analiseDoCaso: "",
      respostaDemanda: "",
      dataAtendimento: "",
      local: {
        id: "",
        rua: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: "",
        complemento: ""
      } as EnderecoModel,
      descricaoEstadoPsicologico: "",
      periodoAfastamento: ""
    };

    onSubmit(dadosDocumento);
  };

  return (
    <div className="documento-form-container">
      <CamposComuns
        campos={camposComuns}
        setCampos={setCamposComuns}
        pacientes={pacientes}
      />

      {renderFormularioEspecifico()}

      <div className="botoes-documento">
        <button className="btn-cancelar" onClick={() => window.location.reload()}>
          Cancelar
        </button>
        <button className="btn-salvar" onClick={handleSalvar}>
          Salvar
        </button>
      </div>
    </div>
  );
}