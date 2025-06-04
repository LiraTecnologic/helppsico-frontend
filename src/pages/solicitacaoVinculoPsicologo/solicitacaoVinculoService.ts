import VinculoModel, { StatusVinculo } from "../../models/vinculo";
import axios from "axios";

export async function solicitarVinculosPsicologo(id: string): Promise<VinculoModel[]> {
    try {
        const response = await axios.get(`http://localhost:7000/vinculos?psicologoId=${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Erro na fetch: ${response.status}`);
        }

        const vinculos = response.data;
        
        const vinculosComDados = await Promise.all(
            vinculos.map(async (vinculo: any) => {
                const [pacienteResponse, psicologoResponse] = await Promise.all([
                    axios.get(`http://localhost:7000/pacientes/${vinculo.pacienteId}`),
                    axios.get(`http://localhost:7000/psicologos/${vinculo.psicologoId}`)
                ]);
                
                return {
                    ...vinculo,
                    paciente: pacienteResponse.data,
                    psicologo: psicologoResponse.data
                };
            })
        );

        return vinculosComDados as VinculoModel[];

    } catch (e) {
        console.error("Erro detalhado:", e);
        throw new Error(`Erro ao buscar vínculos: ${e}`);
    }
}

export async function aceitarSolicitacao(vinculoId: string): Promise<boolean> {
    try {
        const response = await axios.patch(`http://localhost:7000/vinculos/${vinculoId}`, 
            { status: StatusVinculo.ATIVO },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`Erro ao aceitar solicitação: ${response.status},\n\n aceitação falhou :(  response:  ${response.data}`);
        }

        return true;

    } catch (error) {
        console.error("Erro ao aceitar solicitação:", error);
        throw error;
    }
}

export async function recusarSolicitacao(vinculoId: string): Promise<boolean> {
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
            throw new Error(`Erro ao recusar solicitação: ${response.status},\n\n recusa falhou :(  response:  ${response.data}`);
        }

        return true;

    } catch (error) {
        console.error("Erro ao recusar solicitação:", error);
        throw error;
    }
}