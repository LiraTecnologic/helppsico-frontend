import axios from 'axios';
import Page from '../models/page'
import Response from '../models/response';
import { HorarioModel } from '../models/horario';

export function listarHorariosPsicologo(idPsicologo: string, page: number): Promise<Response<Page<HorarioModel>>> {
    return axios.get<Response<Page<HorarioModel>>>(
        `http://localhost:8080/horarios-psicologos/psicologo/${idPsicologo}?page=${page}&size=${15}`
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