import axios from "axios";
import HorarioModel from "../models/horario";

interface HorarioParaSalvar {
  diaSemana: string;
  inicio: string;
  fim: string;
  disponivel: boolean;
  psicologo: { id: string };
}

export async function salvarHorario(horario: HorarioParaSalvar): Promise<HorarioModel> {
  try {
    const response = await axios.post<HorarioModel>("http://localhost:8080/horarios", horario);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar horário:", error);
    throw error;
  }
}

export async function buscarHorarios(): Promise<HorarioModel[]> {
  try {
    const response = await axios.get<HorarioModel[]>("http://localhost:8080/horarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    throw error;
  }
}