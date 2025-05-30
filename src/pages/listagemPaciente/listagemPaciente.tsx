import './listagemPaciente.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Header from '../../components/layout/header/header';
import CardPaciente from '../../components/layout/Cards/cardPaciente/cardPaciente';
import PacienteModel from '../../models/paciente';
import { consultaVinculosPsicologo } from '../../services/vinculos.service';
import VinculoModel from '../../models/vinculo';
import calcular from '../../utils/calculoData';
import { consultaProntuariosPsicologo } from '../../services/prontuarios.service';
import ProntuarioModel from '../../models/prontuario';

export default function ListagemPacientes() {

  const [pacientes, setPacientes] = useState<VinculoModel[]>([]);
  const [total, setTotal] = useState(0);
  const [prontuarios, setProntuarios] = useState<ProntuarioModel[]>([]);

  useEffect(() => {
    const idPsicologo = localStorage.getItem('id-psicologo');

    async function carregarVinculos(idPsicologo: string) {
      const vinculos = await consultaVinculosPsicologo(idPsicologo, 1);
      setPacientes(vinculos.dado.content);
    }

    async function carregarProntuarios(idPsicologo: string) {
      const prontuarios = await consultaProntuariosPsicologo(idPsicologo, 1);
      setProntuarios(prontuarios.content);
    }

    if (idPsicologo) {
      carregarVinculos(idPsicologo);
      carregarProntuarios(idPsicologo);
    }

  }, []);

  function buscarProntuarioMaisRecente(idPaciente: string) {
    const prontuariosDoPaciente = prontuarios.filter(
      (prontuario) => prontuario.paciente.id === idPaciente
    );

    if (prontuariosDoPaciente.length === 0) {
      return null; 
    }

    prontuariosDoPaciente.sort(
      (a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
    );

    return prontuariosDoPaciente[0];
  }


  return (
    <>
      <Header fluxo='meusPacientes' headerPsicologo={true} />
      <div className="container-pacientes">

        <h1>Pacientes ({total})</h1>

        <div className="grid-pacientes">
          {pacientes.map((vinculo, index) => (
            <CardPaciente
              key={index}
              nome={vinculo.paciente.nome}
              idade={calcular(vinculo.paciente.dataNascimento)}
              email={vinculo.paciente.email}
              telefone={vinculo.paciente.telefone}
              fotoUrl={vinculo.paciente.fotoUrl}
              prontuarioId={buscarProntuarioMaisRecente(vinculo.paciente.id)?.id}
            />
          ))}

        </div>
      </div>
    </>
  );
}
