import EnderecoModel from "../endereco";
import DocumentoModel from "./documento";

export default interface AtestadoModel extends DocumentoModel {
    dataAtendimento: string,
    local: EnderecoModel,
    descricao: string,
    descricaoEstadoPsicologico: string,
    periodoAfastamento: string,
    finalidade: string
}