import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface ProntuarioModel {
    id:string,
    psicologo: PsicologoModel,
    paciente: PacienteModel,
    titulo: string,
    conteudo: string
}