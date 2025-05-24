import PsicologoModel from "./psicologo"

export default interface ValidacaoCrpModel {
    id:string
    psicologo:PsicologoModel
    crp:string
    motivoReprova:string
}