import { VinculoModel } from "../../models/vinculo";
import  {StatusVinculo} from "../../models/vinculo";
import axios from "axios";

export async function solicitarVinculosPaciente(id: string): Promise<VinculoModel[]> {
    try {
        const response = await axios.get(`http://localhost:7000/vinculos?pacienteId=${id}&_expand=psicologo&_expand=paciente`, {
            headers: {
                "Content-Type": "application/json",
                "application": "application/json"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Erro na fetch :) ${response.status}`);
        }

        const data = response.data;
        return data as VinculoModel[];

    } catch (e) {
        throw new Error(`sla deu erro ${e}`);
    }
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