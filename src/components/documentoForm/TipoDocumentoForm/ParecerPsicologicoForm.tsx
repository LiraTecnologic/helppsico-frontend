import './ParecerPsicologicoForm.css';

export default function ParecerPsicologicoForm() {
    return (
        <>
            <label className="subtext-parecer" htmlFor="Solicitante" >Solicitante</label>
            <input type="text" id="Solicitante" className='parecer-input' />
            <label className="subtext-parecer" htmlFor="Objetivo" >Objetivo</label>
            <input type="text" id="Objetivo" className='parecer-input' />
            <label className="subtext-parecer" htmlFor="Conclusão" >Conclusão</label>
            <input type="text" id="Conclusão" className='parecer-input' />
            <label className="subtext-parecer" htmlFor="Contextualização" >Contextualização</label>
            <input type="text" id="Contextualização" className='parecer-input' />
            <label className="subtext-parecer" htmlFor="Fundamentação" >Fundamentação</label>
            <input type="text" id="Fundamentação" className='parecer-input' />
            <label className="subtext-parecer" htmlFor="AnaliseDoCaso" >Analise do Caso</label>
            <input type="text" id="AnaliseDoCaso" className='parecer-input' />
        </>
    )
}