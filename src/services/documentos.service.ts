import axios from 'axios';
import Page from '../models/page'
import Response from '../models/response';
import DocumentoModel from '../models/documento/documento';

export function consultarDocumentosPaciente(idPaciente: string, page: number): Promise<Response<Page<DocumentoModel>>> {
    return axios.get<Response<Page<DocumentoModel>>>(
        `http://localhost:8080/vinculos/psicologo/${idPaciente}?page=${page}&size=${15}`
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
                erro: err
            };
        });
}