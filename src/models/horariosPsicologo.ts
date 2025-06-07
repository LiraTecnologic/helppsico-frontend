import HorarioModel from "./horario";
import PsicologoModel from "./psicologo";

export default interface HorairoPsicologoModel {
    id: string,
    psicologo: PsicologoModel,
    horario: HorarioModel
}