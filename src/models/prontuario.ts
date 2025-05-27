import ConsultaModel from "./consulta";
import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface ProntuarioModel {
    id:string,
    psicologo: PsicologoModel,
    paciente: PacienteModel,
    consulta: ConsultaModel,
    titulo: string,
    conteudo: string,
    dataCriacao: string,
    dataEdicao: string
}