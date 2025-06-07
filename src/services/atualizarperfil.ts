import axios from 'axios';
import PsicologoModel from '../models/psicologo';


export function atualizarPerfilPsicologo(idPsicologo: string, dadosAtualizados: Partial<PsicologoModel>): Promise<PsicologoModel> {
    return axios.put<PsicologoModel>(
        `http://localhost:8080/psicologo/${idPsicologo}`,
        dadosAtualizados
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao atualizar o perfil do Psicólogo", err);
        throw err;
    });
}


