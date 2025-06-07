import DocumentoModel from "./documento";

export default interface DeclaracaoModel extends DocumentoModel {
    motivo: string,
    descricao: string,
    finalidade: string
}