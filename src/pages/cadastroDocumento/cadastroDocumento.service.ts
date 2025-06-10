import axios from 'axios';
import PsicologoModel from '../../models/psicologo';
import Response from '../../models/response';

export function consultarPsicologoPeloId(idPsicologo: string): Promise<Response<PsicologoModel>> {
    return axios.get<Response<PsicologoModel>>(
        `http://localhost:8080/psicologos/${idPsicologo}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);

            return {
                dado: {} as PsicologoModel,
                erro: err
            }
        });
}