import './CamposComuns.css';
import { useEffect } from 'react';

interface CamposComunsProps {
  campos: {
    paciente: string;
    dataEmissao: string;
    assinaturaPsicologo: string;
  };
  setCampos: React.Dispatch<React.SetStateAction<{
    paciente: string;
    dataEmissao: string;
    assinaturaPsicologo: string;
  }>>;
  paciente: { id: string; nome: string };
}

const getDataBrasileiraHoje = () => {
  const agora = new Date();
  const offsetBrasilia = -3 * 60;
  const local = new Date(agora.getTime() + (offsetBrasilia - agora.getTimezoneOffset()) * 60000);
  return local.toISOString().split("T")[0];
};

export default function CamposComuns({ campos, setCampos, paciente }: CamposComunsProps) {
  useEffect(() => {
    setCampos((prev) => ({
      ...prev,
      paciente: paciente.id,
      dataEmissao: getDataBrasileiraHoje()
    }));
  }, [setCampos, paciente.id]);

  return (
    <div className="campos-comuns-grid">
      <div className="campo-grid-item">
        <label className="documento-label" htmlFor="paciente">Paciente</label>
        <input
          id="paciente"
          className="documento-input"
          value={paciente.nome}
          readOnly
        />
      </div>

      <div className="campo-grid-item">
        <label className="documento-label" htmlFor="dataEmissao">Data de Emissão</label>
        <input
          id="dataEmissao"
          className="documento-input"
          type="date"
          value={campos.dataEmissao}
          readOnly
        />
      </div>

      <div className="campo-grid-item">
        <label className="documento-label" htmlFor="assinaturaPsicologo">Assinatura do Psicólogo</label>
        <input
          id="assinaturaPsicologo"
          className="documento-input"
          value={campos.assinaturaPsicologo}
          onChange={(e) => setCampos({ ...campos, assinaturaPsicologo: e.target.value })}
        />
      </div>
    </div>
  );
}