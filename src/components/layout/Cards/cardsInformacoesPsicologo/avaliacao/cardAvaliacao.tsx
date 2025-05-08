import Estrela from "../../../../../assets/estrela.svg"
import './cardAvaliacao.css';

interface Avaliacao {
    fotoPaciente: string,
    nomePaciente: string,
    data: string,
    conteudo: string
}

export default function CardAvaliacao(avaliacao: Avaliacao) {
    
    function formatarData(dataISO: string): string {
        const data = new Date(dataISO);
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(data);
    }

    return (
        <div className="card-avaliacao-listagem">
            <div className="card-avaliacao-info">
                <img src={avaliacao.fotoPaciente} alt="Foto psicologo" />
                <div className="nome-data-avaliacao">
                    <p className="nome-paciente">{avaliacao.nomePaciente}</p>
                    <p className="data-avaliacao">{formatarData(avaliacao.data)}</p>
                </div>
                <div className="estrelas-card-avaliacao">
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                </div>
            </div>
            <p className="conteudo-avaliacao">{avaliacao.conteudo}</p>
        </div>
    );
}