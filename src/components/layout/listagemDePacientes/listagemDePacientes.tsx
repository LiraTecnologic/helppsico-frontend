import './listagemDePacientes.css';

interface Paciente {
  fotoUrl: string;
  nome: string;
}

interface ListagemDePacientesProps {
  pacientes: Paciente[];
}

export default function ListagemDePacientes({ pacientes }: ListagemDePacientesProps) {
  return (
    <>
      <h1>Pacientes</h1>
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