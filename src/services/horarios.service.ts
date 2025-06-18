import axios from "axios";
import { HorarioModel } from "../models/horario";
import Response from "../models/response";

export function salvarHorario(horario: HorarioModel): Promise<Response<HorarioModel>> {
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

export function listarHorariosPsicologo(idPsicologo: string): Promise<Response<HorarioModel[]>> {
  return axios.get<Response<HorarioModel[]>>(
    `http://localhost:8080/horarios/psicologo/${idPsicologo}`
  )
    .then(response => response.data)
    .catch(err => {
      console.error("Erro ao carregar horários:", err);
      return {
        dado: [],
        erro: err
      };
    });
}

export function deletarHorario(idHorario: string) {
  console.log(idHorario);

  axios.delete(`http://localhost:8080/horarios/${idHorario}`)
  .then(response => response.data)
  .catch(err => {
    console.error("Erro ao carregar horários:", err);
  });
}
