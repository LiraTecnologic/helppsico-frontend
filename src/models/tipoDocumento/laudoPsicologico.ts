import DocumentoModel from "./documento";

export default interface LaudoPsicologicoModel extends DocumentoModel {
    solicitante: string,
    objetivo: string,
    historico: string,
    procedimentosUtilizados: string,
    descricaoResultados: string,
    conclusao: string,
    respostaDemanda: string,
    recomendacoes: string,
    sigilo: string
}