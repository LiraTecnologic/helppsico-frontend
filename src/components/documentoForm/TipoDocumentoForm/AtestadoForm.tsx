import './AtestadoForm.css';

export default function AtestadoForm() {
    return (
        <div className="atestado-grid">
            <div className="atestado-grid-item">
                <label className="subtext-atestado" htmlFor="DataAtendimento">Data do Atendimento</label>
                <input type="date" id="DataAtendimento" className="atestado-input" />
            </div>

            <div className="atestado-grid-item">
                <label className="subtext-atestado" htmlFor="PeriodoAfastamento">Período de Afastamento</label>
                <input type="text" id="PeriodoAfastamento" className="atestado-input" />
            </div>

            <div className="atestado-grid-item">
                <label className="subtext-atestado" htmlFor="DataValidade">Data de Validade</label>
                <input type="date" id="DataValidade" className="atestado-input" />
            </div>

            <div className="atestado-grid-item">
                <label className="subtext-atestado" htmlFor="Local">Local</label>
                <input type="text" id="Local" className="atestado-input" />
            </div>

            <div className="atestado-grid-item">
                <label className="subtext-atestado" htmlFor="Finalidade">Finalidade</label>
                <input type="text" id="Finalidade" className="atestado-input" />
            </div>

            <div className="atestado-grid-item full-width">
                <label className="subtext-atestado" htmlFor="Descrição">Descrição</label>
                <textarea id="Descrição" className="atestado-textarea" />
            </div>
        </div>
    );
}
