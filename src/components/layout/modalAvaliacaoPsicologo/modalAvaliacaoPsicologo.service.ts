import { AvaliacaoModel } from "../../../models/avaliacoes";
import axios from 'axios';
import Response from '../../../models/response';

export function cadastrarAvaliacao(novaAvaliacao: AvaliacaoModel): Promise<Response<AvaliacaoModel>>{
    return axios.post<Response<AvaliacaoModel>>(
        'http://localhost:8080/avaliacoes',
        novaAvaliacao
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao cadastrar avaliação:", err);
        return {
            dado: {} as AvaliacaoModel,
            erro: err
        };
    });
}