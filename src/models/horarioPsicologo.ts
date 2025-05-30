import { HorarioModel } from "./horario";
import PsicologoModel from "./psicologo";

export interface HorarioPsicologoModel {
    id: string;
    psicologo: PsicologoModel;
    horarios: HorarioModel[];
    tempoSessao: number;
}