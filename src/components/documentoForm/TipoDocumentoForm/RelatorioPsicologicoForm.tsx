import './RelatorioPsicologicoForm.css';

export default function RelatorioPsicologicoForm() {
  return (
    <div className="relatorio-grid">
      <div className="relatorio-grid-item">
        <label className="subtext-relatorio" htmlFor="Solicitante">Solicitante</label>
        <input type="text" id="Solicitante" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item">
        <label className="subtext-relatorio" htmlFor="Objetivo">Objetivo</label>
        <input type="text" id="Objetivo" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item">
        <label className="subtext-relatorio" htmlFor="Sigilo">Sigilo</label>
        <input type="text" id="Sigilo" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item full-width">
        <label className="subtext-relatorio" htmlFor="Histórico">Histórico</label>
        <input type="text" id="Histórico" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item full-width">
        <label className="subtext-relatorio" htmlFor="ProcedimentosUtilizados">Procedimentos Utilizados</label>
        <input type="text" id="ProcedimentosUtilizados" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item full-width">
        <label className="subtext-relatorio" htmlFor="DescriçãoResultados">Descrição dos Resultados</label>
        <input type="text" id="DescriçãoResultados" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item full-width">
        <label className="subtext-relatorio" htmlFor="Conclusão">Conclusão</label>
        <input type="text" id="Conclusão" className="relatorio-input" />
      </div>

      <div className="relatorio-grid-item full-width">
        <label className="subtext-relatorio" htmlFor="Recomendações">Recomendações</label>
        <input type="text" id="Recomendações" className="relatorio-input" />
      </div>
    </div>
  );
}