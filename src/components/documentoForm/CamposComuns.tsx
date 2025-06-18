import './CamposComuns.css';

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

export default function CamposComuns({ campos, setCampos, paciente }: CamposComunsProps) {
  return (
    <div className="campos-comuns-grid">
      <div className="campo-grid-item">
        <label className="documento-label" htmlFor="paciente">Paciente</label>
        <select
          id="paciente"
          className="documento-select"
          value={campos.paciente}
          onChange={(e) => setCampos({ ...campos, paciente: e.target.value })}
        >
          <option value="">Selecione o paciente</option>
          {paciente.nome}
        </select>
      </div>

      <div className="campo-grid-item">
        <label className="documento-label" htmlFor="dataEmissao">Data de Emissão</label>
        <input
          id="dataEmissao"
          className="documento-input"
          type="date"
          value={campos.dataEmissao}
          onChange={(e) => setCampos({ ...campos, dataEmissao: e.target.value })}
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