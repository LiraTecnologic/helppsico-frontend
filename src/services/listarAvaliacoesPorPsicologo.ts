import axios from 'axios';
import { AvaliacaoModel } from '../models/avaliacoes';

export async function listarAvaliacoesPorPsicologo(idPsicologo: string): Promise<AvaliacaoModel[]> {
    return axios.get<AvaliacaoModel[]>(
        `http://localhost:8080/avaliacoes`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar avaliações:", err);
            return [] as AvaliacaoModel[];
        });
}
