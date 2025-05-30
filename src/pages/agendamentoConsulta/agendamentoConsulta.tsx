import "./agendamentoConsulta.css";
import Header from "../../components/layout/header/header";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import FotoPsicoloco from "../../assets/Foto.png";
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";
import { useEffect, useState } from "react";

export default function AgendamentoConsulta() {
  const dadosPsicologo = {
    urlFoto: FotoPsicoloco,
    nome: "Dra. Pinchola",
    biografia:
      "Trabalha com programas nas horas vagas Trabalha com programas nas horas vagas Trabalha com programas nas horas vagas Trabalha com programas nas horas vagasLorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.",
    tempoSessao: 40,
    valor: 100,
    diasSelecionados: ["SEG", "TER", "QUA", "QUI", "SEX"],
    inicio: "08:00",
    fim: "18:00",
    intervalo: 10,
  };

  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

  return (
    <>
      <Header fluxo="" headerPsicologo={false} />
      <main>
        <h1>Consulta</h1>
        <div className="container-psicologo">
          <div className="dados-psicologo-consulta">
            <CardPsicologoConsulta
              urlFoto={dadosPsicologo.urlFoto}
              nome={dadosPsicologo.nome}
              biografia={dadosPsicologo.biografia}
              tempoSessao={dadosPsicologo.tempoSessao}
            />
          </div>
          <div>
            <DadosConsultaPsicologo
              selecionado={quantidadeSelecionada}
              valor={dadosPsicologo.valor}
              valorTotal={quantidadeSelecionada * dadosPsicologo.valor}
            />
          </div>
        </div>
        <div className="campo-atendimento">
          <h2>Dias de Atendimento</h2>
          <div className="tabela-horario-consulta">
            <TabelaHorarioConsulta
              dias={dadosPsicologo.diasSelecionados}
              inicio={dadosPsicologo.inicio}
              fim={dadosPsicologo.fim}
              duracao={dadosPsicologo.tempoSessao}
              intervalo={dadosPsicologo.intervalo}
              onSelecionado={(qtd) => setQuantidadeSelecionada(qtd)}
            />
          </div>
        </div>

        <div className="container-botao-contulta">
          <button className="botao-agendar-consulta">Agendar</button>
        </div>
      </main>
    </>
  );
}
