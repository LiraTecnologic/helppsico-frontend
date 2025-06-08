import './minhasConsultasPsicologo.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';
import { useState, useEffect } from 'react';
import ConsultaModel from '../../models/consulta';
import { consultaSessoesFuturasPsicologo, consultarSessoesAntigasPsicologo } from '../../services/consultas.service'
import consultaMaisRecente from '../../utils/consultaMaisRecente'

export default function MinhasConsultasPsicologo() {
  const [consultaFutura, setConsultaFutura] = useState<ConsultaModel | null>(null);
  const [consultasAntigas, setConsultasAntigas] = useState<ConsultaModel[] | []>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function consultarConsultaFutura(idPsicologo: string) {
      try {
        const consultasFuturas = await consultaSessoesFuturasPsicologo(idPsicologo, 0);

        if(consultasFuturas.dado) {
          setConsultaFutura(consultaMaisRecente(consultasFuturas.dado.content));
        }

      } catch (error) {
        console.error("Erro ao consultar consultas futuras:", error);
        setErro("Não foi possível carregar suas próximas consultas. Tente novamente mais tarde.");
      }
    }

    async function consultarConsultasAntigas(idPsicologo: string) {
      try {
        const response = await consultarSessoesAntigasPsicologo(idPsicologo, 0);
        if (response.dado) {
          setConsultasAntigas(response.dado.content);
        }
      } catch (error) {
        console.error("Erro ao consultar consultas antigas:", error);
        setErro("Não foi possível carregar suas consultas anteriores. Tente novamente mais tarde.");
      }
    }

    async function carregarDados() {
      setCarregando(true);
      setErro(null);

    
      const idPsicologo = localStorage.getItem('id-psicologo');

      if (idPsicologo) {
        await Promise.all([
          consultarConsultaFutura(idPsicologo),
          consultarConsultasAntigas(idPsicologo)
        ]);
      } else {
        setErro("Usuário não identificado. Faça login novamente.");
      }

      setCarregando(false);
    }

    carregarDados();
  }, []);

  return (
    <>
      <Header fluxo="minhasSessoes" headerPsicologo={true} />
      <h1 className="text-tittle">Minhas Consultas</h1>
      
      {carregando ? (
        <div className="carregando">Carregando suas consultas...</div>
      ) : erro ? (
        <div className="erro">{erro}</div>
      ) : (
        <>
          {consultaFutura ? (
            <ProximasSessoes
              consulta={consultaFutura}
              verMais={true}
              fluxo='psicologo'
            />
          ) : (
            <ProximasSessoes
              consulta={{} as ConsultaModel}
              verMais={true}
              fluxo='psicologo'
            />
          )}
          <div style={{ marginTop: '48px' }}>
            <SessoesAntigas sessoesAntigas={consultasAntigas} fluxo='psicologo' />
          </div>
        </>
      )}
    </>
  );
}