import axios from "axios";

export function finalizarConsulta(id: string) {
    return axios.patch(
        `http://localhost:8080/consultas/finalizar/${id}`
    )
        .catch(err => {
            console.error("Erro ao carregar vínculos:", err);
        });
}