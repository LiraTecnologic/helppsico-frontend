import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface FotoModel {
    id:string,
    psicologo: PsicologoModel,
    paciente: PacienteModel,
    fotoUrl: string
}