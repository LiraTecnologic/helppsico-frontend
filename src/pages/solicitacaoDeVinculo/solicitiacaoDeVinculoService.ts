import VinculoModel from "../../models/vinculo";
import StatusVinculo from "../../models/vinculo";



export async function solicitarVinculosPaciente(id: string) : Promise<VinculoModel[]>  {

    try {
        
    const response = await fetch(`localhost:8080/vinculos/paciente/${id}`,{
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "application": "application/json"
        }
    } );

    if (!response.ok) {
        throw new Error(`Erro na  fetch :) ${response.status}`);
    }

    const data = await response.json();

    return data.map((vinculo: any ) => {
        return{
            id: vinculo.id,
            paciente: vinculo.paciente,
            psicologo: vinculo.psicologo,
            status: vinculo.status as StatusVinculo,
        }
        
    });
    
    

    }catch(e) {
        throw new Error(`sla deu erro `)
    }

}


export async function cancelarSolicitacao(vinculoId: string): Promise<boolean> {
    try {
      const response = await fetch(`localhost:7000/vinculos/${vinculoId}/cancelar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        
        }
      });
  
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new Error(`Erro ao cancelar solicitação: ${response.status},\n\n cancelamento falhou :(  response:  ${ErrorData} `);
      }
  
      return true;

    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      throw error;
    }
  }