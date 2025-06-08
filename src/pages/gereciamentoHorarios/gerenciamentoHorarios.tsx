import "./gerenciamentoHorarios.css";
import Header from "../../components/layout/header/header";
import { useEffect, useState } from "react";
import ConfiguracaoHorario from "../../components/layout/configurarHorario/configurarHorario";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";
import { salvarHorario, listarHorariosPsicologo, deletarHorario } from "../../services/horarios.service";
import { HorarioModel } from "../../models/horario";
import PsicologoModel from "../../models/psicologo";
import EnderecoModel from "../../models/endereco";

interface ConfiguracaoHorarios {
  diasSelecionados: string[];
  tempoSessao: number;
  intervaloSessao: number;
  horaInicio: string;
  horaFim: string;
}

export default function GerenciamentoDeHorarios() {
  const [hasConfig, setHasConfig] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [horarios, setHorarios] = useState<HorarioModel[]>([]);
  const [configuracao, setConfiguracao] = useState<ConfiguracaoHorarios>({
    diasSelecionados: [],
    tempoSessao: 50,
    intervaloSessao: 10,
    horaInicio: "08:00",
    horaFim: "18:00"
  });

  const idPsicologo: string = "9e239ace-09aa-465b-b801-dd96535332a9";

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

  function carregarConfiguracoes() {
    const storedData = localStorage.getItem("infoConfigHorarios");
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Configuração carregada do localStorage:", parsedData);
        
        const config: ConfiguracaoHorarios = {
          diasSelecionados: Array.isArray(parsedData.diasSelecionados) ? parsedData.diasSelecionados : [],
          tempoSessao: Number(parsedData.tempoSessao) || 50,
          intervaloSessao: Number(parsedData.intervaloSessao) || 10,
          horaInicio: parsedData.horaInicio || "08:00",
          horaFim: parsedData.horaFim || "18:00"
        };
        
        setConfiguracao(config);
        return config;
      } catch (error) {
        console.error("Erro ao carregar configuração do localStorage:", error);
      }
    }
    
    return null;
  }

  function extrairConfiguracoesDosHorarios(horarios: HorarioModel[]): ConfiguracaoHorarios {
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
        const configLocalStorage = carregarConfiguracoes();
        const response = await listarHorariosPsicologo(idPsicologo);

        if (response.dado) {
          const data = response.dado;
          
          if (data.length === 0) {
            setHasConfig(false);
            if (!configLocalStorage) {
              setHasConfig(false);
            }
          } else {
            setHasConfig(true);
            setHorarios(data);

            if (!configLocalStorage) {
              const configuracoes = extrairConfiguracoesDosHorarios(data);
              setConfiguracao(configuracoes);

              localStorage.setItem("infoConfigHorarios", JSON.stringify(configuracoes));
            }
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
      alert("Nenhum horário foi selecionado para salvar.");
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
          fim: calcularFim(inicio, configuracao.tempoSessao) + ":00",
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
          intervalo: configuracao.intervaloSessao,
          duracao: configuracao.tempoSessao,
          disponivel: horario.disponivel
        };

        await salvarHorario(novoHorario);
      }
      
      alert(`${horariosASalvar.length} horário(s) salvo(s) com sucesso!`);
      
      const data = await listarHorariosPsicologo(idPsicologo);
      if (data.dado) {
        setHorarios(data.dado);
      }
    } catch (error) {
      alert("Erro ao salvar horários.");
      console.error(error);
    }
  }

  async function deletarHorariosSelecionados(horariosParaDeletar: string[]) {
    if (horariosParaDeletar.length === 0) {
      alert("Nenhum horário foi selecionado para deletar.");
      return;
    }

    try {
      for (const horarioId of horariosParaDeletar) {
        await deletarHorario(horarioId);
      }
      
      alert(`${horariosParaDeletar.length} horário(s) deletado(s) com sucesso!`);
      
      const data = await listarHorariosPsicologo(idPsicologo);
      if (data.dado) {
        setHorarios(data.dado);
      }
    } catch (error) {
      alert("Erro ao deletar horários.");
      console.error(error);
    }
  }

  const handleSaveConfig = (dias: string[], tempo: number, intervalo: number, inicio: string, fim: string) => {
    const diasOrdenados = [...dias].sort(
      (a, b) => ordemDias.indexOf(a) - ordemDias.indexOf(b)
    );
    
    const novaConfiguracao: ConfiguracaoHorarios = {
      diasSelecionados: diasOrdenados,
      tempoSessao: tempo,
      intervaloSessao: intervalo,
      horaInicio: inicio,
      horaFim: fim
    };

    setConfiguracao(novaConfiguracao);
    setHasConfig(true);
    setOpenModal(false);

    localStorage.setItem("infoConfigHorarios", JSON.stringify(novaConfiguracao));
    
    console.log("Nova configuração salva:", novaConfiguracao);
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
            dias={configuracao.diasSelecionados}
            inicio={configuracao.horaInicio}
            fim={configuracao.horaFim}
            duracao={configuracao.tempoSessao}
            intervalo={configuracao.intervaloSessao}
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
          dias={configuracao.diasSelecionados}
          tempo={configuracao.tempoSessao}
          intervalo={configuracao.intervaloSessao}
          inicio={configuracao.horaInicio}
          fim={configuracao.horaFim}
        />
      )}
    </>
  );
}