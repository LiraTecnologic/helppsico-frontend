import Estrela from "../../../../../assets/estrela.svg"
import './cardAvaliacao.css';

interface Avaliacao {
    fotoPaciente: string,
    nomePaciente: string,
    data: string,
    conteudo: string
}

export default function CardAvaliacao(avaliacao: Avaliacao) {
    return (
        <div className="card-avaliacao-listagem">
            <div className="card-avaliacao-info">
                <img src={avaliacao.fotoPaciente} alt="Foto psicologo" />
                <div>
                    <p>{avaliacao.nomePaciente}</p>
                    <p>{avaliacao.data}</p>
                </div>
                <div className="estrelas-card-avaliacao">
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                    <img src={Estrela} alt="Estrela" />
                </div>
            </div>
            <p>{avaliacao.conteudo}</p>
        </div>
    );
}