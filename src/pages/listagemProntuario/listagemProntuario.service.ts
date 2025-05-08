import axios from 'axios';
import ProntuarioDto from './prontuario'

export function consultaProntuarios(): Promise<ProntuarioDto> {
    return axios.get("http://localhost:8080/prontuarios")
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar empresas:", err);
            return []; 
        });
}