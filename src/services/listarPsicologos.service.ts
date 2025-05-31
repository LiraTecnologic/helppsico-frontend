import axios from 'axios';
import PsicologoModel from '../models/psicologo';
import Page from '../models/page';
import Response from '../models/response';

export function listarPsicologos(): Promise<Response<Page<PsicologoModel>>> {
    return axios.get<Response<Page<PsicologoModel>>>(
        'http://localhost:8080/psicologos'
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar psicologos:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: err
            };
        });
}