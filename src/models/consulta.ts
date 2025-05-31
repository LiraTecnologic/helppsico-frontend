import EnderecoModel from "./endereco"
import { HorarioModel } from "./horario"
import PacienteModel from "./paciente"
import PsicologoModel from "./psicologo"

export default interface ConsultaModel {
    id:string,
    psicologo:PsicologoModel,
    paciente:PacienteModel,
    valor:number,
    dataHora:HorarioModel,
    endereco:EnderecoModel,
    finalizada:Boolean
}