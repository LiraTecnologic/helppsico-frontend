import axios from 'axios';
import VinculoModel from '../models/vinculo';
import Page from '../models/page'

export function consultaVinculosPsicologo(idPsicologo: string, page: number): Promise<Page<VinculoModel>> {
    return axios.get<Page<VinculoModel>>(
        `http://localhost:8080/vinculos/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao carregar vínculos:", err);
        return {
            content: [],
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 0
        };
    });
}