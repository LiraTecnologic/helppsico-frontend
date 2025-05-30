import { useNavigate } from 'react-router-dom';
import "./cardPaciente.css";

interface CardPacienteProps {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  fotoUrl: string;
  prontuarioId?: string;
}

export default function CardPaciente(props: CardPacienteProps) {
  const navigate = useNavigate();
  
  function abrirProntuario() {
    navigate(`/detalhesProntuario/${props.prontuarioId}`);
  }

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


      {props.prontuarioId ? (
        <button
          className="btn-prontuario"
          disabled={!props.prontuarioId}
          onClick={abrirProntuario}
        >
          Abrir Prontuário
        </button>
      ) : (
        <button
          className="btn-sem-prontuario"
          disabled={!props.prontuarioId}
        >
          Sem prontuário
        </button>
      )
      }
    </div>
  );
}