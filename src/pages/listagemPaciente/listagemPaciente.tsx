import './listagemPaciente.css';
import Header from '../../components/layout/header/header';
import CardPaciente from '../../components/layout/Cards/cardPaciente';

const pacientes = [
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg",
    temProntuario: true,
  },
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "https://f.i.uol.com.br/fotografia/2021/01/21/16112667646009faccd2da9_1611266764_3x4_md.jpg",
    temProntuario: false,
  },
  {
    nome: "Nome Paciente Legal",
    idade: "XX",
    email: "email@simsim.com",
    telefone: "(22) 9 9999-9999",
    fotoUrl: "https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-08/Arrascaeta%2008202024.jpg?itok=KXjK81nW",
    temProntuario: true,
  },
];

export default function ListagemPacientes() {
  return (
    <>
    <Header fluxo='meusPacientes'/>
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
