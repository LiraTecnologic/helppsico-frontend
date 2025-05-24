import { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Estrela from "../../assets/estrela.svg";
import Localizacao from "../../assets/localização.svg";
import TabelaHorario from "../../components/layout/tabela/tabelaHorario";
import CardInfoAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/info/cardInfoAvaliacao";
import BotaoAvaliarInfoPsicologo from "../../components/layout/Cards/cardsInformacoesPsicologo/botaoAvaliar/botaoAvaliarInfoPsicologo";
import CardAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/cardAvaliacao";

import {
  consultaPsicologo,
  consultaAvaliacoes,
  consultaHorarios,
} from "./informacoesPsicologoService";

import PsicologoModel from "../../models/psicologo";
import { AvaliacaoModel } from "../../models/avaliacao";
import { HorarioModel } from "../../models/horario";
import "./informacoesPsicologo.css";

export default function InformacoesPsicologo() {
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>([]);
  const [mediaNotaAvaliacao, setMediaNotaAvaliacao] = useState("0");
  const [quantidadeVinculados, setQuantidadeVinculados] = useState(0);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [psicologoData, avaliacoesData, horariosData] = await Promise.all([
          consultaPsicologo(),
          consultaAvaliacoes(),
          consultaHorarios(),
        ]);

        setPsicologo(psicologoData);
        setAvaliacoes(avaliacoesData);
        setHorarios(horariosData);

        const somaNotas = avaliacoesData.reduce(
          (acc: number, cur: AvaliacaoModel) => acc + cur.nota,
          0
        );
        const media = avaliacoesData.length > 0 ? somaNotas / avaliacoesData.length : 0;
        setMediaNotaAvaliacao(media.toFixed(1));

        setQuantidadeVinculados(12);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  function calcularSessoes(inicio: string, fim: string, duracao: number, intervalo: number): string[] {
    const [inicioHora, inicioMinuto] = inicio.split(":").map(Number);
    const [fimHora, fimMinuto] = fim.split(":").map(Number);

    const inicioTotalMin = inicioHora * 60 + inicioMinuto;
    const fimTotalMin = fimHora * 60 + fimMinuto;

    let atual = inicioTotalMin;
    const sessoes: string[] = [];

    while (atual + duracao <= fimTotalMin) {
      const hora = Math.floor(atual / 60).toString().padStart(2, "0");
      const minuto = (atual % 60).toString().padStart(2, "0");
      sessoes.push(`${hora}:${minuto}`);
      atual += duracao + intervalo;
    }

    return sessoes;
  }

  if (!psicologo) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header fluxo="" headerPsicologo={false} />
      <main className="main-info-psicologico">
        <div className="div-psicologo">
          <img
            src={psicologo.fotoUrl || "https://via.placeholder.com/150"}
            alt="Foto psicólogo"
          />
          <h1>
            {psicologo.nome} ({mediaNotaAvaliacao}{" "}
            <img src={Estrela} alt="Icon estrela" />)
          </h1>
          <button>Vincular</button>
          <div>
            <p>
              {quantidadeVinculados} vinculados | {avaliacoes.length} avaliações
            </p>
            <p>CRP {psicologo.crp}</p>
            <p>{psicologo.email}</p>
            <p>{psicologo.telefone}</p>
          </div>
          <hr />
          <div>
            <p>Local de atendimento:</p>
            <p>
              <img src={Localizacao} alt="Icon localização" />
              {psicologo.enderecoAtendimento.rua}, {psicologo.enderecoAtendimento.numero}.
            </p>
          </div>
        </div>

        <div className="div-direita">
          <section className="section-psico-bio">
            <div className="div-bio-psico">
              <h2>Biografia</h2>
              <p>{psicologo.biografia}</p>
            </div>
          </section>

          <section className="section-tabela">
            <h2>Horários de consulta:</h2>

            {horarios.map((h, i) => {
              const horariosInicio = calcularSessoes(h.inicio, h.fim, h.duracao, h.intervalo);

              return (
                <TabelaHorario
                  key={h.id || i}
                  diasSelecionados={h.diaSemana}
                  horariosInicio={horariosInicio}
                />
              );
            })}
          </section>

          <section className="section-avaliacao">
            <h2>Avaliações e comentários:</h2>
            <div className="cards-section-avaliacao">
              <CardInfoAvaliacao
                nota={parseFloat(mediaNotaAvaliacao)}
                quantidadeAvaliacao={avaliacoes.length.toString()}
              />
              <BotaoAvaliarInfoPsicologo />
            </div>
            <div className="listagem-avaliacao">
              {avaliacoes.map((avaliacao, index) => (
                <CardAvaliacao
                  key={index}
                  fotoPaciente={avaliacao.paciente.fotoUrl || ""}
                  nomePaciente={avaliacao.paciente.nome}
                  data={avaliacao.data}
                  conteudo={avaliacao.comentario}
                  nota={avaliacao.nota}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}