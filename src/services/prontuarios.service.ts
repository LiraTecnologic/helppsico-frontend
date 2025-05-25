import axios from "axios";
import ProntuarioModel from "../models/prontuario";
import Page from "../models/page";

export function consultaProntuariosPsicologo(
  idPsicologo: string,
  page: number
): Promise<Page<ProntuarioModel>> {
  return axios
    .get<Page<ProntuarioModel>>(
      `http://localhost:8080/prontuarios/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
    .then((response) => response.data)
    .catch((err) => {
      console.error("Erro ao carregar prontuarios:", err);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 0,
      };
    });
}