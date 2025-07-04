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
          src={avaliacao.fotoPaciente}
          alt={`Foto de ${avaliacao.nomePaciente}`}
          className="foto-paciente-avaliacao"
        />
        <div className="nome-data-avaliacao">
          <p className="nome-paciente">{avaliacao.nomePaciente}</p>
          <p className="data-avaliacao">{formatarData(avaliacao.data)}</p>
        </div>
        <div className="estrelas-container">
          <Estrelas nota={avaliacao.nota} className="estrelas-custom" />
        </div>
      </div>
      <p className="conteudo-avaliacao">{avaliacao.conteudo}</p>
    </div>
  );
}