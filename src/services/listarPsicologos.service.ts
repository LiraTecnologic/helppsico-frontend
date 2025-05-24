import axios from 'axios';
import PsicologoModel from '../models/psicologo';

export function listarPsicologos(): Promise<PsicologoModel[]> {
    return axios.get<PsicologoModel[]>(
        'http://localhost:8080/psicologos'
    )
    .then(response => response.data)
    .catch(err => {
        console.error("Erro ao carregar psicólogos:", err);
        return [];
    });
}