import './listagemPaciente.css';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/header/header';
import CardPaciente from '../../components/layout/Cards/cardPaciente/cardPaciente';
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
    // const idPsicologo = localStorage.getItem('id-psicologo');
    const idPsicologo = '0873d229-fd10-488a-b7e9-f294aa10e5db';

    async function carregarVinculos(idPsicologo: string) {
      const vinculos = await consultaVinculosPsicologo(idPsicologo, 0);

      if(vinculos.dado) {
        setPacientes(vinculos.dado.content);
      }
    }

    async function carregarProntuarios(idPsicologo: string) {
      const prontuarios = await consultaProntuariosPsicologo(idPsicologo, 0);

      if(prontuarios.dado) {
        setProntuarios(prontuarios.dado.content);
      }
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
