import { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Estrela from "../../assets/estrela.svg";
import Localizacao from "../../assets/localização.svg";
import CardInfoAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/info/cardInfoAvaliacao";
import BotaoAvaliarInfoPsicologo from "../../components/layout/Cards/cardsInformacoesPsicologo/botaoAvaliar/botaoAvaliarInfoPsicologo";
import CardAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/cardAvaliacao";
import {
  consultaPsicologo,
  consultaAvaliacoes,
} from "./informacoesPsicologoService";
import { listarHorariosPsicologo } from "../../services/horarios.service";
import PsicologoModel from "../../models/psicologo";
import { AvaliacaoModel } from "../../models/avaliacao";
import { HorarioModel } from "../../models/horario";
import calcularMedia from "../../utils/mediaAvaliacao";
import {
  consultaVinculosPsicologo,
  deleteVinculo,
  criarVinculo,
} from "../../services/vinculos.service";
import TabelaHorarioConsulta from "../../components/layout/tabelaHorarioConsulta/tabelaHorarioConsulta";

import "./informacoesPsicologo.css";
import VinculoModel from "../../models/vinculo";
import { EstadoVinculo } from "../../models/enum.vinculo";
import { Link, useLocation } from "react-router-dom";
import { apresentarErro, notificarSucesso } from "../../utils/notificacoes";

export default function InformacoesPsicologo() {
  const location = useLocation();
  const idPsicologo = (location.state && location.state.idPsicologo) ?? "";
  const headerPsicologo =
    (location.state && location.state.headerPsicologo) ?? false;

  const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>([]);
  const [mediaNotaAvaliacao, setMediaNotaAvaliacao] = useState<number | 0>(0);
  const [vinculos, setVinculos] = useState<VinculoModel[] | []>([]);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [hasVinculo, setHasVinculo] = useState<EstadoVinculo>(
    EstadoVinculo.NAO_VINCULADO
  );
  const [hoverSolicitado, setHoverSolicitado] = useState(false);
  const [vinculoPaciente, setVinculoPaciente] = useState<VinculoModel | null>(
    null
  );

  function gerarHorarios(
    inicio: string,
    fim: string,
    duracao: number,
    intervalo: number
  ): string[] {
    const horarios: string[] = [];
    let [h, m] = inicio.split(":").map(Number);
    const [endH, endM] = fim.split(":").map(Number);
    const fimTotalMin = endH * 60 + endM;

    while (h * 60 + m + duracao <= fimTotalMin) {
      horarios.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
      m += duracao + intervalo;
      h += Math.floor(m / 60);
      m = m % 60;
    }

    return horarios;
  }

  function agruparPorDia(
    horarios: HorarioModel[]
  ): Record<string, Set<string>> {
    const mapa: Record<string, Set<string>> = {};
    horarios.forEach((h) => {
      const lista = gerarHorarios(h.inicio, h.fim, h.duracao, h.intervalo);
      if (!mapa[h.diaSemana]) mapa[h.diaSemana] = new Set();
      lista.forEach((hor) => mapa[h.diaSemana].add(hor));
    });
    return mapa;
  }

  useEffect(() => {
    const idPaciente = localStorage.getItem("id-paciente");

    async function carregarPsicologo(id: string) {
      const response = await consultaPsicologo(id);
      if (response.dado) setPsicologo(response.dado);
    }

    async function carregarAvaliacoes(id: string) {
      const response = await consultaAvaliacoes(id, 0);
      if (response.dado) {
        const avaliacoesData = response.dado.content;
        setAvaliacoes(avaliacoesData);
        const media = calcularMedia(
          avaliacoesData.map((a) => ({ nota: a.nota }))
        );
        setMediaNotaAvaliacao(media);
      }
    }

    async function carregarHorarios(id: string) {
      const response = await listarHorariosPsicologo(id);
      if (response.dado) setHorarios(response.dado);
    }

    async function carregarVinculos(id: string) {
      const response = await consultaVinculosPsicologo(id, 0);
      if (response.dado) {
        const todosVinculos = response.dado.content;
        setVinculos(todosVinculos);

        if (idPaciente) {
          const vinculo = todosVinculos.find(
            (v) => v.paciente?.id === idPaciente
          );
          setVinculoPaciente(vinculo || null);

          if (vinculo) {
            if (vinculo.status === "ATIVO")
              setHasVinculo(EstadoVinculo.VINCULADO);
            else if (vinculo.status === "PENDENTE")
              setHasVinculo(EstadoVinculo.PENDENTE);
            else setHasVinculo(EstadoVinculo.NAO_VINCULADO);
          } else {
            setHasVinculo(EstadoVinculo.NAO_VINCULADO);
          }
        }
      }
    }

    carregarPsicologo(idPsicologo);
    carregarAvaliacoes(idPsicologo);
    carregarHorarios(idPsicologo);
    carregarVinculos(idPsicologo);
  }, [idPsicologo]);

  if (!psicologo) return <p>Carregando...</p>;

  async function handleVincular() {
    const idPaciente = localStorage.getItem("id-paciente");
    if (!idPaciente || !psicologo?.id) {
      apresentarErro("Paciente ou psicólogo não encontrado");
      return;
    }

    try {
      const novoVinculo = {
        psicologo: { id: psicologo.id },
        paciente: { id: idPaciente },
        status: EstadoVinculo.PENDENTE,
      };

      const response = await criarVinculo(novoVinculo);
      if (response) {
        notificarSucesso("Solicitação enviada com sucesso");
        setHasVinculo(EstadoVinculo.PENDENTE);
        setVinculoPaciente(response);
      } else {
        apresentarErro("Erro ao solicitar vínculo. Tente novamente");
      }
    } catch (error) {
      console.error("Erro ao criar vínculo:", error);
      apresentarErro("Erro ao solicitar vínculo");
    }
  }

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

          {hasVinculo === EstadoVinculo.VINCULADO && !headerPsicologo && (
            <button
              className="btn-desvinc"
              onClick={async () => {
                if (vinculoPaciente) {
                  try {
                    await deleteVinculo(vinculoPaciente.id);
                    setHasVinculo(EstadoVinculo.NAO_VINCULADO);
                    setVinculoPaciente(null);
                    notificarSucesso("Desvinculado com sucesso");
                  } catch (err) {
                    apresentarErro("Erro ao desvincular. Tente novamente");
                  }
                }
              }}
            >
              Desvincular
            </button>
          )}

          {hasVinculo === EstadoVinculo.PENDENTE &&
            !headerPsicologo &&
            (hoverSolicitado ? (
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
            ))}

          {hasVinculo === EstadoVinculo.NAO_VINCULADO && !headerPsicologo && (
            <button onClick={handleVincular} className="clicar">
              Vincular
            </button>
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
            <TabelaHorarioConsulta horarios={horarios} alterar={false} />
          </section>

          <section className="section-avaliacao">
            <h2>Avaliações e comentários:</h2>
            <div className="cards-section-avaliacao">
              <CardInfoAvaliacao
                nota={mediaNotaAvaliacao}
                quantidadeAvaliacao={avaliacoes.length.toString()}
              />
              <BotaoAvaliarInfoPsicologo
                psicologo={psicologo}
                origem={headerPsicologo}
                estadoVinculo={hasVinculo}
              />
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
