import './listagemPaciente.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Header from '../../components/layout/header/header';
import CardPaciente from '../../components/layout/Cards/cardPaciente/cardPaciente';

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface JwtPayload {
  sub: string
}

interface Paciente {
  nome: string;
  idade: string;
  email: string;
  telefone: string;
  fotoUrl: string;
  temProntuario: boolean;
}

interface ErroDto {
  message: string[];
}

interface ResponseDto<T> {
  dado: T;
  erro?: ErroDto;
}

export default function ListagemPacientes() {

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setPacientes([
      {
        nome: "Ana Beatriz Silva",
        idade: "28",
        email: "ana.silva@example.com",
        telefone: "(11) 91234-5678",
        fotoUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        temProntuario: true
      },
      {
        nome: "Carlos Henrique Souza",
        idade: "35",
        email: "carlos.souza@example.com",
        telefone: "(21) 98876-5432",
        fotoUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        temProntuario: false
      },
      {
        nome: "Fernanda Rocha",
        idade: "24",
        email: "fernanda.rocha@example.com",
        telefone: "(31) 99999-1111",
        fotoUrl: "https://randomuser.me/api/portraits/women/3.jpg",
        temProntuario: true
      },
      {
        nome: "Lucas Almeida",
        idade: "30",
        email: "lucas.almeida@example.com",
        telefone: "(41) 97777-2222",
        fotoUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        temProntuario: false
      },
      {
        nome: "Mariana Castro",
        idade: "26",
        email: "mariana.castro@example.com",
        telefone: "(51) 96666-3333",
        fotoUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        temProntuario: true
      },
      {
        nome: "Mariana Castro",
        idade: "26",
        email: "mariana.castro@example.com",
        telefone: "(51) 96666-3333",
        fotoUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        temProntuario: true
      },
      {
        nome: "Mariana Castro",
        idade: "26",
        email: "mariana.castro@example.com",
        telefone: "(51) 96666-3333",
        fotoUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        temProntuario: true
      },
      {
        nome: "Mariana Castro",
        idade: "26",
        email: "mariana.castro@example.com",
        telefone: "(51) 96666-3333",
        fotoUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        temProntuario: true
      }
    ]);

    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    const idPsicologo = decoded.sub;

    axios.get<ResponseDto<Page<Paciente>>>(`http://localhost:3000/vinculos/psicologo/${idPsicologo}`)
      .then(response => {

        if (response.data.erro) {
          console.error("Erro da API:", response.data.erro.message);
          return;
        }

        const dado = response.data.dado;
        setPacientes(dado.content);
        setTotal(dado.totalElements);
      })
      .catch(error => {
        console.error("Erro ao buscar pacientes: ", error);
      });
  }, []);

  

  return (
    <>
      <Header fluxo='meusPacientes' headerPsicologo={true} />
      <div className="container-pacientes">

        <h1>Pacientes ({total})</h1>

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
