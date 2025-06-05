import { useState } from 'react';
import CamposComuns from './CamposComuns';
import AtestadoForm from './TipoDocumentoForm/AtestadoForm';
import LaudoPsicologicoForm from './TipoDocumentoForm/LaudoPsicologicoForm';
import ParecerPsicologicoForm from './TipoDocumentoForm/ParecerPsicologicoForm';
import RelatorioPsicologicoForm from './TipoDocumentoForm/RelatorioPsicologicoForm';
import DeclaracaoForm from './TipoDocumentoForm/DeclaracaoForm';
import './DocumentoForm.css'

interface Paciente {
  id: string;
  nome: string;
}

interface DocumentoFormProps {
  tipoDocumento: string;
  pacientes: Paciente[];
}

export default function DocumentoForm({ tipoDocumento, pacientes }: DocumentoFormProps) {
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

  return (
    <div className="documento-form-container">
      <CamposComuns campos={camposComuns} setCampos={setCamposComuns} pacientes={pacientes} />

      {renderFormularioEspecifico()}

      <div className="botoes-documento">
        <button className="btn-cancelar" onClick={() => window.location.reload()}>
          Cancelar
        </button>
        <button className="btn-salvar">Salvar</button>
      </div>
      
    </div>
  );
}