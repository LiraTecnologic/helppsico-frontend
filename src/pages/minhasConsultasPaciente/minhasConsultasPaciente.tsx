import './minhasConsultasPaciente.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import { consultaSessoesFuturasPaciente, consultarSessoesAntigasPaciente } from '../../services/consultas.service'
import consultaMaisRecente from '../../utils/consultaMaisRecente'

export default function DetalhesSessao() {
  const [consultaFutura, setConsultaFutura] = useState<ConsultaModel | null>(null);
  const [consultasAntigas, setConsultasAntigas] = useState<ConsultaModel[] | []>([]);

  useEffect(() => {
    async function consultarConsultaFutura(idPaciente: string) {
      const consultasFuturas = await consultaSessoesFuturasPaciente(idPaciente, 0);

      if(consultasFuturas.dado) {
        setConsultaFutura(consultaMaisRecente(consultasFuturas.dado.content));
      }
      
    }

    async function consultarConsultasAntigas(idPaciente: string) {
      const consultasAntigas = await consultarSessoesAntigasPaciente(idPaciente, 0);

      if(consultasAntigas.dado) {
        setConsultasAntigas(consultasAntigas.dado.content);
      }
    }

    const idPaciente = localStorage.getItem('id-paciente');

    if (idPaciente) {
      consultarConsultaFutura(idPaciente);
      consultarConsultasAntigas(idPaciente);
    } else {
      console.log("Id de paciente null");
    }
  }, []);

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      <h1 className="text-tittle">Minhas Consultas</h1>
      {consultaFutura && (
        <ProximasSessoes
          consulta={consultaFutura}
          verMais={true}
          fluxo='paciente'
          sessaoMarcada={true}
        />
      )}
      <div style={{ marginTop: '48px' }}>
        <SessoesAntigas sessoesAntigas={consultasAntigas} />
      </div>
    </>
  );
}