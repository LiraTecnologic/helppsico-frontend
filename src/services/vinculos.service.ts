import axios from 'axios';
import VinculoModel from '../models/vinculo';
import Page from '../models/page'
import Response from '../models/response';

export function consultaVinculosPsicologo(idPsicologo: string, page: number): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response<Page<VinculoModel>>>(
        `http://localhost:8080/vinculos/psicologo/${idPsicologo}?page=${page}&size=${15}`
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
        `http://localhost:8081/vinculos/listar/paciente/${idPaciente}?page=${page}&size=${15}`
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