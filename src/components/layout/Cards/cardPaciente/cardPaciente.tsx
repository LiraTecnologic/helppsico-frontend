import "./cardPaciente.css";

interface CardPacienteProps {
  nome: string;
  idade: string;
  email: string;
  telefone: string;
  fotoUrl: string;
  temProntuario: boolean;
}

export default function CardPaciente({
  nome,
  idade,
  email,
  telefone,
  fotoUrl,
  temProntuario,
}: CardPacienteProps) {
  return (
    <div className="card-paciente">
      <div className="card-topo">
        <img className="foto-paciente" src={fotoUrl} alt={`Foto de ${nome}`} />
        <div className="info-paciente">
          <h2 className="nome">{nome}</h2>
          <p className="idade">{idade} anos</p>
          <p className="email">{email}</p>
          <p className="telefone">{telefone}</p>
        </div>
      </div>

      <button
        className={temProntuario ? "btn-prontuario" : "btn-sem-prontuario"}
        disabled={!temProntuario}
      >
        {temProntuario ? "Abrir Prontuário" : "Sem prontuário"}
      </button>
    </div>
  );
}