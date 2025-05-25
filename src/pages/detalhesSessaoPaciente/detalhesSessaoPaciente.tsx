import './detalhesSessaoPaciente.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import { consultaSessoesFuturas } from '../../services/consultas.service'
import consultaMaisRecente from '../../utils/consultaMaisRecente'

export default function DetalhesSessao() {
  const [consultaFutura, setConsultaFutura] = useState<ConsultaModel | null>(null);
  const [consultasAntigas, setConsultasAntigas] = useState<ConsultaModel[] | []>([]);

  useEffect(() => {
    async function consultarConsultaFutura(idPaciente:string) {
      const consultasFuturas = await consultaSessoesFuturas(idPaciente, 1);
      setConsultaFutura(consultaMaisRecente(consultasFuturas.content));
    }

    consultarConsultaFutura("");
  }, []);

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      <h1 className="text-tittle">Histórico de sessões</h1>
      <ProximasSessoes consulta={consultaFutura} verMais={true} fluxo='paciente' sessaoMarcada={true} />
      <div style={{ marginTop: '48px' }}>
        <SessoesAntigas sessoesAntigas={sessoesAntigas} />
      </div>
    </>
  );
}