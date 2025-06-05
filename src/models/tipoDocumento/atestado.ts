import DocumentoModel from "./documento";
import EnderecoModel from "../endereco";

export default interface AtestadoModel extends DocumentoModel {
    dataAtendimento: string,
    local: EnderecoModel,
    descricao: string,
    descricaoEstadoPsicologico: string,
    periodoAfastamento: string,
    finalidade: string
}