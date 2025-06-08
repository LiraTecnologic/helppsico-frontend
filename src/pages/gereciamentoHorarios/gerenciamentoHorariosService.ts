import axios from "axios";
import { HorarioModel } from "../../models/horario";
import Response from "../../models/response";

export async function buscarHorarios(): Promise<Response<HorarioModel[]>> {
  const response = await axios.get<Response<HorarioModel[]>>("/consulta");
  return response.data;
}

export async function salvarHorarios(horarios: HorarioModel[]): Promise<void> {
  await axios.post("/consulta", horarios);
}
