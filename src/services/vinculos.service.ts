import axios from 'axios';
import VinculoModel from '../models/vinculo';
import Page from '../models/page'
import Response from '../models/response';

export function consultaVinculosPsicologo(idPsicologo: string, page: number): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response<Page<VinculoModel>>>(
        `http://localhost:8080/vinculos/listar/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar vínculos:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: "Erro"
            };
        });
}

export function consultarVinculosPaciente(idPaciente: string, page: number): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response<Page<VinculoModel>>>(
        `http://localhost:8080/vinculos/listar/paciente/${idPaciente}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar vínculos:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: "Erro"
            };
        });
}

export function deleteVinculo(idVinculo: string): Promise<void> {
    return axios.delete(`http://localhost:8080/vinculos/${idVinculo}`)
        .then(() => {
            console.log("Vínculo deletado com sucesso.");
        })
        .catch(err => {
            console.error("Erro ao deletar vínculo:", err);
            throw err;
        });
}

export function criarVinculo(dados: { psicologo: { id: string }, paciente: { id: string }, status: string }): Promise<VinculoModel> {
    return axios.post<VinculoModel>('http://localhost:8080/vinculos', dados)
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao criar vínculo:", err);
            throw err;
        });
}