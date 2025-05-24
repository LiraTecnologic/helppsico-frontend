import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export default interface VinculoModel {
    id: string;
    paciente: PacienteModel;
    psicologo: PsicologoModel;
    status: StatusVinculo;
}

enum StatusVinculo {
    PENDENTE = "PENDENTE",
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
}

export {StatusVinculo, };

