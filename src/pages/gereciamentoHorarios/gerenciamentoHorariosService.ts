import axios from "axios";
import HorarioModel from "../../models/horario";

export async function buscarHorarios(): Promise<HorarioModel[]> {
  const response = await axios.get<HorarioModel[]>("/consulta");
  return response.data;
}

export async function salvarHorarios(horarios: HorarioModel[]): Promise<void> {
  await axios.post("/consulta", horarios);
}
