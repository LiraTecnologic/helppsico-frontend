import "./cardAvaliacao.css";
import Estrelas from "./info/estrelas/estrelas";

interface Avaliacao {
  fotoPaciente: string;
  nomePaciente: string;
  data: string;
  conteudo: string;
  nota: number;
}

export default function CardAvaliacaoCrp(avaliacao: Avaliacao) {
    
    function formatarData(dataISO: string): string {
        if (!dataISO) return "";
        
        const data = new Date(dataISO);
        if (isNaN(data.getTime())) return "";
        
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(data);
    }
  return (
    <div className="card-avaliacao-listagem">
      <div className="card-avaliacao-info">
        <img
          src={fotoPaciente}
          alt={`Foto de ${nomePaciente}`}
          className="foto-paciente-avaliacao"
        />
        <div className="nome-data-avaliacao">
          <p className="nome-paciente">{nomePaciente}</p>
          <p className="data-avaliacao">{formatarData(data)}</p>
        </div>
        <div className="estrelas-container">
          <Estrelas nota={nota} className="estrelas-custom" />
        </div>
      </div>
      <p className="conteudo-avaliacao">{conteudo}</p>
    </div>
  );
}