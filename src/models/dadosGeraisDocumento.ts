import EnderecoModel from "./endereco";
import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface DadosGeraisDocumentoModel {
    paciente: PacienteModel,
    psicologo: PsicologoModel,
    dataEmissao: string,
    dataValidade: string,
    assinaturaPsicologo: string,
    motivo: string,
    descricao: string,
    finalidade: string,
    solicitante: string,
    objetivo: string,
    historico: string,
    procedimentosUtilizados: string,
    descricaoResultados: string,
    conclusao: string,
    recomendacoes: string,
    sigilo: string,
    contextualizacao: string,
    fundamentacao: string,
    analiseDoCaso: string,
    respostaDemanda: string,
    dataAtendimento: string,
    local: EnderecoModel,
    descricaoEstadoPsicologico: string,
    periodoAfastamento: string
}