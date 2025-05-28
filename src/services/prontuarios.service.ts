import axios from 'axios';
import ProntuarioModel from '../models/prontuario';
import Page from '../models/page'
import Response from '../models/response';

export function consultaProntuariosPsicologo(idPsicologo: string, page: number): Promise<Page<ProntuarioModel>> {
    return axios.get<Page<ProntuarioModel>>(
        `http://localhost:8080/prontuarios/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar prontuarios:", err);
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                number: 0,
                size: 0
            };
        });
}

export function consultarProntuarioPorId(idProntuario: string): Promise<Response<ProntuarioModel>> {
    return axios.get<Response<ProntuarioModel>>(
        `http://localhost:8081/prontuarios/${idProntuario}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar prontuarios:", err);
            return {
                dado: {} as ProntuarioModel,
                erro: err
            };
        });
}

export function editarProntuario(idPsicologo: string, dados: ProntuarioModel): Promise<Response<ProntuarioModel>> {
    return axios.put<Response<ProntuarioModel>>(`http://localhost:8081/prontuarios/${idPsicologo}`, dados)
      .then(response => response.data)
      .catch(error => {
        console.error('Erro na requisição:', error);
        return {
            dado: {}  as ProntuarioModel,
            erro: error
        };
    });
}

export function cadastar(novoProntuario:ProntuarioModel): Promise<Response<ProntuarioModel>> {
    return axios.post<Response<ProntuarioModel>>(
        'http://localhost:8080/prontuarios',
        novoProntuario
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao carregar prontuarios:", err);
        return {
            dado: {} as ProntuarioModel,
            erro: ""
        };
    });
}
