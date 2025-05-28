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
    switch (tipoDocumento.toLowerCase()) {
      case 'atestado':
        return <AtestadoForm />;
      case 'laudo':
        return <LaudoPsicologicoForm />;
      case 'parecer':
        return <ParecerPsicologicoForm />;
      case 'relatorio':
        return <RelatorioPsicologicoForm />;
      case 'declaracao':
        return <DeclaracaoForm />;
      default:
        return <div className="tipo-nao-suportado">Tipo de documento não suportado!</div>;
    }
  };

  return (
    <div className="documento-form-container">
      <CamposComuns campos={camposComuns} setCampos={setCamposComuns} pacientes={pacientes} />

      {renderFormularioEspecifico()}

      <div className="botoes">
        <button className="btn-cancelar" onClick={() => window.location.reload()}>
          Cancelar
        </button>
        <button className="btn-salvar">Salvar</button>
      </div>
    </div>
  );
}