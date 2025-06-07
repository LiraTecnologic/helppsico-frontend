import "./gerenciamentoHorarios.css";
import Header from "../../components/layout/header/header";
import { useEffect, useState } from "react";
import ConfiguracaoHorario from "../../components/layout/configurarHorario/configurarHorario";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";
import { salvarHorario, listarHorariosPsicologo } from "../../services/horarios.service";
import { HorarioModel } from "../../models/horario";
import PsicologoModel from "../../models/psicologo";
import EnderecoModel from "../../models/endereco";
import { converterDiaSemana } from '../../utils/converteDias';

export default function GerenciamentoDeHorarios() {
  const [hasConfig, setHasConfig] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horaInicio, setHoraInicio] = useState("08:00:00");
  const [horaFim, setHoraFim] = useState("18:00:00");
  const [tempoSessao, setTempoSessao] = useState<number>(50);
  const [intervaloSessao, setIntervaloSessao] = useState<number>(10);

  const idPsicologo: string = "0873d229-fd10-488a-b7e9-f294aa10e5db";

  const ordemDias = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
  
  function calcularFim(inicio: string, duracao: number): string {
    const [hora, minuto] = inicio.split(':').map(Number);
    const data = new Date();
    data.setHours(hora, minuto + duracao);

    const horaFim = data.getHours().toString().padStart(2, '0');
    const minutoFim = data.getMinutes().toString().padStart(2, '0');
    return `${horaFim}:${minutoFim}`;
  }

  useEffect(() => {
    async function carregarHorarios() {
      try {
        const horarios = await listarHorariosPsicologo(idPsicologo);

        if (horarios.dado) {
          const data = horarios.dado;
          if (horarios.dado.length === 0) {
            setHasConfig(false);
          } else {
            setHasConfig(true);
            setHorarios(data);

            const diasUnicos = [...new Set(data.map((h: HorarioModel) => h.diaSemana))];
            const diasReduzidos = diasUnicos.map(dia => dia.substring(0, 3).toUpperCase());
            setDiasSelecionados(diasReduzidos);

            setHoraInicio(data[0].inicio);
            setHoraFim(data[0].fim);
          }
        }


      } catch (err) {
        console.error("Erro ao carregar horários:", err);
      }
    }

    carregarHorarios();
  }, []);

  async function salvarHorariosSelecionados(novosCards: Record<string, string>) {
    const horariosASalvar = [];

    for (const id in novosCards) {
      if (novosCards[id] === "Disponivel para Agendamento") {
        const [diaSemana, faixa] = id.split("-");
        if (!faixa) continue;
        const [inicio, fim] = faixa.trim().split(" - ");

        horariosASalvar.push({
          diaSemana,
          inicio,
          fim,
          disponivel: true,
          psicologo: { id: idPsicologo },
        });
      }
    }

    try {
      for (const horario of horariosASalvar) {

        const psicologo: PsicologoModel = {
          id: idPsicologo,
          nome: '',
          crp: '',
          cpf: '',
          email: '',
          telefone: '',
          dataNascimento: '',
          genero: 'MASCULINO',
          enderecoAtendimento: {} as EnderecoModel,
          biografia: '',
          status: '',
          fotoUrl: '',
          valorSessao: 0,
          tempoSessao: 0
        }

        const novoHorario: HorarioModel = {
          id: '',
          psicologo: psicologo,
          diaSemana: converterDiaSemana(horario.diaSemana),
          inicio: horario.inicio,
          fim: calcularFim(horario.inicio, tempoSessao),
          intervalo: intervaloSessao,
          duracao: tempoSessao,
          disponivel: horario.disponivel
        }

        console.log('Novo horário: ', novoHorario);

        await salvarHorario(novoHorario);
      }
      alert("Horários salvos com sucesso!");
      const data = await listarHorariosPsicologo(idPsicologo);

      if (data.dado) {
        setHorarios(data.dado);
      }
    } catch (error) {
      alert("Erro ao salvar horários.");
      console.error(error);
    }
  }

  return (
    <>
      <Header fluxo="" headerPsicologo={true} />
      <div className="container-gerenciamento">
        {!hasConfig ? (
          <div className="sem-config">
            <h1>Nenhum horário configurado ainda</h1>
            <h2>Clique para configurar agora</h2>
            <button onClick={() => setOpenModal(true)}>Configurar</button>
          </div>
        ) : (
          <TabelaHorarios
            dias={diasSelecionados}
            inicio={horaInicio}
            fim={horaFim}
            duracao={tempoSessao}
            intervalo={intervaloSessao}
            onEditar={() => setOpenModal(true)}
            horarios={horarios}
            onSalvar={salvarHorariosSelecionados}
          />
        )}
      </div>

      {openModal && (
        <ConfiguracaoHorario
          onClose={() => setOpenModal(false)}
          onSave={(dias, tempo, intervalo, inicio, fim) => {
            const diasOrdenados = [...dias].sort(
              (a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b)
            );
            setDiasSelecionados(diasOrdenados);
            setTempoSessao(tempo);
            setIntervaloSessao(intervalo);
            setHoraInicio(inicio);
            setHoraFim(fim);
            setHasConfig(true);
            setOpenModal(false);
          }}
          dias={diasSelecionados}
          tempo={tempoSessao}
          intervalo={intervaloSessao}
          inicio={horaInicio}
          fim={horaFim}
        />
      )}
    </>
  );
}