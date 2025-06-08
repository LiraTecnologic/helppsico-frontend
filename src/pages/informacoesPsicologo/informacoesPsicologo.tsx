import { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Estrela from "../../assets/estrela.svg";
import Localizacao from "../../assets/localização.svg";
import TabelaHorario from "../../components/layout/tabela/tabelaHorario";
import CardInfoAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/info/cardInfoAvaliacao";
import BotaoAvaliarInfoPsicologo from "../../components/layout/Cards/cardsInformacoesPsicologo/botaoAvaliar/botaoAvaliarInfoPsicologo";
import CardAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/cardAvaliacao";
import { consultaPsicologo, consultaAvaliacoes } from "./informacoesPsicologoService";
import { listarHorariosPsicologo } from '../../services/horarios.service';
import PsicologoModel from "../../models/psicologo";
import { AvaliacaoModel } from "../../models/avaliacao";
import { HorarioModel } from "../../models/horario";
import calcularMedia from '../../utils/mediaAvaliacao';
import { consultaVinculosPsicologo } from '../../services/vinculos.service';

import "./informacoesPsicologo.css";
import VinculoModel from "../../models/vinculo";
import { EstadoVinculo } from "../../models/enum.vinculo";
import { Link, useLocation } from "react-router-dom";

export default function InformacoesPsicologo() {
  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>([]);
  const [mediaNotaAvaliacao, setMediaNotaAvaliacao] = useState<number | 0>(0);
  const [vinculos, setVinculos] = useState<VinculoModel[] | []>([]);
  const [vinculoPaciente, setVinculoPacietne] = useState<VinculoModel | null>(null)
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [hasVinculo, setHasVinculo] = useState<EstadoVinculo>(EstadoVinculo.NAO_VINCULADO);
  const [hoverSolicitado, setHoverSolicitado] = useState(false);

  function gerarHorarios(inicio: string, fim: string, duracao: number, intervalo: number): string[] {
    const horarios: string[] = [];
    let [h, m] = inicio.split(":").map(Number);
    const [endH, endM] = fim.split(":").map(Number);

    const fimTotalMin = endH * 60 + endM;

    while ((h * 60 + m + duracao) <= fimTotalMin) {
      horarios.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      m += duracao + intervalo;
      h += Math.floor(m / 60);
      m = m % 60;
    }

    return horarios;
  }

  function agruparPorDia(horarios: HorarioModel[]): Record<string, Set<string>> {
    const mapa: Record<string, Set<string>> = {};

    horarios.forEach(h => {
      const lista = gerarHorarios(h.inicio, h.fim, h.duracao, h.intervalo);
      if (!mapa[h.diaSemana]) {
        mapa[h.diaSemana] = new Set();
      }
      lista.forEach(hor => mapa[h.diaSemana].add(hor));
    });

    return mapa;
  }

  const mapaHorarios = agruparPorDia(horarios);
  const dias = Object.keys(mapaHorarios);
  const todosHorariosUnicos = Array.from(
    new Set(dias.flatMap(dia => Array.from(mapaHorarios[dia])))
  ).sort()

  useEffect(() => {
    const idPsicologo = '4f0332c8-7346-44cb-81d6-9a40c621afc9';

    async function carregarPsicologo(idPsicologo: string) {
      const psicologo = await consultaPsicologo(idPsicologo);

      if (psicologo.dado) {
        setPsicologo(psicologo.dado);
      }
    }

    async function carregarAvaliacoes(idPsicologo: string) {
      const avaliacoes = await consultaAvaliacoes(idPsicologo, 0);

      if (avaliacoes.dado) {
        const media = calcularMedia(avaliacoes.dado.content.map(avaliacao => {
          return {
            nota: avaliacao.nota
          }
        }));

        setMediaNotaAvaliacao(media);

        setAvaliacoes(avaliacoes.dado.content);
      }
    }

    async function carregarHorarios(idPsicologo: string) {
      const horarios = await listarHorariosPsicologo(idPsicologo);

      console.log(horarios.dado);

      if (horarios.dado) {
        setHorarios(horarios.dado);
      }
    }

    async function carregarVinculos(idPsicologo: string) {
      const vinculos = await consultaVinculosPsicologo(idPsicologo, 0);

      if (vinculos.dado) {
        setVinculos(vinculos.dado.content);
      }
    }
    carregarPsicologo(idPsicologo);
    carregarAvaliacoes(idPsicologo);
    carregarHorarios(idPsicologo);
    carregarVinculos(idPsicologo);
  }, []);



  if (!psicologo) {
    return <p>Carregando...</p>;
  }

  const location = useLocation();
  const headerPsicologo = (location.state && location.state.headerPsicologo) ?? false;

  return (
    <>
      <Header fluxo="" headerPsicologo={headerPsicologo} />
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
          {hasVinculo === EstadoVinculo.VINCULADO && headerPsicologo === false && (
            <button className="btn-desvinc">Desvincular</button>
          )}

          {hasVinculo === EstadoVinculo.PENDENTE && headerPsicologo === false && (
            hoverSolicitado ? (
              <Link
                to="/paciente/solicitacao-vinculo"
                className="btn-solic-hover"
                onMouseLeave={() => setHoverSolicitado(false)}
              >
                Ver solicitações
              </Link>
            ) : (
              <button
                className="btn-solic"
                onMouseEnter={() => setHoverSolicitado(true)}
              >
                Solicitado
              </button>
            )
          )}

          {hasVinculo === EstadoVinculo.NAO_VINCULADO && headerPsicologo === false && (
            <button>Vincular</button>
          )}

          <div>
            <p>
              {vinculos.length} vinculados | {avaliacoes.length} avaliações
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
              {psicologo.enderecoAtendimento?.rua},{" "}
              {psicologo.enderecoAtendimento?.numero}.
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

            <TabelaHorario
              diaSemana={dias}
              horariosInicio={todosHorariosUnicos}
              mapaHorarios={mapaHorarios}
            />
            
          </section>

          <section className="section-avaliacao">
            <h2>Avaliações e comentários:</h2>
            <div className="cards-section-avaliacao">
              <CardInfoAvaliacao
                nota={mediaNotaAvaliacao}
                quantidadeAvaliacao={avaliacoes.length.toString()}
              />
              <BotaoAvaliarInfoPsicologo psicologo={psicologo} />
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