import PsicologoModel from "./psicologo";

export interface HorarioModel {
    id: string;
    diaSemana: string;
    inicio: string;
    fim: string;
    disponivel: boolean;
    psicologo: PsicologoModel
}