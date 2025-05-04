  import './detalhesSessao.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import SessoesAntigas from '../../components/layout/Cards/sessoesAntigas/sessoesAntigas';

export default function DetalhesSessao() {
  const sessoesAntigas = [
    {
      sessaoFeita: true,
      nomePsicologo: "João Victor",
      data: "19/06/2025",
      horario: "19:00",
      valor: "R$20,00",
      statusPagamento: "Pago" as 'Pago',
      urlFoto: "https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg",
    },
    {
      sessaoFeita: true,
      nomePsicologo: "João Victor",
      data: "19/06/2025",
      horario: "19:00",
      valor: "R$20,00",
      statusPagamento: "Em aberto" as 'Em aberto',
      urlFoto: "https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg",
    },
    {
      sessaoFeita: true,
      nomePsicologo: "João Victor",
      data: "19/06/2025",
      horario: "19:00",
      valor: "R$20,00",
      statusPagamento: "Cancelado" as 'Cancelado',
      urlFoto: "https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg",
    },
  ];

  return (
    <>
      <Header fluxo="minhasSessoes" />
      <h1 className="text-tittle">Histórico de sessões</h1>
      <ProximasSessoes sessaoMarcada={true} urlFoto='https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg' verMais={false} />
      <div style={{ marginTop: '48px' }}>
        <SessoesAntigas sessoesAntigas={sessoesAntigas} />
      </div>
    </>
  );
}