import axios from "axios";

export enum TipoDocumento {
  ATESTADO = 'ATESTADO',
  DECLARACAO = 'DECLARACAO', 
  RELATORIO_PSICOLOGICO = 'RELATORIO_PSICOLOGICO',
  RELATORIO_MULTIPROFISSIONAL = 'RELATORIO_MULTIPROFISSIONAL',
  LAUDO_PSICOLOGICO = 'LAUDO_PSICOLOGICO',
  PARECER_PSICOLOGICO = 'PARECER_PSICOLOGICO'
}

export async function criarSolicitacaoDocumento(
    pacienteId: string, 
    psicologoId: string, 
    tipoDocumento: TipoDocumento
) {
    try {
        const novasolicitacao = {
            paciente: {
                id: pacienteId
            },
            psicologo: {
                id: psicologoId
            },
            tipoDocumento: tipoDocumento,
        };

        const response = await axios.post(`http://localhost:8080/solicitacoes-documentos`, novasolicitacao, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 201) {
            throw new Error(`Erro ao criar solicitação: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao criar solicitação de documento:", error);
        throw new Error(`Erro ao criar solicitação de documento: ${error}`);
    }
}