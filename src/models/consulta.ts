import EnderecoModel from "./endereco"
import { HorarioModel } from "./horario"
import PacienteModel from "./paciente"
import PsicologoModel from "./psicologo"

export default interface ConsultaModel {
    id:string,
    psicologo:PsicologoModel,
    paciente:PacienteModel,
    valor:number,
    hora:HorarioModel,
    data:string,
    endereco:EnderecoModel,
    finalizada:Boolean
}