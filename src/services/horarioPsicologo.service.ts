import axios from 'axios';
import Page from '../models/page'
import Response from '../models/response';
import { HorarioModel } from '../models/horario';

export function listarHorariosPsicologo(idPsicologo: string, page: number): Promise<Response<HorarioModel[]>> {
    return axios.get<Response<HorarioModel[]>>(
        `http://localhost:8080/horarios/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar horários:", err);
            return {
                dado: [],
                erro: err
            };
        });
}