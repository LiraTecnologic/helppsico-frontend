import DocumentoModel from "./documento";

export default interface RelatorioPsicologicoModel extends DocumentoModel {
    solicitante: string,
    objetivo: string,
    historico: string,
    procedimentosUtilizados: string,
    descricaoResultados: string,
    conclusao: string,
    recomendacoes: string,
    sigilo: string
}