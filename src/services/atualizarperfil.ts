import axios from 'axios';
import PsicologoModel from '../models/psicologo';
import Response from '../models/response';

export function atualizarPerfilPsicologo(idPsicologo: string, dadosAtualizados: PsicologoModel): Promise<Response<PsicologoModel>> {
    return axios.put<Response<PsicologoModel>>(
        `http://localhost:8080/psicologos/${idPsicologo}`,
        dadosAtualizados
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao atualizar o perfil do Psicólogo:", err);
        return {
            dado: null,
            erro: err
        };
    });
}