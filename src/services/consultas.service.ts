import axios from 'axios';
import ConsultaModel from '../models/consulta';
import Page from '../models/page'
import Response from '../models/response';

export function consultaSessoesFuturasPsicologo(idPsicologo: string, page: number): Promise<Page<ConsultaModel>> {
    return axios.get<Page<ConsultaModel>>(
        `http://localhost:8080/consultas/futuras/psicologo/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                number: 0,
                size: 0
            };
        });
}

export function consultaSessoesFuturasPaciente(idPaciente: string, page: number): Promise<Page<ConsultaModel>> {
    return axios.get<Page<ConsultaModel>>(
        `http://localhost:8080/consultas/futuras/paciente/${idPaciente}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                number: 0,
                size: 0
            };
        });
}

export function consultarSessoesAntigasPaciente(idPaciente: string, page: number): Promise<Page<ConsultaModel>> {
    return axios.get<Page<ConsultaModel>>(
        `http://localhost:8080/consultas/antigas/paciente/${idPaciente}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                number: 0,
                size: 0
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