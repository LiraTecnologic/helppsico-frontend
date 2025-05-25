import VinculoModel from "../../../models/vinculo";
import "./listagemDePacientes.css";

interface ListagemDePacientesProps {
  vinculos: VinculoModel[];
  verMais: boolean;
}

export default function ListagemDePacientes({
  vinculos,
  verMais,
}: ListagemDePacientesProps) {
  return (
    <>
      <div className="listagem-pacientes-cabecalho">
        <h1>Pacientes</h1>
        {verMais && <button className="botao-ver-mais">Ver mais</button>}
      </div>
      {vinculos.length === 0 ? (
        <p className="mensagem-vazia">
          O psicólogo ainda não tem nenhum paciente vinculado a ele.
        </p>
      ) : (
        <div className="lista-pacientes">
          {vinculos.map((vinculo, index) => (
            <div className="paciente-card" key={index}>
              <img
                src={vinculo.paciente.fotoUrl}
                alt={vinculo.psicologo.nome}
                className="foto-paciente"
              />
              <h3>{vinculo.paciente.nome}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}