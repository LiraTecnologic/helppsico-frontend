import axios from 'axios';
import { AvaliacaoModel } from '../models/avaliacoes';
import Response from '../models/response';
import Page from '../models/page';

export async function listarAvaliacoesPorPsicologo(idPsicologo: string, page: number): Promise<Response<Page<AvaliacaoModel>>> {
    return await axios.get<Response<Page<AvaliacaoModel>>>(
        `http://localhost:8080/avaliacoes/psicologo/${idPsicologo}?page=${page}&size=15`
    )
        .then(response => response.data)
        .catch(err => {
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: err
            }
        });
}
 