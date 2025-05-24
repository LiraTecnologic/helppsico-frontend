import EnderecoModel from "./endereco"
import PacienteModel from "./paciente"
import PsicologoModel from "./psicologo"

export default interface ConsultaModel {
    id:string,
    psicologo:PsicologoModel,
    paciente:PacienteModel,
    valor:number,
    dataHora:string,
    endereco:EnderecoModel,
    finalizada:Boolean
}