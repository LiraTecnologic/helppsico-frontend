import axios from "axios";
import { HorarioModel } from "../models/horario";
import Response from "../models/response";

interface HorarioParaSalvar {
  diaSemana: string;
  inicio: string;
  fim: string;
  disponivel: boolean;
  psicologo: { id: string };
}

export function salvarHorario(horario: HorarioParaSalvar): Promise<Response<HorarioModel>> {
  return axios.post<Response<HorarioModel>>("http://localhost:8080/horarios", horario)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao salvar horário:", error);
      return {
        dado: null,
        erro: error
      };
    });
}

export function buscarHorarios(): Promise<Response<HorarioModel[]>> {
  return axios.get<Response<HorarioModel[]>>("http://localhost:8080/horarios")
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao buscar horários:", error);
      return {
        dado: [],
        erro: error
      };
    });
}
