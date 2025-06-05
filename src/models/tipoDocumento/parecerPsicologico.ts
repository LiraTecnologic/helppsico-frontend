import DocumentoModel from "./documento";

export default interface ParecerPsicologicoModel extends DocumentoModel {
    solicitante: string,
    objetivo: string,
    conclusao: string,
    sigilo: string,
    contextualizacao: string,
    fundamentacao: string,
    analiseDoCaso: string
}