import "./cardPaciente.css";

interface CardPacienteProps {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  fotoUrl: string;
  prontuarioId: string;
}

export default function CardPaciente(props: CardPacienteProps) {
  return (
    <div className="card-paciente">
      <div className="card-topo">
        <img
          className="foto-paciente"
          src={props.fotoUrl}
          alt={`Foto de ${props.nome}`}
        />
        <div className="info-paciente">
          <h2 className="nome">{props.nome}</h2>
          <p className="idade">{props.idade} anos</p>
          <p className="email">{props.email}</p>
          <p className="telefone">{props.telefone}</p>
        </div>
      </div>
      
      <button
        className={props.prontuarioId ? "btn-prontuario" : "btn-sem-prontuario"}
        disabled={!props.prontuarioId}
      >
        {props.prontuarioId ? "Abrir Prontuário" : "Sem prontuário"}
      </button>
    </div>
  );
}