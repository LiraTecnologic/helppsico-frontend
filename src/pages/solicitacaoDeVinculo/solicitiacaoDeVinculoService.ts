import Page from "../../models/page";
import Response from "../../models/response";
import VinculoModel  from "../../models/vinculo";
import  {StatusVinculo} from "../../models/vinculo";
import axios from "axios";

export function solicitarVinculosPaciente(idPaciente: string, page: number): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response<Page<VinculoModel>>>(
      `http://localhost:8080/vinculos/listar/paciente/${idPaciente}?page=${page}&size=15`
    )
    .then(response => response.data)
    .catch(err => {
      console.error("Erro ao carregar consultas:", err);
          return {
              dado: {
                  content: [],
                  totalElements: 0,
                  totalPages: 0,
                  number: 0,
                  size: 0
              },
              erro: err
          };
    })
}

export async function cancelarSolicitacao(vinculoId: string): Promise<boolean> {
    try {
      const response = await axios.delete(`http://localhost:8080/vinculos/${vinculoId}`);
  
      if (response.status !== 200) {
        throw new Error(`Erro ao cancelar solicitação: ${response.status},\n\n cancelamento falhou :(  response:  ${response.data}`);
      }
  
      return true;

    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      throw error;
    }
  }