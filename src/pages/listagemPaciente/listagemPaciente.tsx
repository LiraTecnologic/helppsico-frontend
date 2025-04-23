import './listagemPaciente.css';
import Header from '../../components/layout/header/header';
import CardPaciente from '../../components/layout/Cards/cardPaciente';

const pacientes = [
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "../../../assets/imagemPaciente.jpg",
    temProntuario: true,
  },
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "../../../assets/imagemPaciente.jpg",
    temProntuario: false,
  },
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "../../../assets/imagemPaciente.jpg",
    temProntuario: true,
  },
];

export default function ListagemPacientes() {
  return (
    <>
    <Header fluxo='meusPaciente'/>
    <div className="container-pacientes">
      <h1>Pacientes ({pacientes.length})</h1>
      <div className="grid-pacientes">
        {pacientes.map((paciente, index) => (
          <CardPaciente
            key={index}
            nome={paciente.nome}
            idade={paciente.idade}
            email={paciente.email}
            telefone={paciente.telefone}
            fotoUrl={paciente.fotoUrl}
            temProntuario={paciente.temProntuario}
          />
        ))}
      </div>
    </div>
    </>
  );
}
