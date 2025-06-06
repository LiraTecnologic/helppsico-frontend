import axios from 'axios';
import ConsultaModel from '../models/consulta';
import Page from '../models/page'
import Response from '../models/response';

export function consultaSessoesFuturasPsicologo(idPsicologo: string, page: number): Promise<Response<Page<ConsultaModel>>> {
    return axios.get<Response<Page<ConsultaModel>>>(
        `http://localhost:8080/consultas/futuras/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
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

export function consultaSessoesFuturasPaciente(idPaciente: string, page: number): Promise<Response<Page<ConsultaModel>>> {
    return axios.get<Response<Page<ConsultaModel>>>(
        `http://localhost:8081/consultas/paciente/futuras/${idPaciente}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
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

export function consultarSessoesAntigasPaciente(idPaciente: string, page: number): Promise<Response<Page<ConsultaModel>>> {
    return axios.get<Response<Page<ConsultaModel>>>(
        `http://localhost:8080/consultas/paciente/historico/${idPaciente}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
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

export function consultarSessoesAntigasPsicologo(idPsicologo: string, page: number): Promise<Response<Page<ConsultaModel>>> {
    return axios.get<Response<Page<ConsultaModel>>>(
        `http://localhost:8080/consultas/antigas/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: "Erro ao buscar dados"
            };
        });
}