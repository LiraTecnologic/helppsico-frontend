import PacienteModel from "./paciente"
import PsicologoModel from "./psicologo"

export default interface VinculoModel {
    id:string,
    psicologo:PsicologoModel,
    paciente:PacienteModel,
    status:string
}