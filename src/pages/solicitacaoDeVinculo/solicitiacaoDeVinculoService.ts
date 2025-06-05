import Page from "../../models/page";
import Response from "../../models/response";
import VinculoModel  from "../../models/vinculo";
import  {StatusVinculo} from "../../models/vinculo";
import axios from "axios";

export function solicitarVinculosPaciente(idPaciente: string, page: number): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response>
}

export function consultaSessoesFuturasPsicologo(idPsicologo: string, page: number): Promise<Page<ConsultaModel>> {
  return axios.get<Page<ConsultaModel>>(
      `http://localhost:8080/consultas/futuras/psicologo/${idPsicologo}?page=${page}&size=${15}`
  )
      .then(response => response.data)
      .catch(err => {
          console.error("Erro ao carregar consultas:", err);
          return {
              content: [],
              totalElements: 0,
              totalPages: 0,
              number: 0,
              size: 0
          };
      });
}

export async function cancelarSolicitacao(vinculoId: string): Promise<boolean> {
    try {
      const response = await axios.patch(`http://localhost:7000/vinculos/${vinculoId}`, 
        { status: StatusVinculo.INATIVO },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
  
      if (response.status !== 200) {
        throw new Error(`Erro ao cancelar solicitação: ${response.status},\n\n cancelamento falhou :(  response:  ${response.data}`);
      }
  
      return true;

    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      throw error;
    }
  }