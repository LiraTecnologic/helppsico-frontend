import './minhasConsultasPsicologo.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import { consultaSessoesFuturasPsicologo, consultarSessoesAntigasPsicologo } from '../../services/consultas.service'
import consultaMaisRecente from '../../utils/consultaMaisRecente'

export default function DetalhesSessao() {
  const [consultaFutura, setConsultaFutura] = useState<ConsultaModel | null>(null);
  const [consultasAntigas, setConsultasAntigas] = useState<ConsultaModel[] | []>([]);

  useEffect(() => {
    async function consultarConsultaFutura(idPsicologo: string) {
      const consultasFuturas = await consultaSessoesFuturasPsicologo(idPsicologo, 1);
      setConsultaFutura(consultaMaisRecente(consultasFuturas.content));
    }

    async function consultarConsultasAntigas(idPsicologo: string) {
      const response = await consultarSessoesAntigasPsicologo(idPsicologo, 1);
      if (response.dado) {
        setConsultasAntigas(response.dado.content);
      }
    }

    consultarConsultaFutura("teste");
    consultarConsultasAntigas("teste");
  }, []);

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={true} />
      <h1 className="text-tittle">Minhas Consultas</h1>
      {consultaFutura && (
        <ProximasSessoes
          consulta={consultaFutura}
          verMais={true}
          fluxo='psicologo'
          sessaoMarcada={true}
        />
      )}
      <div style={{ marginTop: '48px' }}>
        <SessoesAntigas sessoesAntigas={consultasAntigas} fluxo='psicologo' />
      </div>
    </>
  );
}