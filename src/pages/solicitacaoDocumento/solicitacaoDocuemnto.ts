import SolicitacaoDocumentoModel from "../../models/solicitacaoDocumento";
import PsicologoModel from "../../models/psicologo";
import { StatusVinculo } from "../../models/vinculo";
import axios from "axios";

export enum TipoDocumento {
  ATESTADO = 'ATESTADO',
  DECLARACAO = 'DECLARACAO', 
  RELATORIO_PSICOLOGICO = 'RELATORIO_PSICOLOGICO',
  RELATORIO_MULTIPROFISSIONAL = 'RELATORIO_MULTIPROFISSIONAL',
  LAUDO_PSICOLOGICO = 'LAUDO_PSICOLOGICO',
  PARECER_PSICOLOGICO = 'PARECER_PSICOLOGICO'
}

export async function buscarPsicologoVinculado(pacienteId: string): Promise<PsicologoModel | null> {
    try {
        const response = await axios.get(`http://localhost:7000/vinculos?pacienteId=${pacienteId}&status=${StatusVinculo.ATIVO}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Erro na busca de vínculos: ${response.status}`);
        }

        const vinculos = response.data;
        
        if (vinculos.length === 0) {
            return null;
        }

        const vinculo = vinculos[0];
 
        const psicologoResponse = await axios.get(`http://localhost:7000/psicologos/${vinculo.psicologoId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (psicologoResponse.status !== 200) {
            throw new Error(`Erro ao buscar dados do psicólogo: ${psicologoResponse.status}`);
        }

        return psicologoResponse.data as PsicologoModel;

    } catch (error) {
        console.error("Erro ao buscar psicólogo vinculado:", error);
        throw new Error(`Erro ao buscar psicólogo vinculado: ${error}`);
    }
}

export async function criarSolicitacaoDocumento(
    pacienteId: string, 
    psicologoId: string, 
    tipoDocumento: TipoDocumento
): Promise<SolicitacaoDocumentoModel> {
    try {
        const novasolicitacao = {
            pacienteId: pacienteId,
            psicologoId: psicologoId,
            tipoDocumento: tipoDocumento,
            data: new Date().toISOString(),
            status: "PENDENTE"
        };

        const response = await axios.post(`http://localhost:7000/solicitacoes-documento`, novasolicitacao, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 201) {
            throw new Error(`Erro ao criar solicitação: ${response.status}`);
        }

        const solicitacaoCriada = response.data;

        const [pacienteResponse, psicologoResponse] = await Promise.all([
            axios.get(`http://localhost:7000/pacientes/${pacienteId}`),
            axios.get(`http://localhost:7000/psicologos/${psicologoId}`)
        ]);

        return {
            ...solicitacaoCriada,
            paciente: pacienteResponse.data,
            psicologo: psicologoResponse.data
        } as SolicitacaoDocumentoModel;

    } catch (error) {
        console.error("Erro ao criar solicitação de documento:", error);
        throw new Error(`Erro ao criar solicitação de documento: ${error}`);
    }
}

export async function buscarSolicitacoesDocumento(pacienteId: string): Promise<SolicitacaoDocumentoModel[]> {
    try {
        const response = await axios.get(`http://localhost:7000/solicitacoes-documento?pacienteId=${pacienteId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Erro na busca de solicitações: ${response.status}`);
        }

        const solicitacoes = response.data;
        
        const solicitacoesComDados = await Promise.all(
            solicitacoes.map(async (solicitacao: any) => {
                const [pacienteResponse, psicologoResponse] = await Promise.all([
                    axios.get(`http://localhost:7000/pacientes/${solicitacao.pacienteId}`),
                    axios.get(`http://localhost:7000/psicologos/${solicitacao.psicologoId}`)
                ]);
                
                return {
                    ...solicitacao,
                    paciente: pacienteResponse.data,
                    psicologo: psicologoResponse.data
                };
            })
        );

        return solicitacoesComDados as SolicitacaoDocumentoModel[];

    } catch (error) {
        console.error("Erro ao buscar solicitações de documento:", error);
        throw new Error(`Erro ao buscar solicitações de documento: ${error}`);
    }
}