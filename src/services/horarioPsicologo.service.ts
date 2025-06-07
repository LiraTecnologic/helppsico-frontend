import axios from 'axios';
import Response from '../models/response';
import { HorarioModel } from '../models/horario';

export function listarHorariosPsicologo(idPsicologo: string): Promise<Response<HorarioModel[]>> {
    return axios.get<Response<HorarioModel[]>>(
        `http://localhost:8080/horarios/psicologo/${idPsicologo}`
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