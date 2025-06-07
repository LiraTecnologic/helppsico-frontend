import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface DocumentoModel {
    id: string,
    paciente: PacienteModel,
    psicologo: PsicologoModel,
    dataEmissao: string,
    dataValidade: string,
    assinaturaPsicologo:string
}