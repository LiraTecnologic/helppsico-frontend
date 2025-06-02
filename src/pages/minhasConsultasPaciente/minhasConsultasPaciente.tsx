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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function consultarConsultaFutura(idPaciente: string) {
      try {
        const consultasFuturas = await consultaSessoesFuturasPaciente(idPaciente, 1);
        const consulta = consultaMaisRecente(consultasFuturas.content);
        setConsultaFutura(consulta);
      } catch (error) {
        console.log('Erro ao buscar consultas futuras:', error);
      }
    }

    async function consultarConsultasAntigas(idPaciente: string) {
      try {
        const consultasAntigas = await consultarSessoesAntigasPaciente(idPaciente, 1);
        setConsultasAntigas(consultasAntigas.content);
      } catch (error) {
        console.log('Erro ao buscar consultas antigas:', error);
      }
    }

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        consultarConsultaFutura("teste"),
        consultarConsultasAntigas("teste")
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header fluxo="minhasSessoes" headerPsicologo={false} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando suas consultas...</p>
        </div>
      </>
    );
  }

  return (
    <div className="minhas-consultas-container">
      <Header fluxo="minhasSessoes" headerPsicologo={false} />
      
      <div className="page-content">
        <h1 className="text-tittle">Minhas Consultas</h1>
        
        {consultaFutura && (
          <ProximasSessoes
            consulta={consultaFutura}
            verMais={true}
            fluxo='paciente'
            sessaoMarcada={true}
          />
        )}
        
        <div className="sessoes-antigas-container">
          <SessoesAntigas sessoesAntigas={consultasAntigas} />
        </div>
      </div>
    </div>
  );
}