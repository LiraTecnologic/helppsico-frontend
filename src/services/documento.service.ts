import axios from "axios";
import DadosGeraisDocumentoModel from "../models/dadosGeraisDocumento";
import Response from '../models/response';

const URL_API = "http://localhost:8080/documentos";

export function cadastrarDocumento(novoDocumento: DadosGeraisDocumentoModel, idSolicitacao: string): Promise<Response<DadosGeraisDocumentoModel>>{
    return axios.post<Response<DadosGeraisDocumentoModel>>(
        `${URL_API}/${idSolicitacao}`,
        novoDocumento
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao salvar documento:", err);
        return {
            dado: {} as DadosGeraisDocumentoModel,
            erro: ""
        };
    });
}