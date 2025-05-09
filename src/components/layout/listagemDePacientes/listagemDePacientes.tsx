import './listagemDePacientes.css';

interface Paciente {
  fotoUrl: string;
  nome: string;
}

interface ListagemDePacientesProps {
  pacientes: Paciente[];
  verMais: boolean;
}

export default function ListagemDePacientes({ pacientes, verMais }: ListagemDePacientesProps) {
  return (
    <>
      <div className="listagem-pacientes-cabecalho">
        <h1>Pacientes</h1>
        {verMais && (
            <button className="botao-ver-mais">Ver mais</button>
        )}
      </div>
      {pacientes.length === 0 ? (
        <p className="mensagem-vazia">O psicólogo ainda não tem nenhum paciente vinculado a ele.</p>
      ) : (
        <div className="lista-pacientes">
          {pacientes.map((paciente, index) => (
            <div className="paciente-card" key={index}>
              <img src={paciente.fotoUrl} alt={paciente.nome} className="foto-paciente" />
              <h3>{paciente.nome}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}