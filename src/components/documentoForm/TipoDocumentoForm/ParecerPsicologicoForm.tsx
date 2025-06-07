import './ParecerPsicologicoForm.css';

export default function ParecerPsicologicoForm() {
  return (
    <div className="parecer-grid">
      <div className="parecer-grid-item">
        <label className="subtext-parecer" htmlFor="Solicitante">Solicitante</label>
        <input type="text" id="Solicitante" className="parecer-input" />
      </div>

      <div className="parecer-grid-item">
        <label className="subtext-parecer" htmlFor="Objetivo">Objetivo</label>
        <input type="text" id="Objetivo" className="parecer-input" />
      </div>

      <div className="parecer-grid-item full-width">
        <label className="subtext-parecer" htmlFor="Conclusão">Conclusão</label>
        <input type="text" id="Conclusão" className="parecer-input" />
      </div>

      <div className="parecer-grid-item full-width">
        <label className="subtext-parecer" htmlFor="Contextualização">Contextualização</label>
        <input type="text" id="Contextualização" className="parecer-input" />
      </div>

      <div className="parecer-grid-item full-width">
        <label className="subtext-parecer" htmlFor="Fundamentação">Fundamentação</label>
        <input type="text" id="Fundamentação" className="parecer-input" />
      </div>

      <div className="parecer-grid-item full-width">
        <label className="subtext-parecer" htmlFor="AnaliseDoCaso">Analise do Caso</label>
        <input type="text" id="AnaliseDoCaso" className="parecer-input" />
      </div>
    </div>
  );
}
