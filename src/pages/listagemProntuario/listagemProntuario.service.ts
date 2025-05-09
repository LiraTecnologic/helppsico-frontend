import axios from 'axios';
import ProntuarioModel from '../../models/prontuario';

export function consultaProntuarios(): Promise<ProntuarioModel[]> {
    return axios.get<ProntuarioModel[]>("http://localhost:8080/prontuarios")
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}