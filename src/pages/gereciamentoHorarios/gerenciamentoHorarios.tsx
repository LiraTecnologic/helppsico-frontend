import "./gerenciamentoHorarios.css";
import Header from "../../components/layout/header/header";
import { useEffect, useState } from "react";
import ConfiguracaoHorario from "../../components/layout/configurarHorario/configurarHorario";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";
<<<<<<< HEAD
import { salvarHorario, listarHorariosPsicologo, deletarHorario } from "../../services/horarios.service";
=======
import { apresentarErro, notificarSucesso } from "../../utils/notificacoes";
import { salvarHorario, listarHorariosPsicologo } from "../../services/horarios.service";
>>>>>>> feature/#FTR85
import { HorarioModel } from "../../models/horario";
import PsicologoModel from "../../models/psicologo";
import EnderecoModel from "../../models/endereco";

export default function GerenciamentoDeHorarios() {
  const [hasConfig, setHasConfig] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("18:00");
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

  function converterDiaAbreviadoCompleto(diaAbreviado: string): string {
    const conversao: Record<string, string> = {
      "SEG": "SEGUNDA_FEIRA",
      "TER": "TERCA_FEIRA",
      "QUA": "QUARTA_FEIRA", 
      "QUI": "QUINTA_FEIRA",
      "SEX": "SEXTA_FEIRA",
      "SAB": "SABADO",
      "DOM": "DOMINGO",
    };
    return conversao[diaAbreviado] || diaAbreviado;
  }

  function extrairConfiguracoesDosHorarios(horarios: HorarioModel[]) {
    if (horarios.length === 0) {
      return {
        diasSelecionados: [],
        horaInicio: "08:00",
        horaFim: "18:00",
        tempoSessao: 50,
        intervaloSessao: 10
      };
    }

    const diasUnicos = [...new Set(horarios.map((h: HorarioModel) => h.diaSemana))];
    const ordemDias = ["SEGUNDA_FEIRA", "TERCA_FEIRA", "QUARTA_FEIRA", "QUINTA_FEIRA", "SEXTA_FEIRA", "SABADO", "DOMINGO"];
    const diasOrdenados = diasUnicos.sort((a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b));
    const diasReduzidos = diasOrdenados.map(dia => {
      const conversao: Record<string, string> = {
        "SEGUNDA_FEIRA": "SEG",
        "TERCA_FEIRA": "TER",
        "QUARTA_FEIRA": "QUA",
        "QUINTA_FEIRA": "QUI",
        "SEXTA_FEIRA": "SEX",
        "SABADO": "SAB",
        "DOMINGO": "DOM",
      };
      return conversao[dia] || dia.substring(0, 3).toUpperCase();
    });

    const horariosInicio = horarios.map(h => h.inicio.substring(0, 5)); 
    const horaInicioMaisCedo = horariosInicio.reduce((menor, atual) => {
      return atual < menor ? atual : menor;
    });

    const horariosFim = horarios.map(h => h.fim.substring(0, 5));
    const horaFimMaisTarde = horariosFim.reduce((maior, atual) => {
      return atual > maior ? atual : maior;
    });

    const tempoSessao = horarios[0].duracao || 50;
    const intervaloSessao = horarios[0].intervalo || 10;

    return {
      diasSelecionados: diasReduzidos,
      horaInicio: horaInicioMaisCedo,
      horaFim: horaFimMaisTarde,
      tempoSessao,
      intervaloSessao
    };
  }

  useEffect(() => {
    async function carregarHorarios() {
      try {
        const response = await listarHorariosPsicologo(idPsicologo);

        if (response.dado) {
          const data = response.dado;
          
          if (data.length === 0) {
            setHasConfig(false);
          } else {
            setHasConfig(true);
            setHorarios(data);

            const configuracoes = extrairConfiguracoesDosHorarios(data);
            
            setDiasSelecionados(configuracoes.diasSelecionados);
            setHoraInicio(configuracoes.horaInicio);
            setHoraFim(configuracoes.horaFim);
            setTempoSessao(configuracoes.tempoSessao);
            setIntervaloSessao(configuracoes.intervaloSessao);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar horários:", err);
      }
    }

    carregarHorarios();
  }, []);

  async function salvarHorariosSelecionados(horariosParaSalvar: string[]) {
    if (horariosParaSalvar.length === 0) {
      apresentarErro("Nenhum horário foi selecionado para salvar.");
      return;
    }

    const horariosASalvar = [];

    try {
      for (const id of horariosParaSalvar) {
        const [diaSemana, faixa] = id.split("-");
        if (!faixa) continue;
        
        const [inicio] = faixa.trim().split(" - ");

        horariosASalvar.push({
          diaSemana: converterDiaAbreviadoCompleto(diaSemana),
          inicio: inicio + ":00",
          fim: calcularFim(inicio, tempoSessao) + ":00",
          disponivel: true,
        });
      }
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
        };

        const novoHorario: HorarioModel = {
          id: '',
          psicologo: psicologo,
          diaSemana: horario.diaSemana,
          inicio: horario.inicio,
          fim: horario.fim,
          intervalo: intervaloSessao,
          duracao: tempoSessao,
          disponivel: horario.disponivel
        };

        await salvarHorario(novoHorario);
      }
      
      notificarSucesso(`${horariosASalvar.length} horário(s) salvo(s)`);
      
      const data = await listarHorariosPsicologo(idPsicologo);
      if (data.dado) {
        setHorarios(data.dado);
      }
    } catch (error) {
      apresentarErro("Erro ao salvar horários.");
      console.error(error);
    }
  }

  function deletarHorariosSelecionados(horariosParaDeletar: string[]) {
    if (horariosParaDeletar.length === 0) {
      alert("Nenhum horário foi selecionado para salvar.");
      return;
    }

    horariosParaDeletar.forEach( async (horario) => {
      await deletarHorario(horario);
    })

  }

  const handleSaveConfig = (dias: string[], tempo: number, intervalo: number, inicio: string, fim: string) => {
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
  };

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
            onDeletar={deletarHorariosSelecionados}
          />
        )}
      </div>

      {openModal && (
        <ConfiguracaoHorario
          onClose={() => setOpenModal(false)}
          onSave={handleSaveConfig}
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