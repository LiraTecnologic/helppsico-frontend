import './LaudoPsicologicoForm.css';

export default function LaudoPsicologicoForm() {
    return (
        <>
            <label className="subtext-laudo" htmlFor="Solicitante">Solicitante</label>
            <input type="text" id="Solicitante" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="Objetivo">Objetivo</label>
            <input type="text" id="Objetivo" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="Historico">Histórico</label>
            <input type="text" id="Historico" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="ProcedimentosUtilizados">Procedimentos Utilizados</label>
            <input type="text" id="ProcedimentosUtilizados" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="DescriçãoResultados">Descrição Resultados</label>
            <input type="text" id="DescriçãoResultados" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="Conclusão">Conclusão</label>
            <input type="text" id="Conclusão" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="RespostaDemanda">Resposta Demanda</label>
            <input type="text" id="RespostaDemanda" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="Recomendações">Recomendações</label>
            <input type="text" id="Recomendações" className='laudo-input' />
            <label className="subtext-laudo" htmlFor="Sigilo">Sigilo</label>
            <input type="text" id="Sigilo" className='laudo-input' />
        </>
    )
}