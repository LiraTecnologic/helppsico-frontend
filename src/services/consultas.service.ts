import axios from "axios";
import ConsultaModel from "../models/consulta";
import Page from "../models/page";

export function consultaSessoesFuturas(
  idPsicologo: string,
  page: number
): Promise<Page<ConsultaModel>> {
  return axios
    .get<Page<ConsultaModel>>(
      `http://localhost:8080/consultas/futuras/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
    .then((response) => response.data)
    .catch((err) => {
      console.error("Erro ao carregar consultas:", err);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 0,
      };
    });
}