import axios from "axios";

export async function aceitarSolicitacao(vinculoId: string) {
    try {
        const response = await axios.put(`http://localhost:8080/vinculos/aceitar/${vinculoId}`);

        if (response.status !== 200) {
            throw new Error(`Erro ao aceitar solicitação: ${response.status},\n\n aceitação falhou :(  response:  ${response.data}`);
        }

        return response.data;

    } catch (error) {
        console.error("Erro ao aceitar solicitação:", error);
        throw error;
    }
}

export async function recusarSolicitacao(vinculoId: string) {
    try {
        const response = await axios.put(`http://localhost:8080/vinculos/recusar/${vinculoId}`);

        if (response.status !== 200) {
            throw new Error(`Erro ao recusar solicitação: ${response.status},\n\n recusa falhou :(  response:  ${response.data}`);
        }

        return response.data;

    } catch (error) {
        console.error("Erro ao recusar solicitação:", error);
        throw error;
    }
}