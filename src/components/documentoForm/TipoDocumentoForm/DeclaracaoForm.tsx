import './DeclaracaoForm.css';

export default function DeclaracaoForm() {
  return (
    <div className="declaracao-grid">
      <div className="declaracao-grid-item">
        <label className="subtext-declaracao" htmlFor="Motivo">Motivo</label>
        <input type="text" id="Motivo" className="declaracao-input" />
      </div>

      <div className="declaracao-grid-item">
        <label className="subtext-declaracao" htmlFor="Finalidade">Finalidade</label>
        <input type="text" id="Finalidade" className="declaracao-input" />
      </div>

      <div className="declaracao-grid-item full-width">
        <label className="subtext-declaracao" htmlFor="Descrição">Descrição</label>
        <input type="text" id="Descrição" className="declaracao-input" />
      </div>
    </div>
  );
}
